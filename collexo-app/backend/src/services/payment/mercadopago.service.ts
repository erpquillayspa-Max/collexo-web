import MercadoPagoConfig, { Payment, Preference } from "mercadopago";
import { env } from "../../config/env";

const mpClient = new MercadoPagoConfig({
  accessToken: env.mercadopago.accessToken,
});

const preference = new Preference(mpClient);
const payment = new Payment(mpClient);

export const MercadoPagoService = {
  async createPreference(params: {
    title: string;
    quantity: number;
    unitPrice: number;
    currency: string;
    buyerEmail: string;
    externalReference: string;
    backUrls: { success: string; failure: string; pending: string };
  }) {
    const response = await preference.create({
      body: {
        items: [
          {
            id: params.externalReference,
            title: params.title,
            quantity: params.quantity,
            unit_price: params.unitPrice,
            currency_id: params.currency,
          },
        ],
        payer: { email: params.buyerEmail },
        external_reference: params.externalReference,
        back_urls: params.backUrls,
        auto_return: "approved",
      },
    });

    return {
      preferenceId: response.id,
      initPoint: response.init_point,
      sandboxInitPoint: response.sandbox_init_point,
    };
  },

  async getPayment(paymentId: string) {
    return payment.get({ id: paymentId });
  },

  verifyWebhookSignature(
    signature: string,
    timestamp: string,
    body: string
  ): boolean {
    const crypto = require("crypto");
    const manifest = `id:${body};request-id:${timestamp};ts:${timestamp};`;
    const expected = crypto
      .createHmac("sha256", env.mercadopago.webhookSecret)
      .update(manifest)
      .digest("hex");
    return signature === expected;
  },
};
