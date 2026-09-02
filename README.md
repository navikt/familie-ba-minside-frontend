# familie-ba-minside-frontend

Dette er et NextJS-prosjekt.

## Kom i gang

Lag fila `.env.local` i hovedmappa, hent eller generer et Unleash-token fra [unleash-prosjektet vårt](https://teamfamilie-unleash-web.iap.nav.cloud.nais.io/) og legg det inn i env-fila slik: 
```
UNLEASH_SERVER_API_TOKEN=unleash-token-her
```

Aktiver riktig pnpm-versjon med `corepack enable` (henter versjonen fra `packageManager` i package.json), og kjør opp utviklingsserveren:

```
pnpm install
pnpm dev
```

Åpne [http://localhost:3000/barnetrygd/min-barnetrygd](http://localhost:3000/barnetrygd/min-barnetrygd) for å se løsningen kjørende lokalt.

## Bygg og deploy
Appen bygges hos github actions, og gir beskjed til nais deploy om å deployere appen i gcp området. Alle commits til feature brancher går til dev miljøet og master går til produksjon.

## Henvendelser

Ved spørsmål knyttet til koden eller prosjektet opprett en issue.

## For Nav-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-familie.

## Kode generert av GitHub Copilot

Dette repoet bruker GitHub Copilot til å generere kode.