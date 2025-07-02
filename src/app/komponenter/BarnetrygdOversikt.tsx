'use client';

import React, { useEffect, useState } from 'react';
import {
    Barnetrygd,
    HentMinSideBarnetrygdFeilDto,
    HentMinSideBarnetrygdSuksessDto,
} from '@/app/typer/api/Barnetrygd';
import {
    Alert,
    BodyLong,
    BodyShort,
    Box,
    HStack,
    Loader,
    Skeleton,
    VStack,
} from '@navikt/ds-react';
import { BarnetrygdIkon } from '@/app/komponenter/pictograms/barnetrygd/BarnetrygdIkon';
import { AsyncResult } from '@/app/typer/api/AsyncResult';
import { erProd } from '@/app/util/miljø';

async function hentBarnetrygd(): Promise<AsyncResult<Barnetrygd | undefined>> {
    const url =
        'https://familie-ba-minside.intern.dev.nav.no/barnetrygd/min-barnetrygd/api/barnetrygd';
    let response;
    try {
        response = await fetch(url);
        if (!response.ok) {
            const feilDto = (await response.json()) as HentMinSideBarnetrygdFeilDto;
            return AsyncResult.failure(`Component 1 (${url}): ` + feilDto.feilmelding);
        }
        const suksessDto = (await response.json()) as HentMinSideBarnetrygdSuksessDto;
        return AsyncResult.success(suksessDto.barnetrygd);
    } catch (error) {
        return AsyncResult.failure(
            `Component 2 (${url}) (${response?.status}): ` + (error as Error).message
        );
    }
}

export function BarnetrygdOversikt() {
    const [laster, settLaster] = useState<boolean>(false);
    const [error, settError] = useState<Error | undefined>();
    const [barnetrygd, settBarnetrygd] = useState<Barnetrygd | undefined>();

    useEffect(() => {
        settLaster(true);
        hentBarnetrygd()
            .then(result => {
                const { data, error } = result;
                if (error) {
                    settError(error);
                } else {
                    settBarnetrygd(data);
                }
            })
            .finally(() => settLaster(false));
    }, []);

    if (laster) {
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
                            <BarnetrygdIkon size={'8rem'} />
                        </VStack>
                    </div>
                    <Box width={'100%'} padding={'6'}>
                        <HStack gap={'4'}>
                            <Loader />
                            <BodyLong>Laster...</BodyLong>
                        </HStack>
                    </Box>
                </HStack>
            </Box>
        );
    }

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
                            <BarnetrygdIkon size={'8rem'} />
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
                        <BarnetrygdIkon size={'8rem'} />
                    </VStack>
                </div>
                <Box width={'100%'} padding={'6'}>
                    <VStack gap={'8'}>
                        {!barnetrygd && (
                            <div>
                                <BodyShort>Du har ingen innvilget barnetrygd.</BodyShort>
                            </div>
                        )}
                        {barnetrygd?.ordinær && (
                            <div>
                                <BodyShort>
                                    Innvilget fra: {barnetrygd?.ordinær.startmåned}
                                </BodyShort>
                                <BodyShort weight={'semibold'}>Barnetrygd ordinær</BodyShort>
                            </div>
                        )}
                        {barnetrygd?.utvidet && (
                            <div>
                                <BodyShort>
                                    Innvilget fra: {barnetrygd?.utvidet.startmåned}
                                </BodyShort>
                                <BodyShort weight={'semibold'}>Barnetrygd utvidet</BodyShort>
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
                        <BarnetrygdIkon size={'8rem'} />
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
