import { Heading, VStack } from '@navikt/ds-react';
import { PageBlock } from '@navikt/ds-react/Page';
import { Box } from '@navikt/ds-react';
import React, { ReactNode } from 'react';

interface Props {
    tittel?: ReactNode;
    children?: ReactNode;
    graBakgrunn?: boolean;
}

const Seksjon: React.FC<Props> = ({ tittel, children, graBakgrunn }) => {
    const content = (
        <PageBlock as="section" width="lg" gutters>
            <VStack
                marginBlock={{ xs: '12 0', md: '16 0' }}
                paddingBlock={graBakgrunn ? { xs: '12', md: '16' } : '0'}
                gap={{ xs: '4', md: '6' }}
            >
                {tittel && (
                    <Heading level="2" size="medium">
                        {tittel}
                    </Heading>
                )}
                {children}
            </VStack>
        </PageBlock>
    );

    return graBakgrunn ? <Box background="surface-subtle">{content}</Box> : content;
};

export default Seksjon;
