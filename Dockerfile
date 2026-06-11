# =============================================================================
# Dockerfile — Build de producción para practica-backend
# =============================================================================

# --- Etapa 1: Build ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Etapa 2: Runner (producción) ---
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY ca.pem ./ca.pem

CMD ["node", "dist/main.js"]

# Puerto por defecto
EXPOSE 8080
