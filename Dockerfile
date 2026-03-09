FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24@sha256:b19a6ad9cc1152b26a4121d5527a5e75269579e5b273e79af9ffc6e7d4d34a1a

ENV NODE_ENV=production

WORKDIR /app
COPY .next/standalone ./
COPY .next/static ./.next/static

EXPOSE 3000

ENV PORT=3000

ENV NODE_OPTIONS="--disable-warning=DEP0169"

CMD ["server.js"]
