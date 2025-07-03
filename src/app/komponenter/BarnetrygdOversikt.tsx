import React from 'react';
import {
    Barnetrygd,
    HentMinSideBarnetrygdFeilDto,
    HentMinSideBarnetrygdSuksessDto,
} from '@/app/typer/api/Barnetrygd';
import { Alert, BodyLong, BodyShort, Box, HStack, Skeleton, VStack } from '@navikt/ds-react';
import { appUrl, erProd } from '@/app/util/miljø';
import { AsyncResult } from '@/app/typer/api/AsyncResult';
import Pictogram from './Pictogram';
import BarnetrygdIkon from './pictogramSvgInnhold/barnetrygd';

async function hentBarnetrygd(): Promise<AsyncResult<Barnetrygd | undefined>> {
    try {
        const response = await fetch(new URL(`${appUrl}/api/barnetrygd`));
        if (!response.ok) {
            const feilDto = (await response.json()) as HentMinSideBarnetrygdFeilDto;
            return AsyncResult.failure(feilDto.feilmelding);
        }
        const suksessDto = (await response.json()) as HentMinSideBarnetrygdSuksessDto;
        return AsyncResult.success(suksessDto.barnetrygd);
    } catch (error) {
        return AsyncResult.failure(error);
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
                            <Pictogram størrelse="stor" svgInnhold={<BarnetrygdIkon />} />
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
                        {data === undefined && (
                            <div>
                                <BodyShort>Du har ingen innvilget barnetrygd.</BodyShort>
                            </div>
                        )}
                        {data?.ordinær && (
                            <div>
                                <BodyShort>Innvilget fra: {data.ordinær.startmåned}</BodyShort>
                                <BodyShort weight={'semibold'}>Barnetrygd ordinær</BodyShort>
                            </div>
                        )}
                        {data?.utvidet && (
                            <div>
                                <BodyShort>Innvilget fra: {data.utvidet.startmåned}</BodyShort>
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
                        <Pictogram størrelse="stor" svgInnhold={<BarnetrygdIkon />} />
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
