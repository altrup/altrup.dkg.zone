FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG SUPABASE_URL
ARG SUPABASE_ANON_KEY
ARG SUPABASE_TABLE_NAME

ENV SUPABASE_URL=${SUPABASE_URL}
ENV SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
ENV SUPABASE_TABLE_NAME=${SUPABASE_TABLE_NAME}

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

USER nextjs

ARG PORT=3000
ENV PORT=${PORT}
EXPOSE ${PORT}

ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
