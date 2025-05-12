import { BodyLong, Box, Button, Heading, VStack } from '@navikt/ds-react';
import { ReactNode } from 'react';

interface Props {
    tittel?: ReactNode;
    children?: ReactNode;
}

const YtelseKort: React.FC<Props> = ({ tittel, children }) => {
    return (
        <Box padding="6" borderRadius="xlarge" shadow="medium">
            <VStack height="100%" justify="space-between">
                <Box>
                    <Heading level="3" size="small" spacing>
                        {tittel}
                    </Heading>
                    <BodyLong textColor="subtle" spacing>
                        {children}
                    </BodyLong>
                </Box>
                <Button variant="secondary">Les mer</Button>
            </VStack>
        </Box>
    );
};

export default YtelseKort;
