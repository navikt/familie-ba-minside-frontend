import { BoxProps, Heading, HGrid, HGridProps, VStack } from '@navikt/ds-react';
import { PageBlock } from '@navikt/ds-react/Page';
import { Box } from '@navikt/ds-react';
import React, { PropsWithChildren } from 'react';

interface SeksjonProps {
    bakgrunn?: BoxProps['background'];
    children: React.ReactNode;
}

export function Seksjon({ bakgrunn, children }: SeksjonProps) {
    return (
        <Box background={bakgrunn}>
            <PageBlock as={'section'} width={'lg'} gutters={true}>
                <VStack
                    marginBlock={{ xs: '14 0', lg: '16 0' }}
                    paddingBlock={{ xs: '14', lg: '16' }}
                    gap={{ xs: '4', lg: '6' }}
                >
                    {children}
                </VStack>
            </PageBlock>
        </Box>
    );
}

interface InnholdProps extends PropsWithChildren {
    kolonner?: HGridProps['columns'];
}

function SeksjonInnhold({ kolonner = 1, children }: InnholdProps) {
    return (
        <HGrid columns={kolonner} gap={{ xs: '4', lg: '6' }}>
            {children}
        </HGrid>
    );
}

function SeksjonTittel({ children }: PropsWithChildren) {
    return (
        <Heading level={'2'} size={'medium'}>
            {children}
        </Heading>
    );
}

Seksjon.Tittel = SeksjonTittel;
Seksjon.Innhold = SeksjonInnhold;
