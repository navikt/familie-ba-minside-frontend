FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-slim@sha256:fa5d1540a6af1e5b1e14c5192a09cc64abeeacba91d42232b7fa5682503e0de9

ENV NODE_ENV=production

WORKDIR /app
COPY .next/standalone ./
COPY .next/static ./.next/static

EXPOSE 3000

ENV PORT=3000

ENV NODE_OPTIONS="--disable-warning=DEP0169"

CMD ["server.js"]
