FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24

ENV NODE_ENV production

RUN addgroup --system --gid 1069 nodejs
RUN adduser --system --uid 1069 nextjs

WORKDIR /app
COPY --chown=nextjs:nodejs .next/standalone ./
COPY --chown=nextjs:nodejs .next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]