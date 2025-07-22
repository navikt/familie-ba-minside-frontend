'use client';
import { Seksjon } from '@/komponenter/Seksjon';
import { BodyShort, Button, Heading, Link, List, VStack } from '@navikt/ds-react';
import { BugIcon } from '@navikt/aksel-icons';
import { usePathname } from 'next/navigation';

export default function NotFound() {
    const pathname = usePathname();
    return (
        <Seksjon>
            <Seksjon.Innhold>
                <VStack gap="16">
                    <VStack align="start" gap="12">
                        <div>
                            <Heading level="1" size="large" spacing>
                                Beklager, vi fant ikke siden
                            </Heading>
                            <BodyShort spacing>
                                Denne siden kan være slettet eller flyttet, eller det er en feil i
                                lenken.
                            </BodyShort>
                            <List>
                                <List.Item>Bruk gjerne søket eller menyen</List.Item>
                                <List.Item>
                                    <Link href="https://nav.no">Gå til forsiden</Link>
                                </List.Item>
                            </List>
                        </div>
                        <Button as="a" href="/barnetrygd">
                            Gå til Min side
                        </Button>
                        <Link
                            href={`https://github.com/navikt/familie-ba-minside-frontend/issues/new?assignees=&labels=bug+%F0%9F%90%9B&projects=&template=bug-report.md&title=[${pathname}%20-%20404]`}
                        >
                            <BugIcon aria-hidden />
                            Meld gjerne fra om at lenken ikke virker
                        </Link>
                    </VStack>
                    <VStack align="start">
                        <Heading level="1" size="large" spacing>
                            Page not found
                        </Heading>
                        <BodyShort spacing>The page you requested cannot be found.</BodyShort>
                        <BodyShort>
                            Go to the <Link href="/barnetrygd">front page</Link>, or use one of the
                            links in the menu.
                        </BodyShort>
                    </VStack>
                </VStack>
            </Seksjon.Innhold>
        </Seksjon>
    );
}
