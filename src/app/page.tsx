import {
    Chat2Icon,
    ChevronRightIcon,
    ClockIcon,
    GavelIcon,
    HouseIcon,
    ThumbDownIcon,
} from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Box, Heading, HStack, LinkCard } from '@navikt/ds-react';

import { Seksjon } from './komponenter/Seksjon';
import YtelseKort from './komponenter/YtelseKort';
import Pictogram from './komponenter/Pictogram';
import Barnetrygd from './komponenter/pictogramSvgInnhold/barnetrygd';
import Alene from './komponenter/pictogramSvgInnhold/alene';
import UtvidetBarnetrygd from './komponenter/pictogramSvgInnhold/utvidetBarnetrygd';
import AnsvarForAndresBarn from './komponenter/pictogramSvgInnhold/ansvarForAndresBarn';
import { Suspense } from 'react';
import { BarnetrygdOversikt } from './komponenter/BarnetrygdOversikt';
import {
    LinkCardAnchor,
    LinkCardDescription,
    LinkCardIcon,
    LinkCardTitle,
} from '@navikt/ds-react/LinkCard';
import { Dokumentoversikt } from './komponenter/dokumentoversikt/Dokumentoversikt';

export default function Page() {
    return (
        <>
            <Seksjon>
                <Seksjon.Innhold>
                    <HStack gap="2">
                        <HouseIcon title="Min side" fontSize="1.5rem" />
                        <BodyShort>Min side</BodyShort>
                        <ChevronRightIcon title="Neste" fontSize="1.5rem" />
                        <BodyShort>Barnetrygden min</BodyShort>
                    </HStack>
                    <Heading level="1" size="large">
                        <HStack align="center" gap="6">
                            <Pictogram
                                svgInnhold={<Barnetrygd />}
                                ariaLabel="Barnetrygd"
                                størrelse="stor"
                            />
                            <span>Barnetrygden min</span>
                        </HStack>
                    </Heading>
                </Seksjon.Innhold>
            </Seksjon>

            <Seksjon marginBlock={'space-0'}>
                <Seksjon.Innhold>
                    <Suspense fallback={<BarnetrygdOversikt.Fallback />}>
                        <BarnetrygdOversikt />
                    </Suspense>
                </Seksjon.Innhold>
            </Seksjon>

            <Seksjon background={'surface-subtle'}>
                <Seksjon.Tittel>Ønsker du å kontakte oss?</Seksjon.Tittel>
                <Seksjon.Innhold columns={{ md: 1, lg: 2 }}>
                    <LinkCard>
                        <Box asChild borderRadius="12" padding="3" background={'surface-subtle'}>
                            <LinkCardIcon>
                                <Chat2Icon title="Snakkeboble" fontSize="2rem" />
                            </LinkCardIcon>
                        </Box>
                        <LinkCardTitle>
                            <LinkCardAnchor href="https://www.nav.no/kontaktoss">
                                Skriv til oss
                            </LinkCardAnchor>
                        </LinkCardTitle>
                        <LinkCardDescription>
                            Har du spørsmål til saken din eller vil melde fra om noe annet?
                        </LinkCardDescription>
                    </LinkCard>
                    <LinkCard>
                        <Box asChild borderRadius="12" padding="3" background={'surface-subtle'}>
                            <LinkCardIcon>
                                <GavelIcon title="Endringer i din situasjon" fontSize="2rem" />
                            </LinkCardIcon>
                        </Box>
                        <LinkCardTitle>
                            <LinkCardAnchor href="https://www.nav.no/person/kontakt-oss/meld-fra-om-endringer-innbokser/meld-fra-om-endring-barnetrygd-og-utvidet-barnetrygd">
                                Meld fra om endringer
                            </LinkCardAnchor>
                        </LinkCardTitle>
                        <LinkCardDescription>
                            Endring i din situasjon, opphold eller arbeidsforhold i utlandet.
                        </LinkCardDescription>
                    </LinkCard>
                </Seksjon.Innhold>
            </Seksjon>

            <Seksjon>
                <Seksjon.Tittel>Snarveier</Seksjon.Tittel>
                <Seksjon.Innhold columns={{ md: 1, lg: 2 }}>
                    <LinkCard>
                        <Box asChild borderRadius="12" padding="3" background={'surface-subtle'}>
                            <LinkCardIcon>
                                <ThumbDownIcon title="Klage" fontSize="2rem" />
                            </LinkCardIcon>
                        </Box>
                        <LinkCardTitle>
                            <LinkCardAnchor href="https://www.nav.no/klage#barnetrygd">
                                Slik klager du
                            </LinkCardAnchor>
                        </LinkCardTitle>
                        <LinkCardDescription>
                            Du har rett til å klage eller anke hvis du er uenig i vedtaket.
                        </LinkCardDescription>
                    </LinkCard>
                    <LinkCard>
                        <Box asChild borderRadius="12" padding="3" background={'surface-subtle'}>
                            <LinkCardIcon>
                                <ClockIcon title="Saksbehandlingstid" fontSize="2rem" />
                            </LinkCardIcon>
                        </Box>
                        <LinkCardTitle>
                            <LinkCardAnchor href="https://www.nav.no/saksbehandlingstider#barnetrygd">
                                Saksbehandlingstider
                            </LinkCardAnchor>
                        </LinkCardTitle>
                        <LinkCardDescription>
                            Se saksbehandlingstider og ventetider for barnetrygd.
                        </LinkCardDescription>
                    </LinkCard>
                </Seksjon.Innhold>
            </Seksjon>

            <Seksjon background={'surface-subtle'}>
                <Seksjon.Tittel>Dokumentoversikt</Seksjon.Tittel>
                <Seksjon.Innhold>
                    <BodyLong>
                        Her finner du alle søknader, vedlegg, vedtak, brev, samtalereferater og
                        meldinger.
                    </BodyLong>
                    <Dokumentoversikt />
                </Seksjon.Innhold>
            </Seksjon>

            <Seksjon>
                <Seksjon.Tittel>Dette kan du ha rett til</Seksjon.Tittel>
                <Seksjon.Innhold columns={{ sm: 1, md: 2, lg: 3 }}>
                    <YtelseKort
                        href="https://www.nav.no/alene-med-barn"
                        tittel="For deg som er helt eller delvis alene med barn"
                        ikon={<Pictogram svgInnhold={<Alene />} ariaLabel="Alene med barn" />}
                    >
                        Når du er alene med barn, finnes det ulike støtteordninger du kan ha rett
                        til. Hvilke ordninger du har rett til, avhenger blant annet av barnets
                        alder, sivilstanden din og bo- og arbeidssituasjonen din.
                    </YtelseKort>

                    <YtelseKort
                        href="https://www.nav.no/utvidet-barnetrygd"
                        tittel="Les mer om utvidet barnetrygd"
                        ikon={
                            <Pictogram
                                svgInnhold={<UtvidetBarnetrygd />}
                                ariaLabel="Utvidet barnetrygd"
                            />
                        }
                    >
                        Et tillegg til ordinær barnetrygd når du bor alene med barn under 18 år.
                    </YtelseKort>

                    <YtelseKort
                        href="https://www.nav.no/andres-barn"
                        tittel="Har ansvar for andres barn"
                        ikon={
                            <Pictogram
                                svgInnhold={<AnsvarForAndresBarn />}
                                ariaLabel="Har ansvar for andres barn"
                            />
                        }
                    >
                        Om pengestøtter for deg som tar vare på andres barn som fosterforelder eller
                        annen omsorgsperson.
                    </YtelseKort>
                </Seksjon.Innhold>
            </Seksjon>
        </>
    );
}
