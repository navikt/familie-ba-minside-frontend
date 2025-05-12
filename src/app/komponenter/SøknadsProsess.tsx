import { BodyLong, Heading, Link, Stepper } from '@navikt/ds-react';
import { StepperStep } from '@navikt/ds-react/Stepper';

const SøknadsProsess: React.FC = () => {
    return (
        <Stepper aria-labelledby="stepper-heading" activeStep={3} interactive={false}>
            {/* @ts-expect-error: StepperStep tar kun imot "string" som children, men nå bruker vi komponenter for å teste utseende. */}
            <StepperStep completed>
                <Heading level="3" size="small" spacing>
                    Vi sjekker om vi har alle opplysninger
                </Heading>
                <BodyLong>
                    Hvis du ikke har lagt ved alle vedlegg til søknaden, venter vi 14 dager med å
                    saksbehandle. Etter 14 dager vil vi starte saksbehandling med de opplysningene
                    vi har. Hvis vi har behov for flere opplysninger, vil vi sende deg et brev med
                    informasjon om dette. Da får du også 14 dager på å sende inn informasjonen.
                </BodyLong>
            </StepperStep>
            {/* @ts-expect-error: StepperStep tar kun imot "string" som children, men nå bruker vi komponenter for å teste utseende. */}
            <StepperStep completed>
                <Heading level="3" size="small" spacing>
                    Rett på utvidet barnetrygd
                </Heading>
                <BodyLong>
                    Vi bruker opplysningene vi har fått til å sjekke om du har rett på utvidet
                    barnetrygd etter barnetrygdloven kapittel 3.
                </BodyLong>
            </StepperStep>
            {/* @ts-expect-error: StepperStep tar kun imot "string" som children, men nå bruker vi komponenter for å teste utseende. */}
            <StepperStep>
                <Heading level="3" size="small" spacing>
                    Svar på søknaden din
                </Heading>
                <BodyLong>
                    Du får et vedtak med vurderingen vår av om du har rett på utvidet barnetrygd
                    eller ikke, og hvor mye du vil få utbetalt. Hvis du har spørsmål til
                    vurderingen, kan du ta kontakt med oss. Hvis du ikke er enig i vår avgjørelse,
                    kan du klage på vedtaket.
                </BodyLong>
            </StepperStep>
            {/* @ts-expect-error: StepperStep tar kun imot "string" som children, men nå bruker vi komponenter for å teste utseende. */}
            <StepperStep>
                <Heading level="3" size="small" spacing>
                    Søknaden er ferdig behandlet
                </Heading>
                <BodyLong>
                    Når søknaden din er ferdig behandlet får du et svar som du finner under{' '}
                    <Link>saksoversikten</Link> på Ditt Nav. I tillegg sender vi svar til deg i
                    posten.
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
    );
};

export default SøknadsProsess;
