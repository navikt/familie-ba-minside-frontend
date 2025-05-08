import {
    Chat2Icon,
    ChevronRightIcon,
    ChildHairEyesIcon,
    ClockIcon,
    GavelIcon,
    HouseIcon,
    PersonTallShortIcon,
    ThumbDownIcon,
} from '@navikt/aksel-icons';
import {
    Alert,
    BodyLong,
    BodyShort,
    Box,
    Button,
    ExpansionCard,
    Heading,
    HGrid,
    HStack,
    Link,
    Stepper,
    Table,
    VStack,
} from '@navikt/ds-react';
import {
    ExpansionCardContent,
    ExpansionCardDescription,
    ExpansionCardHeader,
    ExpansionCardTitle,
} from '@navikt/ds-react/ExpansionCard';
import { PageBlock } from '@navikt/ds-react/Page';
import { StepperStep } from '@navikt/ds-react/Stepper';
import {
    TableBody,
    TableDataCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
} from '@navikt/ds-react/Table';

export default function Page() {
    return (
        <>
            <PageBlock as="section" width="lg" gutters>
                <VStack paddingBlock={'10 0'} gap={'10'}>
                    <HStack gap={'2'}>
                        <HouseIcon title="a11y-title" fontSize="1.5rem" />
                        <BodyShort>Min side</BodyShort>
                        <ChevronRightIcon title="a11y-title" fontSize="1.5rem" />
                        <BodyShort>Barnetrygden min</BodyShort>
                    </HStack>
                    <Heading level={'1'} size="large">
                        Barnetrygden Min
                    </Heading>
                </VStack>
            </PageBlock>

            <PageBlock as="section" width="lg" gutters>
                <Box paddingBlock={'20 0'}>
                    <HGrid columns={{ md: 1, lg: 2 }} gap={'6'}>
                        <Alert variant="warning">
                            <BodyLong spacing>
                                Vi mangler dokumentasjon fra deg for å kunne behandle søknaden.
                                Ettersend dette til oss så raskt du kan.
                            </BodyLong>
                            <Button variant="secondary-neutral">Ettersend dokumenter</Button>
                        </Alert>
                    </HGrid>
                </Box>
            </PageBlock>

            <PageBlock as="section" width="lg" gutters>
                <Box paddingBlock={'20 0'}>
                    <HGrid columns={{ md: 1, lg: 2 }} gap={'6'}>
                        <ExpansionCard aria-label="Informasjon om barnetrygd">
                            <ExpansionCardHeader>
                                <ExpansionCardTitle>Du har barnetrygd</ExpansionCardTitle>
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
                                    Du har barnetrygd, her vil det komme mer informasjon om hvor mye
                                    du får hver måned samt hvis du har søknader.
                                </ExpansionCardDescription>
                            </ExpansionCardHeader>
                            <ExpansionCardContent>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                                laboriosam repudiandae quibusdam ipsa fugit dolorem consequuntur rem
                                omnis obcaecati. Nostrum alias pariatur eum quidem similique
                                incidunt consequuntur autem aliquid. Ad.
                            </ExpansionCardContent>
                        </ExpansionCard>
                    </HGrid>
                </Box>
            </PageBlock>

            <Box background="surface-subtle" marginBlock={'20 0'}>
                <PageBlock as="section" width="lg" gutters>
                    <VStack paddingBlock={'20'} gap={'6'}>
                        <Heading level={'2'} size="medium">
                            Ønsker du å kontakte oss?
                        </Heading>

                        <HGrid columns={{ md: 1, lg: 2 }} gap={'6'}>
                            <Box
                                as="a"
                                href="#"
                                paddingInline={'6'}
                                borderRadius={'xlarge'}
                                background="surface-default"
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                            >
                                <HStack wrap={false}>
                                    <Box marginBlock={'auto'} marginInline={'0 6'}>
                                        <Box
                                            background={'surface-subtle'}
                                            borderRadius={'full'}
                                            height={'4rem'}
                                            width={'4rem'}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Chat2Icon fontSize={'2rem'} />
                                        </Box>
                                    </Box>
                                    <Box width={'fit-content'} paddingBlock={'6'}>
                                        <Heading
                                            level={'3'}
                                            size="small"
                                            style={{ textDecoration: 'underline' }}
                                        >
                                            Skriv til oss
                                        </Heading>
                                        <BodyLong textColor="subtle">
                                            Har du spørsmål til saken din eller vil melde fra om noe
                                            annet?
                                        </BodyLong>
                                    </Box>
                                    <Box
                                        marginBlock={'auto'}
                                        marginInline={'auto 0'}
                                        paddingInline={'2 0'}
                                    >
                                        <ChevronRightIcon fontSize="1.5rem" />
                                    </Box>
                                </HStack>
                            </Box>

                            <Box
                                as="a"
                                href="#"
                                paddingInline={'6'}
                                borderRadius={'xlarge'}
                                background="surface-default"
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                            >
                                <HStack wrap={false}>
                                    <Box marginBlock={'auto'} marginInline={'0 6'}>
                                        <Box
                                            background={'surface-subtle'}
                                            borderRadius={'full'}
                                            height={'4rem'}
                                            width={'4rem'}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <GavelIcon title="a11y-title" fontSize="2rem" />
                                        </Box>
                                    </Box>
                                    <Box width={'fit-content'} paddingBlock={'6'}>
                                        <Heading
                                            level={'3'}
                                            size="small"
                                            style={{ textDecoration: 'underline' }}
                                        >
                                            Meld fra om endringer
                                        </Heading>
                                        <BodyLong textColor="subtle">
                                            Endring i din situasjon, opphold eller arbeidsforhold i
                                            utlandet.
                                        </BodyLong>
                                    </Box>
                                    <Box
                                        marginBlock={'auto'}
                                        marginInline={'auto 0'}
                                        paddingInline={'2 0'}
                                    >
                                        <ChevronRightIcon fontSize="1.5rem" />
                                    </Box>
                                </HStack>
                            </Box>
                        </HGrid>
                    </VStack>
                </PageBlock>
            </Box>

            <PageBlock as="section" width="lg" gutters>
                <VStack paddingBlock={'20 0'} gap={'6'}>
                    <Heading level={'2'} size="medium">
                        Snarveier
                    </Heading>

                    <HGrid columns={{ md: 1, lg: 2 }} gap={'6'}>
                        <Box
                            as="a"
                            href="#"
                            paddingInline={'6'}
                            borderRadius={'xlarge'}
                            background="surface-subtle"
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}
                        >
                            <HStack wrap={false}>
                                <Box marginBlock={'auto'} marginInline={'0 6'}>
                                    <Box
                                        background={'surface-default'}
                                        borderRadius={'full'}
                                        height={'4rem'}
                                        width={'4rem'}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <ThumbDownIcon title="a11y-title" fontSize="2rem" />
                                    </Box>
                                </Box>
                                <Box width={'fit-content'} paddingBlock={'6'}>
                                    <Heading
                                        level={'3'}
                                        size="small"
                                        style={{ textDecoration: 'underline' }}
                                    >
                                        Slik klager du
                                    </Heading>
                                    <BodyLong textColor="subtle">
                                        Du har rett til å klage eller anke hvis du er uenig i
                                        vedtaket.
                                    </BodyLong>
                                </Box>
                                <Box
                                    marginBlock={'auto'}
                                    marginInline={'auto 0'}
                                    paddingInline={'2 0'}
                                >
                                    <ChevronRightIcon fontSize="1.5rem" />
                                </Box>
                            </HStack>
                        </Box>

                        <Box
                            as="a"
                            href="#"
                            paddingInline={'6'}
                            borderRadius={'xlarge'}
                            background="surface-subtle"
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}
                        >
                            <HStack wrap={false}>
                                <Box marginBlock={'auto'} marginInline={'0 6'}>
                                    <Box
                                        background={'surface-default'}
                                        borderRadius={'full'}
                                        height={'4rem'}
                                        width={'4rem'}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <ChildHairEyesIcon title="a11y-title" fontSize="1.5rem" />
                                    </Box>
                                </Box>
                                <Box width={'fit-content'} paddingBlock={'6'}>
                                    <Heading
                                        level={'3'}
                                        size="small"
                                        style={{ textDecoration: 'underline' }}
                                    >
                                        Les mer om utvidet barnetrygd
                                    </Heading>
                                    <BodyLong textColor="subtle">
                                        Informasjon om utvidet barnetrygd
                                    </BodyLong>
                                </Box>
                                <Box
                                    marginBlock={'auto'}
                                    marginInline={'auto 0'}
                                    paddingInline={'2 0'}
                                >
                                    <ChevronRightIcon fontSize="1.5rem" />
                                </Box>
                            </HStack>
                        </Box>

                        <Box
                            as="a"
                            href="#"
                            paddingInline={'6'}
                            borderRadius={'xlarge'}
                            background="surface-subtle"
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}
                        >
                            <HStack wrap={false}>
                                <Box marginBlock={'auto'} marginInline={'0 6'}>
                                    <Box
                                        background={'surface-default'}
                                        borderRadius={'full'}
                                        height={'4rem'}
                                        width={'4rem'}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <ClockIcon title="a11y-title" fontSize="2rem" />
                                    </Box>
                                </Box>
                                <Box width={'fit-content'} paddingBlock={'6'}>
                                    <Heading
                                        level={'3'}
                                        size="small"
                                        style={{ textDecoration: 'underline' }}
                                    >
                                        Saksbehandlingstider
                                    </Heading>
                                    <BodyLong textColor="subtle">
                                        Se saksbehandlingstider og ventetider for barnetrygd.
                                    </BodyLong>
                                </Box>
                                <Box
                                    marginBlock={'auto'}
                                    marginInline={'auto 0'}
                                    paddingInline={'2 0'}
                                >
                                    <ChevronRightIcon fontSize="1.5rem" />
                                </Box>
                            </HStack>
                        </Box>

                        <Box
                            as="a"
                            href="#"
                            paddingInline={'6'}
                            borderRadius={'xlarge'}
                            background="surface-subtle"
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}
                        >
                            <HStack wrap={false}>
                                <Box marginBlock={'auto'} marginInline={'0 6'}>
                                    <Box
                                        background={'surface-default'}
                                        borderRadius={'full'}
                                        height={'4rem'}
                                        width={'4rem'}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <PersonTallShortIcon title="a11y-title" fontSize="1.5rem" />
                                    </Box>
                                </Box>
                                <Box width={'fit-content'} paddingBlock={'6'}>
                                    <Heading
                                        level={'3'}
                                        size="small"
                                        style={{ textDecoration: 'underline' }}
                                    >
                                        For deg som er helt eller delvis alene med barn
                                    </Heading>
                                    <BodyLong textColor="subtle">
                                        Ulike støtteordninger du kan ha rett til.
                                    </BodyLong>
                                </Box>
                                <Box
                                    marginBlock={'auto'}
                                    marginInline={'auto 0'}
                                    paddingInline={'2 0'}
                                >
                                    <ChevronRightIcon fontSize="1.5rem" />
                                </Box>
                            </HStack>
                        </Box>
                    </HGrid>
                </VStack>
            </PageBlock>

            <PageBlock as="section" width="lg" gutters>
                <VStack paddingBlock={'20 0'} gap={'6'}>
                    <Heading level={'2'} size="medium">
                        Hva skjer etter at du har sendt søknad til oss?
                    </Heading>

                    <Stepper aria-labelledby="stepper-heading" activeStep={3} interactive={false}>
                        {/* @ts-expect-error: StepperStep tar kun imot "string" som children, men nå bruker vi komponenter for å teste utseende. */}
                        <StepperStep completed>
                            <Heading level="3" size="small" spacing>
                                Vi sjekker om vi har alle opplysninger
                            </Heading>
                            <BodyLong>
                                Hvis du ikke har lagt ved alle vedlegg til søknaden, venter vi 14
                                dager med å saksbehandle. Etter 14 dager vil vi starte
                                saksbehandling med de opplysningene vi har. Hvis vi har behov for
                                flere opplysninger, vil vi sende deg et brev med informasjon om
                                dette. Da får du også 14 dager på å sende inn informasjonen.
                            </BodyLong>
                        </StepperStep>
                        {/* @ts-expect-error: StepperStep tar kun imot "string" som children, men nå bruker vi komponenter for å teste utseende. */}
                        <StepperStep completed>
                            <Heading level="3" size="small" spacing>
                                Rett på utvidet barnetrygd
                            </Heading>
                            <BodyLong>
                                Vi bruker opplysningene vi har fått til å sjekke om du har rett på
                                utvidet barnetrygd etter barnetrygdloven kapittel 3.
                            </BodyLong>
                        </StepperStep>
                        {/* @ts-expect-error: StepperStep tar kun imot "string" som children, men nå bruker vi komponenter for å teste utseende. */}
                        <StepperStep>
                            <Heading level="3" size="small" spacing>
                                Svar på søknaden din
                            </Heading>
                            <BodyLong>
                                Du får et vedtak med vurderingen vår av om du har rett på utvidet
                                barnetrygd eller ikke, og hvor mye du vil få utbetalt. Hvis du har
                                spørsmål til vurderingen, kan du ta kontakt med oss. Hvis du ikke er
                                enig i vår avgjørelse, kan du klage på vedtaket.
                            </BodyLong>
                        </StepperStep>
                        {/* @ts-expect-error: StepperStep tar kun imot "string" som children, men nå bruker vi komponenter for å teste utseende. */}
                        <StepperStep>
                            <Heading level="3" size="small" spacing>
                                Søknaden er ferdig behandlet
                            </Heading>
                            <BodyLong>
                                Når søknaden din er ferdig behandlet får du et svar som du finner
                                under <Link>saksoversikten</Link> på Ditt Nav. I tillegg sender vi
                                svar til deg i posten.
                            </BodyLong>
                        </StepperStep>
                        {/* @ts-expect-error: StepperStep tar kun imot "string" som children, men nå bruker vi komponenter for å teste utseende. */}
                        <StepperStep>
                            <Heading level="3" size="small" spacing>
                                Utbetaling
                            </Heading>
                            <BodyLong>
                                Du finner informasjon om utbetaling under «kommende utbetalinger» i{' '}
                                <Link>utbetalingsoversikten</Link>.
                            </BodyLong>
                        </StepperStep>
                    </Stepper>
                </VStack>
            </PageBlock>

            <PageBlock as="section" width="lg" gutters>
                <VStack paddingBlock={'20 0'} gap={'6'}>
                    <Heading level={'2'} size="medium">
                        Dokumentoversikt
                    </Heading>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell scope="col">Dokument</TableHeaderCell>
                                <TableHeaderCell scope="col">Sendt inn av</TableHeaderCell>
                                <TableHeaderCell scope="col" align="right">
                                    Dato
                                </TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableDataCell>
                                    Dokumentasjon fra den andre forelderen
                                </TableDataCell>
                                <TableDataCell>Tredjepart</TableDataCell>
                                <TableDataCell align="right">13. okt. 2018</TableDataCell>
                            </TableRow>
                            <TableRow>
                                <TableDataCell>
                                    Ettersendelse til søknad om utvidet barnetrygd
                                </TableDataCell>
                                <TableDataCell>Deg</TableDataCell>
                                <TableDataCell align="right">5. jul. 2018</TableDataCell>
                            </TableRow>
                            <TableRow>
                                <TableDataCell>Annen dokumentasjon</TableDataCell>
                                <TableDataCell>Nav</TableDataCell>
                                <TableDataCell align="right">13. okt. 2018</TableDataCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Link href="#">
                        Har du sendt en søknad eller et dokument som ikke vises her?
                    </Link>
                </VStack>
            </PageBlock>

            <PageBlock as="section" width="lg" gutters>
                <VStack paddingBlock={'20 0'} gap={'6'}>
                    <Heading level={'2'} size="medium">
                        Dette kan du ha rett til
                    </Heading>

                    <HGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={'6'}>
                        <Box padding={'6'} borderRadius={'xlarge'} shadow="small">
                            <VStack height={'100%'} justify={'space-between'}>
                                <Box>
                                    <Heading level={'3'} size="small" spacing>
                                        For deg som er helt eller delvis alene med barn
                                    </Heading>
                                    <BodyLong textColor="subtle" spacing>
                                        Når du er alene med barn, finnes det ulike støtteordninger
                                        du kan ha rett til. Hvilke ordninger du har rett til,
                                        avhenger blant annet av barnets alder, sivilstanden din og
                                        bo- og arbeidssituasjonen din.
                                    </BodyLong>
                                </Box>
                                <Button variant="secondary">Les mer</Button>
                            </VStack>
                        </Box>

                        <Box padding={'6'} borderRadius={'xlarge'} shadow="small">
                            <VStack height={'100%'} justify={'space-between'}>
                                <Box>
                                    <Heading level={'3'} size="small" spacing>
                                        Les mer om utvidet barnetrygd
                                    </Heading>
                                    <BodyLong textColor="subtle" spacing>
                                        Et tillegg til ordinær barnetrygd når du bor alene med barn
                                        under 18 år.
                                    </BodyLong>
                                </Box>
                                <Button variant="secondary">Les mer</Button>
                            </VStack>
                        </Box>

                        <Box padding={'6'} borderRadius={'xlarge'} shadow="small">
                            <VStack height={'100%'} justify={'space-between'}>
                                <Box>
                                    <Heading level={'3'} size="small" spacing>
                                        Har ansvar for andres barn
                                    </Heading>
                                    <BodyLong textColor="subtle" spacing>
                                        Om pengestøtter for deg som tar vare på andres barn som
                                        fosterforelder eller annen omsorgsperson.
                                    </BodyLong>
                                </Box>
                                <Button variant="secondary">Les mer</Button>
                            </VStack>
                        </Box>
                    </HGrid>
                </VStack>
            </PageBlock>
        </>
    );
}
