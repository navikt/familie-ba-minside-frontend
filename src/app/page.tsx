import {
    Chat2Icon,
    ChevronRightIcon,
    ChildHairEyesIcon,
    ClockIcon,
    GavelIcon,
    HouseIcon,
    ThumbDownIcon,
} from '@navikt/aksel-icons';
import {
    Alert,
    BodyLong,
    BodyShort,
    Button,
    ExpansionCard,
    Heading,
    HStack,
    Link,
} from '@navikt/ds-react';
import {
    ExpansionCardContent,
    ExpansionCardDescription,
    ExpansionCardHeader,
    ExpansionCardTitle,
} from '@navikt/ds-react/ExpansionCard';

import Seksjon from './komponenter/Seksjon';
import LenkePanel from './komponenter/LenkePanel';
import SøknadsProsess from './komponenter/SøknadsProsess';
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

            <Seksjon antallKolonner={{ md: 1, lg: 2 }}>
                <Alert variant="warning">
                    <BodyLong spacing>
                        Vi mangler dokumentasjon fra deg for å kunne behandle søknaden. Ettersend
                        dette til oss så raskt du kan.
                    </BodyLong>
                    <Button variant="secondary-neutral">Ettersend dokumenter</Button>
                </Alert>

                <ExpansionCard aria-label="Informasjon om barnetrygd">
                    <ExpansionCardHeader>
                        <ExpansionCardTitle as="h2">Du har barnetrygd</ExpansionCardTitle>
                        <ExpansionCardDescription>
                            <BodyShort
                                style={{ display: 'block' }}
                                as="span"
                                size="small"
                                textColor="subtle"
                                spacing
                            >
                                13.09.2023
                            </BodyShort>
                            Du har barnetrygd, her vil det komme mer informasjon om hvor mye du får
                            hver måned samt hvis du har søknader.
                        </ExpansionCardDescription>
                    </ExpansionCardHeader>
                    <ExpansionCardContent>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic laboriosam
                        repudiandae quibusdam ipsa fugit dolorem consequuntur rem omnis obcaecati.
                        Nostrum alias pariatur eum quidem similique incidunt consequuntur autem
                        aliquid. Ad.
                    </ExpansionCardContent>
                </ExpansionCard>
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
                    tittel="Les mer om utvidet barnetrygd"
                    ikon={<ChildHairEyesIcon title="Utvidet barnetrygd" fontSize="2rem" />}
                    graBakgrunn
                >
                    <BodyLong textColor="subtle">Informasjon om utvidet barnetrygd</BodyLong>
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

            <Seksjon tittel="Hva skjer etter at du har sendt søknad til oss?">
                <SøknadsProsess />
            </Seksjon>

            <Seksjon tittel="Dokumentoversikt" gråBakgrunn>
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
