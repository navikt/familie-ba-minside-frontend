FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:14421174c648e75b76412fc397797eda9a6cbc34d38f8111cceded95e401d550

ENV NODE_ENV=production

WORKDIR /app
COPY .next/standalone ./
COPY .next/static ./.next/static

EXPOSE 3000

ENV PORT=3000

ENV NODE_OPTIONS="--disable-warning=DEP0169"

CMD ["server.js"]
