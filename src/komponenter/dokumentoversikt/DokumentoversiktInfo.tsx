import { Box, Heading, Link, List } from '@navikt/ds-react';
import { ListItem } from '@navikt/ds-react/List';

export function DokumentoversiktInfo() {
    return (
        <Box marginBlock={'space-16 space-0'}>
            <Heading level="3" size="xsmall">
                Finner du ikke det du leter etter?
            </Heading>
            <List size="small">
                <ListItem>Vi viser dokumenter i saker fra midten av 2016.</ListItem>
                <ListItem>
                    <Link href="https://www.nav.no/kontaktoss#skriv-til-oss">
                        Har du sendt en søknad eller et dokument som ikke vises her?
                    </Link>
                </ListItem>
            </List>
        </Box>
    );
}
