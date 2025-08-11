import {
    Chat2Icon,
    ChevronRightIcon,
    ClockIcon,
    GavelIcon,
    HouseIcon,
    ThumbDownIcon,
} from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Box, Heading, HStack, Link, LinkCard } from '@navikt/ds-react';

import { Seksjon } from '@/komponenter/Seksjon';
import { Pictogram } from '@/komponenter/Pictogram';
import { Barnetrygd } from '@/komponenter/pictogramSvgInnhold/Barnetrygd';
import { Alene } from '@/komponenter/pictogramSvgInnhold/Alene';
import { UtvidetBarnetrygd } from '@/komponenter/pictogramSvgInnhold/UtvidetBarnetrygd';
import { AnsvarForAndresBarn } from '@/komponenter/pictogramSvgInnhold/AnsvarForAndresBarn';
import { Suspense } from 'react';
import { BarnetrygdOversikt } from '@/komponenter/BarnetrygdOversikt';
import {
    LinkCardAnchor,
    LinkCardDescription,
    LinkCardIcon,
    LinkCardTitle,
} from '@navikt/ds-react/LinkCard';
import { Dokumentoversikt } from '@/komponenter/dokumentoversikt/Dokumentoversikt';
import { HarIkkeBarnehageplass } from '@/komponenter/pictogramSvgInnhold/HarIkkeBarnehageplass';

export default function Page() {
    return (
        <>
            <Seksjon paddingBlock="12 0">
                <Seksjon.Innhold>
                    <HStack gap="2" align="center">
                        <HouseIcon title="Min side" fontSize="1.5rem" />
                        <Link href="https://www.nav.no">nav.no</Link>
                        <ChevronRightIcon title="Neste" />
                        <Link href="https://www.nav.no/minside">Min side</Link>
                        <ChevronRightIcon title="Neste" />
                        <BodyShort>Barnetrygden min</BodyShort>
                    </HStack>
                    <HStack align="center" gap="4">
                        <Pictogram
                            svgInnhold={<Barnetrygd />}
                            ariaLabel="Barnetrygd"
                            størrelse="stor"
                        />
                        <Heading level="1" size="large">
                            Barnetrygden min
                        </Heading>
                    </HStack>
                </Seksjon.Innhold>
            </Seksjon>

            <Seksjon>
                <Seksjon.Innhold>
                    <Suspense fallback={<BarnetrygdOversikt.Fallback />}>
                        <BarnetrygdOversikt />
                    </Suspense>
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
                <Seksjon.Tittel>Ønsker du å kontakte oss?</Seksjon.Tittel>
                <Seksjon.Innhold columns={{ md: 1, lg: 2 }}>
                    <LinkCard>
                        <Box asChild borderRadius="12" padding="3" background={'surface-subtle'}>
                            <LinkCardIcon>
                                <Chat2Icon title="Snakkeboble" fontSize="2rem" />
                            </LinkCardIcon>
                        </Box>
                        <LinkCardTitle>
                            <LinkCardAnchor href="https://www.nav.no/kontaktoss#skriv-til-oss">
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

            <Seksjon background={'surface-subtle'}>
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

            <Seksjon paddingBlock="12 0">
                <Seksjon.Tittel>Dette kan du ha rett til</Seksjon.Tittel>
                <Seksjon.Innhold columns={{ sm: 1, md: 2 }}>
                    <LinkCard>
                        <Box asChild>
                            <LinkCardIcon>
                                <Pictogram svgInnhold={<Alene />} ariaLabel="Alene med barn" />
                            </LinkCardIcon>
                        </Box>
                        <LinkCardTitle>
                            <LinkCardAnchor href="https://www.nav.no/alene-med-barn">
                                Er helt eller delvis alene med barn
                            </LinkCardAnchor>
                        </LinkCardTitle>
                        <LinkCardDescription>
                            Om pengestøtte, bidrag og andre ordninger du kan ha rett til når du er
                            alene med barn.
                        </LinkCardDescription>
                    </LinkCard>

                    <LinkCard>
                        <Box asChild>
                            <LinkCardIcon>
                                <Pictogram
                                    svgInnhold={<UtvidetBarnetrygd />}
                                    ariaLabel="Utvidet barnetrygd"
                                />
                            </LinkCardIcon>
                        </Box>
                        <LinkCardTitle>
                            <LinkCardAnchor href="https://www.nav.no/utvidet-barnetrygd">
                                Utvidet barnetrygd
                            </LinkCardAnchor>
                        </LinkCardTitle>
                        <LinkCardDescription>
                            Et tillegg til ordinær barnetrygd når du bor alene med barn under 18 år.
                        </LinkCardDescription>
                    </LinkCard>
                    <LinkCard>
                        <Box asChild>
                            <LinkCardIcon>
                                <Pictogram
                                    svgInnhold={<AnsvarForAndresBarn />}
                                    ariaLabel="Har ansvar for andres barn"
                                />
                            </LinkCardIcon>
                        </Box>
                        <LinkCardTitle>
                            <LinkCardAnchor href="https://www.nav.no/andres-barn">
                                Har ansvar for andres barn
                            </LinkCardAnchor>
                        </LinkCardTitle>
                        <LinkCardDescription>
                            Om pengestøtter for deg som tar vare på andres barn som fosterforelder
                            eller annen omsorgsperson.
                        </LinkCardDescription>
                    </LinkCard>
                    <LinkCard>
                        <Box asChild>
                            <LinkCardIcon>
                                <Pictogram
                                    svgInnhold={<HarIkkeBarnehageplass />}
                                    ariaLabel="Har ikke barnehageplass"
                                />
                            </LinkCardIcon>
                        </Box>
                        <LinkCardTitle>
                            <LinkCardAnchor href="https://www.nav.no/ikke-barnehageplass">
                                Har barn som ikke har full barnehageplass
                            </LinkCardAnchor>
                        </LinkCardTitle>
                        <LinkCardDescription>
                            Om kontantstøtte når du har barn mellom 13 og 19 måneder som ikke har
                            fulltidsplass i barnehage.
                        </LinkCardDescription>
                    </LinkCard>
                </Seksjon.Innhold>
            </Seksjon>
        </>
    );
}
