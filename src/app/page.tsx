import {
    Chat2Icon,
    ChevronRightIcon,
    ClockIcon,
    GavelIcon,
    HouseIcon,
    ThumbDownIcon,
} from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Heading, HStack, Link } from '@navikt/ds-react';

import Seksjon from './komponenter/Seksjon';
import LenkePanel from './komponenter/LenkePanel';
import Dokumentoversikt from './komponenter/Dokumentoversikt';
import YtelseKort from './komponenter/YtelseKort';

export default function Page() {
    return (
        <>
            <Seksjon>
                <HStack gap="2">
                    <HouseIcon title="Min side" fontSize="1.5rem" />
                    <BodyShort>Min side</BodyShort>
                    <ChevronRightIcon title="Neste" fontSize="1.5rem" />
                    <BodyShort>Barnetrygden min</BodyShort>
                </HStack>
                <Heading level="1" size="large">
                    Barnetrygden Min
                </Heading>
            </Seksjon>

            <Seksjon
                tittel="Ønsker du å kontakte oss?"
                antallKolonner={{ md: 1, lg: 2 }}
                gråBakgrunn
            >
                <LenkePanel
                    href="#"
                    tittel="Skriv til oss"
                    ikon={<Chat2Icon title="Snakkeboble" fontSize="2rem" />}
                >
                    <BodyLong textColor="subtle">
                        Har du spørsmål til saken din eller vil melde fra om noe annet?
                    </BodyLong>
                </LenkePanel>

                <LenkePanel
                    href="#"
                    tittel="Meld fra om endringer"
                    ikon={<GavelIcon title="Endringer i din situasjon" fontSize="2rem" />}
                >
                    <BodyLong textColor="subtle">
                        Endring i din situasjon, opphold eller arbeidsforhold i utlandet.
                    </BodyLong>
                </LenkePanel>
            </Seksjon>

            <Seksjon tittel="Snarveier" antallKolonner={{ md: 1, lg: 2 }}>
                <LenkePanel
                    href="#"
                    tittel="Slik klager du"
                    ikon={<ThumbDownIcon title="Klage" fontSize="2rem" />}
                    graBakgrunn
                >
                    <BodyLong textColor="subtle">
                        Du har rett til å klage eller anke hvis du er uenig i vedtaket.
                    </BodyLong>
                </LenkePanel>

                <LenkePanel
                    href="#"
                    tittel="Saksbehandlingstider"
                    ikon={<ClockIcon title="Saksbehandlingstid" fontSize="2rem" />}
                    graBakgrunn
                >
                    <BodyLong textColor="subtle">
                        Se saksbehandlingstider og ventetider for barnetrygd.
                    </BodyLong>
                </LenkePanel>
            </Seksjon>

            <Seksjon tittel="Dokumentoversikt" gråBakgrunn>
                <BodyLong>
                    Her finner du alle søknader, vedlegg, vedtak, brev, samtalereferater og
                    meldinger.
                </BodyLong>
                <Dokumentoversikt />
                <Link href="#">Har du sendt en søknad eller et dokument som ikke vises her?</Link>
            </Seksjon>

            <Seksjon tittel="Dette kan du ha rett til" antallKolonner={{ sm: 1, md: 2, lg: 3 }}>
                <YtelseKort tittel="For deg som er helt eller delvis alene med barn">
                    Når du er alene med barn, finnes det ulike støtteordninger du kan ha rett til.
                    Hvilke ordninger du har rett til, avhenger blant annet av barnets alder,
                    sivilstanden din og bo- og arbeidssituasjonen din.
                </YtelseKort>

                <YtelseKort tittel="Les mer om utvidet barnetrygd">
                    Et tillegg til ordinær barnetrygd når du bor alene med barn under 18 år.
                </YtelseKort>

                <YtelseKort tittel="Har ansvar for andres barn">
                    Om pengestøtter for deg som tar vare på andres barn som fosterforelder eller
                    annen omsorgsperson.
                </YtelseKort>
            </Seksjon>
        </>
    );
}
