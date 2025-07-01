import { BodyLong, Box, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { ReactNode } from 'react';

interface Props {
    href?: string;
    tittel?: ReactNode;
    ikon?: ReactNode;
    children?: ReactNode;
}

export default function YtelseKort({ href, tittel, ikon, children }: Props) {
    return (
        <Box padding="6" borderRadius="xlarge" shadow="medium">
            <VStack height="100%" justify="space-between">
                <Box>
                    <HStack align="start" gap="4" marginBlock="0 4">
                        <Heading level="3" size="small" style={{ flex: 1 }}>
                            {tittel}
                        </Heading>
                        {ikon}
                    </HStack>
                    <BodyLong textColor="subtle" spacing>
                        {children}
                    </BodyLong>
                </Box>
                <Button as="a" href={href} variant="secondary">
                    Les mer
                </Button>
            </VStack>
        </Box>
    );
}
