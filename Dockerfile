FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-dev

ENV NODE_ENV production

WORKDIR /app
COPY .next/standalone ./
COPY .next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]