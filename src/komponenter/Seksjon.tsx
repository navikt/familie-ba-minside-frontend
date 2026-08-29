import { Box, type BoxProps, Heading, HGrid, type HGridProps, VStack, type VStackProps } from '@navikt/ds-react';
import { PageBlock } from '@navikt/ds-react/Page';
import type { PropsWithChildren, ReactNode } from 'react';

interface SeksjonProps {
    background?: BoxProps['background'];
    marginBlock?: VStackProps['marginBlock'];
    paddingBlock?: VStackProps['paddingBlock'];
    gap?: VStackProps['gap'];
    children: ReactNode;
}

export function Seksjon({
    background,
    marginBlock = 'space-0',
    paddingBlock = 'space-48',
    gap = 'space-16',
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

function Innhold({ columns = 1, gap = 'space-16', children }: InnholdProps) {
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
