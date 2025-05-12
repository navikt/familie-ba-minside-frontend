import { Heading, HGrid, HGridProps, VStack } from '@navikt/ds-react';
import { PageBlock } from '@navikt/ds-react/Page';
import { Box } from '@navikt/ds-react';
import React, { ReactNode } from 'react';

interface Props {
    tittel?: ReactNode;
    children?: ReactNode;
    antallKolonner?: HGridProps['columns'];
    gråBakgrunn?: boolean;
}

const Seksjon: React.FC<Props> = ({ tittel, children, antallKolonner, gråBakgrunn }) => {
    const content = (
        <PageBlock as="section" width="lg" gutters>
            <VStack
                marginBlock={{ xs: '14 0', lg: '16 0' }}
                paddingBlock={gråBakgrunn ? { xs: '14', lg: '16' } : '0'}
                gap={{ xs: '4', lg: '6' }}
            >
                {tittel && (
                    <Heading level="2" size="medium">
                        {tittel}
                    </Heading>
                )}
                <HGrid columns={antallKolonner || 1} gap={{ xs: '4', lg: '6' }}>
                    {children}
                </HGrid>
            </VStack>
        </PageBlock>
    );

    return gråBakgrunn ? <Box background="surface-subtle">{content}</Box> : content;
};

export default Seksjon;
