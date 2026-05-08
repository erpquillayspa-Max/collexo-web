import Stripe from "stripe";
import { env } from "../../config/env";

const stripe = new Stripe(env.stripe.secretKey, { apiVersion: "2024-06-20" });

export const StripeService = {
  async createPaymentIntent(params: {
    amount: number;
    currency: string;
    customerId?: string;
    metadata?: Record<string, string>;
  }) {
    return stripe.paymentIntents.create({
      amount: Math.round(params.amount * 100),
      currency: params.currency.toLowerCase(),
      customer: params.customerId,
      metadata: params.metadata,
      automatic_payment_methods: { enabled: true },
    });
  },

  async getOrCreateCustomer(email: string, name: string): Promise<string> {
    const existing = await stripe.customers.list({ email, limit: 1 });
    if (existing.data.length > 0) return existing.data[0].id;

    const customer = await stripe.customers.create({ email, name });
    return customer.id;
  },

  constructWebhookEvent(
    payload: Buffer,
    signature: string
  ): Stripe.Event {
    return stripe.webhooks.constructEvent(
      payload,
      signature,
      env.stripe.webhookSecret
    );
  },

  async retrievePaymentIntent(id: string) {
    return stripe.paymentIntents.retrieve(id);
  },
};
