import React from 'react';
import {
    Barnetrygd,
    HentMinSideBarnetrygdFeil,
    HentMinSideBarnetrygdSuksess,
} from '@/typer/api/barnetrygd';
import { Alert, BodyLong, BodyShort, Box, HStack, Skeleton, VStack } from '@navikt/ds-react';
import { erProd } from '@/util/miljø';
import { AsyncResult } from '@/typer/api/asyncResult';
import { formatYearMonth } from '@/util/date';
import { hentBarnetrygdOversikt } from '../api-server-side/barnetrygd';
import { TeddyBearIcon } from '@navikt/aksel-icons';

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

export async function BarnetrygdOversikt() {
    const { data, error } = await hentBarnetrygd();

    if (error) {
        return (
            <Box padding={'6'} borderRadius={'xlarge'} background={'surface-subtle'}>
                <HStack wrap={false}>
                    <div>
                        <VStack
                            paddingInline={'12'}
                            height={'100%'}
                            width={'100%'}
                            align={'center'}
                            justify={'center'}
                        >
                            <TeddyBearIcon
                                title="teddy bear"
                                fontSize="4rem"
                                color="var(--a-purple-400)"
                            />
                        </VStack>
                    </div>
                    <Box width={'100%'} padding={'6'}>
                        <Alert variant={'warning'} inline={false}>
                            <VStack gap={'4'}>
                                <BodyLong>
                                    Det oppstod et teknisk problem, og vi klarte ikke å hente
                                    informasjon om din barnetrygd. Dette skyldes ikke noe du har
                                    gjort. Vennligst prøv igjen senere.
                                </BodyLong>
                                {!erProd() && error.message && (
                                    <BodyLong>Feilmelding: {error.message}</BodyLong>
                                )}
                            </VStack>
                        </Alert>
                    </Box>
                </HStack>
            </Box>
        );
    }

    return (
        <Box padding={'6'} borderRadius={'xlarge'} background={'surface-subtle'}>
            <HStack wrap={false}>
                <div>
                    <VStack
                        paddingInline={'12'}
                        height={'100%'}
                        width={'100%'}
                        align={'center'}
                        justify={'center'}
                    >
                        <TeddyBearIcon
                            title="teddybear"
                            fontSize="4rem"
                            color="var(--a-purple-400)"
                        />
                    </VStack>
                </div>
                <Box width={'100%'} padding={'6'}>
                    <VStack gap={'8'}>
                        {!data && (
                            <div>
                                <BodyShort size={'large'}>
                                    Du har ingen innvilget barnetrygd.
                                </BodyShort>
                            </div>
                        )}
                        {data?.ordinær && (
                            <div>
                                <BodyShort size={'large'} weight={'semibold'}>
                                    Barnetrygd ordinær
                                </BodyShort>
                                <BodyShort size={'large'}>
                                    Innvilget fra: {formatYearMonth(data.ordinær.startmåned)}
                                </BodyShort>
                            </div>
                        )}
                        {data?.utvidet && (
                            <div>
                                <BodyShort size={'large'} weight={'semibold'}>
                                    Barnetrygd utvidet
                                </BodyShort>
                                <BodyShort size={'large'}>
                                    Innvilget fra: {formatYearMonth(data.utvidet.startmåned)}
                                </BodyShort>
                            </div>
                        )}
                    </VStack>
                </Box>
            </HStack>
        </Box>
    );
}

function Fallback() {
    return (
        <Box padding={'6'} borderRadius={'xlarge'} background={'surface-subtle'}>
            <HStack wrap={false}>
                <div>
                    <VStack
                        paddingInline={'12'}
                        height={'100%'}
                        width={'100%'}
                        align={'center'}
                        justify={'center'}
                    >
                        <TeddyBearIcon
                            title="teddybear"
                            fontSize="4rem"
                            color="var(--a-purple-400)"
                        />
                    </VStack>
                </div>
                <Box width={'100%'} padding={'6'}>
                    <Skeleton
                        data-testid={'skeleton1'}
                        variant={'text'}
                        width={'75%'}
                        height={'2.5rem'}
                    />
                    <Skeleton
                        data-testid={'skeleton2'}
                        variant={'text'}
                        width={'75%'}
                        height={'2.5rem'}
                    />
                </Box>
            </HStack>
        </Box>
    );
}

BarnetrygdOversikt.Fallback = Fallback;
