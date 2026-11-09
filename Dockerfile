FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:180a66d1c00e29058241bee04e42a27fc14e77c30be9ee68ace195f384ce6f0a

ENV NODE_ENV=production

WORKDIR /app
COPY .next/standalone ./
COPY .next/static ./.next/static

EXPOSE 3000

ENV PORT=3000

ENV NODE_OPTIONS="--disable-warning=DEP0169"

CMD ["server.js"]
