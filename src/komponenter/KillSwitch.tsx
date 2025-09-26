import { PropsWithChildren } from 'react';
import { erToggleSkruddPå, UnleashToggle } from '@/util/unleash';
import { BodyShort, Button, Heading, VStack } from '@navikt/ds-react';
import { Seksjon } from '@/komponenter/Seksjon';

export function KillSwitch(props: PropsWithChildren) {
    const visFeilside = erToggleSkruddPå(UnleashToggle.DISABLE_MINSIDE);

    if (visFeilside) {
        return (
            <Seksjon>
                <Seksjon.Innhold>
                    <VStack gap="16">
                        <VStack gap="12" align="start">
                            <div>
                                <Heading level="1" size="large" spacing>
                                    Vi jobber med å forbedre siden
                                </Heading>
                                <BodyShort>
                                    Denne siden er midlertidig utilgjengelig mens vi legger til nytt innhold og gjør
                                    forbedringer. Takk for tålmodigheten – prøv gjerne igjen litt senere.
                                </BodyShort>
                            </div>
                            <Button as="a" href="https://www.nav.no/minside">
                                Gå til Min side
                            </Button>
                        </VStack>
                        <div>
                            <Heading level="1" size="large" spacing>
                                We’re working on this page
                            </Heading>
                            <BodyShort>
                                This page is temporarily unavailable while we add new content and improvements. Thank
                                you for your patience – please check back a bit later.
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
