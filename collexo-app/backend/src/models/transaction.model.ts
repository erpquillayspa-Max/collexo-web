import { db } from "../config/database";

export interface TransactionRow {
  id: string;
  user_id: string;
  exchange_offer_id: string | null;
  provider: string;
  provider_payment_id: string;
  amount: number;
  currency: string;
  status: string;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
}

export const TransactionModel = {
  async create(params: {
    userId: string;
    exchangeOfferId?: string;
    provider: string;
    providerPaymentId: string;
    amount: number;
    currency: string;
    metadata?: Record<string, unknown>;
  }): Promise<TransactionRow> {
    const { rows } = await db.query<TransactionRow>(
      `INSERT INTO transactions
         (user_id, exchange_offer_id, provider, provider_payment_id, amount, currency, metadata)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [
        params.userId,
        params.exchangeOfferId ?? null,
        params.provider,
        params.providerPaymentId,
        params.amount,
        params.currency,
        JSON.stringify(params.metadata ?? {}),
      ]
    );
    return rows[0];
  },

  async updateStatus(id: string, status: string): Promise<void> {
    await db.query(
      "UPDATE transactions SET status = $1, updated_at = NOW() WHERE id = $2",
      [status, id]
    );
  },

  async findByProviderPaymentId(
    providerPaymentId: string
  ): Promise<TransactionRow | null> {
    const { rows } = await db.query<TransactionRow>(
      "SELECT * FROM transactions WHERE provider_payment_id = $1",
      [providerPaymentId]
    );
    return rows[0] ?? null;
  },
};
