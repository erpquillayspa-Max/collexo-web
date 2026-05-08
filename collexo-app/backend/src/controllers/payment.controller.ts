import { Request, Response } from "express";
import { MercadoPagoService } from "../services/payment/mercadopago.service";
import { StripeService } from "../services/payment/stripe.service";
import { TransactionModel } from "../models/transaction.model";
import { AuthRequest, ok, fail } from "../types";
import { env } from "../config/env";

export const PaymentController = {
  async createMpPreference(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { exchangeOfferId, amount, currency, title } = req.body;
      const pref = await MercadoPagoService.createPreference({
        title,
        quantity: 1,
        unitPrice: amount,
        currency,
        buyerEmail: req.body.email,
        externalReference: exchangeOfferId,
        backUrls: {
          success: `${env.frontendUrl}/payment/success`,
          failure: `${env.frontendUrl}/payment/failure`,
          pending: `${env.frontendUrl}/payment/pending`,
        },
      });
      res.json(ok(pref));
    } catch (err: any) {
      res.status(err.status ?? 500).json(fail(err.message));
    }
  },

  async mpWebhook(req: Request, res: Response): Promise<void> {
    try {
      const signature = req.headers["x-signature"] as string;
      const timestamp = req.headers["x-request-id"] as string;
      const body = JSON.stringify(req.body);

      if (!MercadoPagoService.verifyWebhookSignature(signature, timestamp, body)) {
        res.status(401).json(fail("Invalid signature"));
        return;
      }

      if (req.body.type === "payment") {
        const mp = await MercadoPagoService.getPayment(req.body.data.id);
        const existing = await TransactionModel.findByProviderPaymentId(
          String(mp.id)
        );

        if (!existing) {
          await TransactionModel.create({
            userId: req.body.userId ?? "unknown",
            exchangeOfferId: mp.external_reference ?? undefined,
            provider: "mercadopago",
            providerPaymentId: String(mp.id),
            amount: mp.transaction_amount ?? 0,
            currency: mp.currency_id ?? "ARS",
            metadata: { status: mp.status },
          });
        } else {
          await TransactionModel.updateStatus(existing.id, mp.status ?? "unknown");
        }
      }

      res.sendStatus(200);
    } catch (err: any) {
      res.status(500).json(fail(err.message));
    }
  },

  async createStripeIntent(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { amount, currency, metadata } = req.body;
      const intent = await StripeService.createPaymentIntent({
        amount,
        currency,
        metadata,
      });
      res.json(ok({ clientSecret: intent.client_secret, intentId: intent.id }));
    } catch (err: any) {
      res.status(500).json(fail(err.message));
    }
  },

  async stripeWebhook(req: Request, res: Response): Promise<void> {
    try {
      const signature = req.headers["stripe-signature"] as string;
      const event = StripeService.constructWebhookEvent(
        req.body as Buffer,
        signature
      );

      if (event.type === "payment_intent.succeeded") {
        const intent = event.data.object as any;
        await TransactionModel.create({
          userId: intent.metadata?.userId ?? "unknown",
          provider: "stripe",
          providerPaymentId: intent.id,
          amount: intent.amount / 100,
          currency: intent.currency.toUpperCase(),
          metadata: intent.metadata,
        });
      }

      res.sendStatus(200);
    } catch (err: any) {
      res.status(400).json(fail(err.message));
    }
  },
};
