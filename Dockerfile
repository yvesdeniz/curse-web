# syntax=docker/dockerfile:1

# ---- deps: install dependencies ------------------------------------------
FROM oven/bun:1-alpine AS deps
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# ---- builder: build the Next.js standalone output ------------------------
FROM oven/bun:1-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* vars are inlined at build time, so the invite URL must be
# present during `bun run build`. Pass it via --build-arg / compose args.
ARG NEXT_PUBLIC_INVITE_URL="#"
ENV NEXT_PUBLIC_INVITE_URL=$NEXT_PUBLIC_INVITE_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build

# ---- runner: minimal runtime image --------------------------------------
FROM oven/bun:1-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as a non-root user.
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Copy the standalone server, static assets, and public files.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["bun", "server.js"]
