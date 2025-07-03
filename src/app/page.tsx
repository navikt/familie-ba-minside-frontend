import {
    Chat2Icon,
    ChevronRightIcon,
    ClockIcon,
    GavelIcon,
    HouseIcon,
    ThumbDownIcon,
} from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Heading, HStack } from '@navikt/ds-react';

import { Seksjon } from './komponenter/Seksjon';
import LenkePanel from './komponenter/LenkePanel';
import Dokumentoversikt from './komponenter/Dokumentoversikt';
import YtelseKort from './komponenter/YtelseKort';
import Pictogram from './komponenter/Pictogram';
import Barnetrygd from './komponenter/pictogramSvgInnhold/barnetrygd';
import Alene from './komponenter/pictogramSvgInnhold/alene';
import UtvidetBarnetrygd from './komponenter/pictogramSvgInnhold/utvidetBarnetrygd';
import AnsvarForAndresBarn from './komponenter/pictogramSvgInnhold/ansvarForAndresBarn';
import { Suspense } from 'react';
import { BarnetrygdOversikt } from './komponenter/BarnetrygdOversikt';

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
                            <Pictogram størrelse="stor" svgInnhold={<Barnetrygd />} />
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
                    <LenkePanel
                        href="https://www.nav.no/kontaktoss"
                        tittel="Skriv til oss"
                        ikon={<Chat2Icon title="Snakkeboble" fontSize="2rem" />}
                    >
                        <BodyLong textColor="subtle">
                            Har du spørsmål til saken din eller vil melde fra om annet enn din
                            situasjon?
                        </BodyLong>
                    </LenkePanel>
                    <LenkePanel
                        href="https://www.nav.no/person/kontakt-oss/meld-fra-om-endringer-innbokser/meld-fra-om-endring-barnetrygd-og-utvidet-barnetrygd"
                        tittel="Meld fra om endringer"
                        ikon={<GavelIcon title="Endringer i din situasjon" fontSize="2rem" />}
                    >
                        <BodyLong textColor="subtle">
                            Vil du melde fra om endringer i din situasjon, opphold eller
                            arbeidsforhold i utlandet?
                        </BodyLong>
                    </LenkePanel>
                </Seksjon.Innhold>
            </Seksjon>

            <Seksjon>
                <Seksjon.Tittel>Snarveier</Seksjon.Tittel>
                <Seksjon.Innhold columns={{ md: 1, lg: 2 }}>
                    <LenkePanel
                        href="https://www.nav.no/klage#barnetrygd"
                        tittel="Slik klager du"
                        ikon={<ThumbDownIcon title="Klage" fontSize="2rem" />}
                        graBakgrunn
                    >
                        <BodyLong textColor="subtle">
                            Du har rett til å klage eller anke hvis du er uenig i vedtaket
                        </BodyLong>
                    </LenkePanel>

                    <LenkePanel
                        href="https://www.nav.no/saksbehandlingstider#barnetrygd"
                        tittel="Saksbehandlingstider"
                        ikon={<ClockIcon title="Saksbehandlingstid" fontSize="2rem" />}
                        graBakgrunn
                    >
                        <BodyLong textColor="subtle">Se saksbehandlingstider</BodyLong>
                    </LenkePanel>
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
                        ikon={<Pictogram svgInnhold={<Alene />} />}
                    >
                        Når du er alene med barn, finnes det ulike støtteordninger du kan ha rett
                        til. Hvilke ordninger du har rett til, avhenger blant annet av barnets
                        alder, sivilstanden din og bo- og arbeidssituasjonen din.
                    </YtelseKort>

                    <YtelseKort
                        href="https://www.nav.no/utvidet-barnetrygd"
                        tittel="Les mer om utvidet barnetrygd"
                        ikon={<Pictogram svgInnhold={<UtvidetBarnetrygd />} />}
                    >
                        Et tillegg til ordinær barnetrygd når du bor alene med barn under 18 år.
                    </YtelseKort>

                    <YtelseKort
                        href="https://www.nav.no/andres-barn"
                        tittel="Har ansvar for andres barn"
                        ikon={<Pictogram svgInnhold={<AnsvarForAndresBarn />} />}
                    >
                        Om pengestøtter for deg som tar vare på andres barn som fosterforelder eller
                        annen omsorgsperson.
                    </YtelseKort>
                </Seksjon.Innhold>
            </Seksjon>
        </>
    );
}
