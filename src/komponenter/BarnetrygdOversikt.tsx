import React from 'react';
import { Barnetrygd, HentMinSideBarnetrygdFeil, HentMinSideBarnetrygdSuksess } from '@/typer/api/barnetrygd';
import { Alert, BodyShort, Box, Heading, HStack, Link, List, Skeleton, VStack } from '@navikt/ds-react';
import { AsyncResult } from '@/typer/api/asyncResult';
import { hentBarnetrygdOversikt } from '../api-server-side/barnetrygd';
import { TeddyBearIcon } from '@navikt/aksel-icons';
import { ListItem } from '@navikt/ds-react/List';

async function hentBarnetrygd(): Promise<AsyncResult<Barnetrygd | undefined>> {
    const data = await hentBarnetrygdOversikt();

    const suksess = data as HentMinSideBarnetrygdSuksess;
    const feil = data as HentMinSideBarnetrygdFeil;

    if (feil.feilmelding) {
        return AsyncResult.failure(feil.feilmelding);
    } else {
        return AsyncResult.success(suksess.barnetrygd);
    }
}

function InnholdContainer({ children }: { children: React.ReactNode }) {
    return (
        <Box padding={{ xs: '4', lg: '8' }} borderRadius="xlarge" background="surface-subtle">
            <HStack gap={{ xs: '4', lg: '8' }} align="center">
                <TeddyBearIcon title="teddy bear" fontSize="4rem" color="var(--a-purple-400)" />
                <VStack gap={{ xs: '4', lg: '8' }}>{children}</VStack>
            </HStack>
        </Box>
    );
}

export async function BarnetrygdOversikt() {
    const { data, error } = await hentBarnetrygd();
    const harIkkeBarnetrygd = !data;
    const harKombinertBarnetrygd = data && data.ordinær && data.utvidet;

    if (error) {
        return (
            <Alert variant="error">
                <BodyShort weight="semibold" spacing>
                    Det har oppstått en teknisk feil. Dette skyldes ikke noe du har gjort.
                </BodyShort>
                <BodyShort spacing>
                    Vi klarte ikke å hente informasjon om din barnetrygd. Vennligst prøv igjen senere.
                </BodyShort>
                <BodyShort>
                    Dersom problemet vedvarer, kan du{' '}
                    <Link inlineText href="https://www.nav.no/kontaktoss#skriv-til-oss">
                        ta kontakt med Nav
                    </Link>
                    .
                </BodyShort>
            </Alert>
        );
    }

    if (harIkkeBarnetrygd) {
        return (
            <InnholdContainer>
                <div>
                    <BodyShort size="large">Du har ingen innvilget barnetrygd.</BodyShort>
                </div>
            </InnholdContainer>
        );
    }

    if (harKombinertBarnetrygd) {
        return (
            <InnholdContainer>
                <div>
                    <Heading size="small" level="2">
                        Du har:
                    </Heading>
                    <List>
                        <ListItem>Ordinær barnetrygd</ListItem>
                        <ListItem>Utvidet barnetrygd</ListItem>
                    </List>
                </div>
            </InnholdContainer>
        );
    } else {
        return (
            <InnholdContainer>
                {data.ordinær && (
                    <div>
                        <BodyShort size="large" weight="semibold">
                            Du har ordinær barnetrygd
                        </BodyShort>
                    </div>
                )}

                {data.utvidet && (
                    <div>
                        <BodyShort size="large" weight="semibold">
                            Du har utvidet barnetrygd
                        </BodyShort>
                    </div>
                )}
            </InnholdContainer>
        );
    }
}

function Fallback() {
    return (
        <InnholdContainer>
            <div>
                <Skeleton data-testid="skeleton1" variant="text" height="2rem" width="12rem" />
                <Skeleton data-testid="skeleton2" variant="text" height="2rem" width="12rem" />
            </div>
        </InnholdContainer>
    );
}

BarnetrygdOversikt.Fallback = Fallback;
