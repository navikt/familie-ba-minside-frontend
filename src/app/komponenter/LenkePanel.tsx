import { ReactNode } from 'react';
import { Box, Heading, HStack, VStack } from '@navikt/ds-react';

interface Props {
    href?: string;
    tittel?: ReactNode;
    ikon?: ReactNode;
    children?: ReactNode;
    graBakgrunn?: boolean;
}

export default function LenkePanel({ href, tittel, ikon, children, graBakgrunn }: Props) {
    return (
        <Box
            as="a"
            href={href}
            paddingInline="6"
            borderRadius="xlarge"
            background={graBakgrunn ? 'surface-subtle' : 'surface-default'}
            style={{
                textDecoration: 'none',
                color: 'inherit',
            }}
        >
            <HStack wrap={false} height="100%">
                <Box marginBlock="auto" marginInline="0 6">
                    {ikon && (
                        <Box
                            background={graBakgrunn ? 'surface-default' : 'surface-subtle'}
                            borderRadius="full"
                            height="4rem"
                            width="4rem"
                        >
                            <VStack height="100%" width="100%" align="center" justify="center">
                                {ikon}
                            </VStack>
                        </Box>
                    )}
                </Box>
                <Box width="fit-content" paddingBlock="6">
                    {tittel && (
                        <Heading level="3" size="small" style={{ textDecoration: 'underline' }}>
                            {tittel}
                        </Heading>
                    )}
                    {children}
                </Box>
            </HStack>
        </Box>
    );
}
