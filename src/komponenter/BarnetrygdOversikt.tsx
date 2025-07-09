import React from 'react';
import { Barnetrygd } from '@/typer/api/barnetrygd';
import { Alert, BodyLong, BodyShort, Box, HStack, Skeleton, VStack } from '@navikt/ds-react';
import { erProd } from '@/util/miljø';
import { AsyncResult } from '@/typer/api/asyncResult';
import { Pictogram } from './Pictogram';
import { Barnetrygd as BarnetrygdIkon } from './pictogramSvgInnhold/Barnetrygd';
import { formatYearMonth } from '@/util/date';
import { hentBarnetrygdOversikt } from '../api-server-side/barnetrygd';
import { HentMinSideBarnetrygdSuksess, HentMinSideBarnetrygdFeil } from '@/typer/api/barnetrygd';

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
                            <Pictogram
                                svgInnhold={<BarnetrygdIkon />}
                                ariaLabel="Barnetrygd"
                                størrelse="stor"
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
                        <Pictogram
                            svgInnhold={<BarnetrygdIkon />}
                            ariaLabel="Barnetrygd"
                            størrelse="stor"
                        />
                    </VStack>
                </div>
                <Box width={'100%'} padding={'6'}>
                    <VStack gap={'8'}>
                        {!data && (
                            <div>
                                <BodyShort>Du har ingen innvilget barnetrygd.</BodyShort>
                            </div>
                        )}
                        {data?.ordinær && (
                            <div>
                                <BodyShort>
                                    Innvilget fra: {formatYearMonth(data.ordinær.startmåned)}
                                </BodyShort>
                                <BodyShort weight={'semibold'}>Barnetrygd ordinær</BodyShort>
                            </div>
                        )}
                        {data?.utvidet && (
                            <div>
                                <BodyShort>
                                    Innvilget fra: {formatYearMonth(data.utvidet.startmåned)}
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
                        <Pictogram
                            svgInnhold={<BarnetrygdIkon />}
                            ariaLabel="Barnetrygd"
                            størrelse="stor"
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
