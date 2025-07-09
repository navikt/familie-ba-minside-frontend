import { BoxProps, Heading, HGrid, HGridProps, VStack, VStackProps } from '@navikt/ds-react';
import { PageBlock } from '@navikt/ds-react/Page';
import { Box } from '@navikt/ds-react';
import React, { ReactNode, PropsWithChildren } from 'react';

interface SeksjonProps {
    background?: BoxProps['background'];
    marginBlock?: VStackProps['marginBlock'];
    paddingBlock?: VStackProps['paddingBlock'];
    gap?: VStackProps['gap'];
    children: ReactNode;
}

export function Seksjon({
    background,
    marginBlock = { xs: '14 0', lg: '16 0' },
    paddingBlock = { xs: '14', lg: '16' },
    gap = { xs: '4', lg: '6' },
    children,
}: SeksjonProps) {
    return (
        <Box background={background}>
            <PageBlock as={'section'} width={'lg'} gutters={true}>
                <VStack marginBlock={marginBlock} paddingBlock={paddingBlock} gap={gap}>
                    {children}
                </VStack>
            </PageBlock>
        </Box>
    );
}

interface InnholdProps extends PropsWithChildren {
    columns?: HGridProps['columns'];
    gap?: HGridProps['gap'];
}

function Innhold({ columns = 1, gap = { xs: '4', lg: '6' }, children }: InnholdProps) {
    return (
        <HGrid columns={columns} gap={gap}>
            {children}
        </HGrid>
    );
}

function Tittel({ children }: PropsWithChildren) {
    return (
        <Heading level={'2'} size={'medium'}>
            {children}
        </Heading>
    );
}

Seksjon.Tittel = Tittel;
Seksjon.Innhold = Innhold;
