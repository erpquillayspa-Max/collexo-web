-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Users ─────────────────────────────────────────────────────────────────────
CREATE TABLE users (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username           VARCHAR(30)  NOT NULL UNIQUE,
  email              VARCHAR(255) NOT NULL UNIQUE,
  password_hash      TEXT         NOT NULL,
  avatar_url         TEXT,
  country            CHAR(2)      NOT NULL,
  role               VARCHAR(20)  NOT NULL DEFAULT 'user',
  refresh_token_hash TEXT,
  is_active          BOOLEAN      NOT NULL DEFAULT true,
  created_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_users_email     ON users(email);
CREATE INDEX idx_users_username  ON users(username);
CREATE INDEX idx_users_country   ON users(country);

-- ── Sticker Templates (680 láminas del Mundial 2026) ─────────────────────────
CREATE TABLE sticker_templates (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  number      VARCHAR(10)  NOT NULL UNIQUE,
  name        VARCHAR(100) NOT NULL,
  team_id     UUID         NOT NULL,
  team_name   VARCHAR(100) NOT NULL,
  group_code  VARCHAR(5)   NOT NULL,
  image_url   TEXT         NOT NULL,
  rarity      VARCHAR(20)  NOT NULL DEFAULT 'common',
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_sticker_templates_team    ON sticker_templates(team_id);
CREATE INDEX idx_sticker_templates_number  ON sticker_templates(number);
CREATE INDEX idx_sticker_templates_rarity  ON sticker_templates(rarity);

-- ── User Stickers ─────────────────────────────────────────────────────────────
CREATE TABLE user_stickers (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  template_id UUID        NOT NULL REFERENCES sticker_templates(id),
  quantity    SMALLINT    NOT NULL DEFAULT 1 CHECK (quantity >= 0),
  condition   VARCHAR(20) NOT NULL DEFAULT 'mint',
  is_listed   BOOLEAN     NOT NULL DEFAULT false,
  acquired_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, template_id)
);
CREATE INDEX idx_user_stickers_user     ON user_stickers(user_id);
CREATE INDEX idx_user_stickers_template ON user_stickers(template_id);
CREATE INDEX idx_user_stickers_listed   ON user_stickers(user_id) WHERE is_listed = true;

-- ── Exchange Offers ───────────────────────────────────────────────────────────
CREATE TABLE exchange_offers (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user_id          UUID         NOT NULL REFERENCES users(id),
  to_user_id            UUID         NOT NULL REFERENCES users(id),
  type                  VARCHAR(10)  NOT NULL DEFAULT 'trade',
  status                VARCHAR(20)  NOT NULL DEFAULT 'pending',
  offered_sticker_ids   UUID[]       NOT NULL DEFAULT '{}',
  requested_sticker_ids UUID[]       NOT NULL DEFAULT '{}',
  price_amount          NUMERIC(12,2),
  price_currency        CHAR(3),
  message               TEXT,
  expires_at            TIMESTAMPTZ  NOT NULL,
  created_at            TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_exchange_from_user   ON exchange_offers(from_user_id, status);
CREATE INDEX idx_exchange_to_user     ON exchange_offers(to_user_id, status);
CREATE INDEX idx_exchange_status      ON exchange_offers(status);
CREATE INDEX idx_exchange_expires     ON exchange_offers(expires_at) WHERE status = 'pending';

-- ── Market Listings ───────────────────────────────────────────────────────────
CREATE TABLE market_listings (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id        UUID         NOT NULL REFERENCES users(id),
  user_sticker_id  UUID         NOT NULL REFERENCES user_stickers(id),
  price_amount     NUMERIC(12,2) NOT NULL,
  price_currency   CHAR(3)      NOT NULL,
  is_active        BOOLEAN      NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_market_listings_seller   ON market_listings(seller_id);
CREATE INDEX idx_market_listings_active   ON market_listings(is_active) WHERE is_active = true;
CREATE INDEX idx_market_listings_currency ON market_listings(price_currency);

-- ── Transactions ──────────────────────────────────────────────────────────────
CREATE TABLE transactions (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID         NOT NULL REFERENCES users(id),
  exchange_offer_id   UUID         REFERENCES exchange_offers(id),
  provider            VARCHAR(20)  NOT NULL,
  provider_payment_id VARCHAR(255) NOT NULL UNIQUE,
  amount              NUMERIC(12,2) NOT NULL,
  currency            CHAR(3)      NOT NULL,
  status              VARCHAR(20)  NOT NULL DEFAULT 'pending',
  metadata            JSONB        NOT NULL DEFAULT '{}',
  created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_transactions_user      ON transactions(user_id);
CREATE INDEX idx_transactions_provider  ON transactions(provider, provider_payment_id);
CREATE INDEX idx_transactions_status    ON transactions(status);

-- ── Chat Rooms ────────────────────────────────────────────────────────────────
CREATE TABLE chat_rooms (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE chat_room_members (
  room_id    UUID NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  joined_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (room_id, user_id)
);
CREATE INDEX idx_chat_room_members_user ON chat_room_members(user_id);

CREATE TABLE chat_messages (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id    UUID        NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_id  UUID        NOT NULL REFERENCES users(id),
  content    TEXT        NOT NULL,
  read_at    TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_chat_messages_room ON chat_messages(room_id, created_at DESC);

-- ── Notifications ─────────────────────────────────────────────────────────────
CREATE TABLE notifications (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type       VARCHAR(50) NOT NULL,
  title      VARCHAR(255) NOT NULL,
  body       TEXT        NOT NULL,
  data       JSONB       NOT NULL DEFAULT '{}',
  read_at    TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_notifications_user    ON notifications(user_id, created_at DESC);
CREATE INDEX idx_notifications_unread  ON notifications(user_id) WHERE read_at IS NULL;
