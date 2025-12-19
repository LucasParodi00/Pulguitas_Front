# ---------- BASE ----------
FROM node:24.12.0-alpine AS base

WORKDIR /app

# ---------- DEPENDENCIES ----------
FROM base AS deps

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ---------- BUILD ----------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

# ---------- PRODUCTION ----------
FROM node:24.12.0-alpine AS runner

WORKDIR /app

ENV PORT=9020

# Solo lo necesario para producción
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 9020

CMD ["yarn", "start", "-p", "9020"]
