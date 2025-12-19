# ---------------------------------------------------
# STAGE 1: Base - Definición de la imagen base
# ---------------------------------------------------
FROM node:24.12.0-alpine AS base

# Instalar libc6-compat (necesario para Next.js en Alpine)
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ---------------------------------------------------
# STAGE 2: Deps - Instalación de dependencias
# ---------------------------------------------------
FROM base AS deps
# Copiamos solo los archivos de dependencias para aprovechar el caché de Docker
COPY package.json yarn.lock ./
# Instalamos dependencias (frozen-lockfile asegura que se usen versiones exactas)
RUN yarn install --frozen-lockfile

# ---------------------------------------------------
# STAGE 3: Builder - Construcción del proyecto
# ---------------------------------------------------
FROM base AS builder
WORKDIR /app

# Copiamos las dependencias instaladas
COPY --from=deps /app/node_modules ./node_modules
# Copiamos el código fuente del proyecto
COPY . .

# DEFINIR ARGUMENTOS DE BUILD
# Next.js "quema" las variables NEXT_PUBLIC_ en el build, por lo que son necesarias aquí.
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Deshabilitamos telemetría de Next.js durante el build
ENV NEXT_TELEMETRY_DISABLED=1

# Ejecutamos el build
RUN yarn build

# ---------------------------------------------------
# STAGE 4: Runner - Imagen final de producción
# ---------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Creamos un usuario de sistema para no correr como root (Seguridad)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiamos la carpeta public (imágenes, favicon, etc.)
COPY --from=builder /app/public ./public

# Configuración permisos para el cache de imágenes (si se usa optimización)
RUN mkdir .next
RUN chown nextjs:nodejs .next

# --- COPIA CRÍTICA PARA STANDALONE ---
# Copiamos la salida 'standalone' que incluye lo mínimo necesario para correr
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copiamos los archivos estáticos generados (.js, .css)
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Cambiamos al usuario sin privilegios
USER nextjs

# Configuración del Puerto Elegido: 9025
ENV PORT=9027
ENV HOSTNAME="0.0.0.0"

# Exponemos el puerto
EXPOSE 9027

# Comando de inicio para el modo standalone
CMD ["node", "server.js"]