import { PropsWithChildren } from 'react';
import { BodyShort, Button, Heading, Link, VStack } from '@navikt/ds-react';
import { Seksjon } from '@/komponenter/Seksjon';
import { erToggleSkruddPå, UnleashToggle } from '@/util/unleash';

export function KillSwitch(props: PropsWithChildren) {
    const visFeilside = erToggleSkruddPå(UnleashToggle.DISABLE_MINSIDE);

    if (visFeilside) {
        return (
            <Seksjon>
                <Seksjon.Innhold>
                    <VStack gap="16">
                        <VStack gap="12" align="start">
                            <div>
                                <BodyShort textColor="subtle" size="small">
                                    Statuskode 500
                                </BodyShort>
                                <Heading level="1" size="large" spacing>
                                    Beklager, noe gikk galt.
                                </Heading>
                                <BodyShort spacing>
                                    En teknisk feil på våre servere gjør at siden er utilgjengelig.
                                    Dette skyldes ikke noe du gjorde.
                                </BodyShort>
                                <BodyShort spacing>
                                    Du kan prøve å vente noen minutter og{' '}
                                    <Link href="">laste siden på nytt</Link>
                                </BodyShort>
                                <BodyShort>
                                    Hvis problemet vedvarer, kan du{' '}
                                    <Link href="https://nav.no/kontaktoss" target="_blank">
                                        kontakte oss (åpnes i ny fane)
                                    </Link>
                                    .
                                </BodyShort>
                            </div>
                            <Button as="a" href="https://www.nav.no/minside">
                                Gå til Min side
                            </Button>
                        </VStack>
                        <div>
                            <Heading level="1" size="large" spacing>
                                Something went wrong
                            </Heading>
                            <BodyShort spacing>
                                This was caused by a technical fault on our servers. Please refresh
                                this page or try again in a few minutes.{' '}
                            </BodyShort>
                            <BodyShort>
                                <Link target="_blank" href="https://www.nav.no/kontaktoss/en">
                                    Contact us (opens in new tab)
                                </Link>{' '}
                                if the problem persists.
                            </BodyShort>
                        </div>
                    </VStack>
                </Seksjon.Innhold>
            </Seksjon>
        );
    } else {
        return props.children;
    }
}
