FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:6ebf56b6b202ac0d85f4b851ded4c40c80c9ed4ee7a3b0edbea8b41c343b00c2

ENV NODE_ENV=production

WORKDIR /app
COPY .next/standalone ./
COPY .next/static ./.next/static

EXPOSE 3000

ENV PORT=3000

ENV NODE_OPTIONS="--disable-warning=DEP0169"

CMD ["server.js"]
