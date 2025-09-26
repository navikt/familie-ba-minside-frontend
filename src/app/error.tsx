'use client';
import { Seksjon } from '@/komponenter/Seksjon';
import { BodyShort, Button, Heading, Link, List, VStack } from '@navikt/ds-react';

export default function Error() {
    return (
        <Seksjon>
            <Seksjon.Innhold>
                <VStack gap="16">
                    <VStack align="start" gap="12">
                        <div>
                            <Heading level="1" size="large" spacing>
                                Beklager, noe gikk galt
                            </Heading>
                            <BodyShort spacing>
                                En teknisk feil på våre servere gjør at siden er utilgjengelig. Dette skyldes ikke noe
                                du gjorde.
                            </BodyShort>
                            <BodyShort>Du kan prøve å</BodyShort>
                            <List>
                                <List.Item>
                                    vente noen minutter og{' '}
                                    <Link href="#" onClick={() => location.reload()}>
                                        laste siden på nytt
                                    </Link>
                                </List.Item>
                                {window.history.length > 1 && (
                                    <List.Item>
                                        <Link href="#" onClick={() => history.back()}>
                                            gå tilbake til forrige side
                                        </Link>
                                    </List.Item>
                                )}
                            </List>
                            <BodyShort>
                                Hvis problemet vedvarer, kan du{' '}
                                <Link href="https://nav.no/kontaktoss" target="_blank">
                                    kontakte oss (åpnes i ny fane)
                                </Link>
                                .
                            </BodyShort>
                        </div>
                        <Button as="a" href={'/barnetrygd/min-barnetrygd'}>
                            Gå til Min side
                        </Button>
                    </VStack>
                    <VStack align="start">
                        <Heading level="1" size="large" spacing>
                            Something went wrong
                        </Heading>
                        <BodyShort spacing>
                            This was caused by a technical fault on our servers. Please refresh this page or try again
                            in a few minutes.
                        </BodyShort>
                        <BodyShort>
                            <Link href="https://www.nav.no/kontaktoss/en" target="_blank">
                                Contact us (opens in a new tab)
                            </Link>{' '}
                            if the problem persists.
                        </BodyShort>
                    </VStack>
                </VStack>
            </Seksjon.Innhold>
        </Seksjon>
    );
}
