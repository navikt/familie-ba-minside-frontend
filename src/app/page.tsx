import {
    Chat2Icon,
    ChevronRightIcon,
    ClockIcon,
    GavelIcon,
    HouseIcon,
    ThumbDownIcon,
} from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Box, Heading, HStack, Link, LinkCard } from '@navikt/ds-react';

import { Seksjon } from './komponenter/Seksjon';
import Dokumentoversikt from './komponenter/Dokumentoversikt';
import YtelseKort from './komponenter/YtelseKort';
import { BarnetrygdIkon } from '@/app/komponenter/pictograms/barnetrygd/BarnetrygdIkon';
import AleneSmall from './komponenter/pictograms/alene/small';
import UtvidetBarnetrygdSmall from './komponenter/pictograms/utvidetBarnetrygd/small';
import AnsvarForAndresBarnSmall from './komponenter/pictograms/ansvarForAndresBarn/small';
import { Suspense } from 'react';
import { BarnetrygdOversikt } from './komponenter/BarnetrygdOversikt';
import {
    LinkCardAnchor,
    LinkCardDescription,
    LinkCardIcon,
    LinkCardTitle,
} from '@navikt/ds-react/LinkCard';

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
                            <BarnetrygdIkon />
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
                            <LinkCardAnchor href="#">Skriv til oss</LinkCardAnchor>
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
                            <LinkCardAnchor href="#">Meld fra om endringer</LinkCardAnchor>
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
                            <LinkCardAnchor href="#">Slik klager du</LinkCardAnchor>
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
                            <LinkCardAnchor href="#">Saksbehandlingstider</LinkCardAnchor>
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
                    <Link href="#">
                        Har du sendt en søknad eller et dokument som ikke vises her?
                    </Link>
                </Seksjon.Innhold>
            </Seksjon>

            <Seksjon>
                <Seksjon.Tittel>Dette kan du ha rett til</Seksjon.Tittel>
                <Seksjon.Innhold columns={{ sm: 1, md: 2, lg: 3 }}>
                    <YtelseKort
                        tittel="For deg som er helt eller delvis alene med barn"
                        ikon={<AleneSmall />}
                    >
                        Når du er alene med barn, finnes det ulike støtteordninger du kan ha rett
                        til. Hvilke ordninger du har rett til, avhenger blant annet av barnets
                        alder, sivilstanden din og bo- og arbeidssituasjonen din.
                    </YtelseKort>

                    <YtelseKort
                        tittel="Les mer om utvidet barnetrygd"
                        ikon={<UtvidetBarnetrygdSmall />}
                    >
                        Et tillegg til ordinær barnetrygd når du bor alene med barn under 18 år.
                    </YtelseKort>

                    <YtelseKort
                        tittel="Har ansvar for andres barn"
                        ikon={<AnsvarForAndresBarnSmall />}
                    >
                        Om pengestøtter for deg som tar vare på andres barn som fosterforelder eller
                        annen omsorgsperson.
                    </YtelseKort>
                </Seksjon.Innhold>
            </Seksjon>
        </>
    );
}
