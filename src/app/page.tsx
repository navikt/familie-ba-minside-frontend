import { BodyShort, Box, ExpansionCard, Heading } from '@navikt/ds-react';
import {
    ExpansionCardContent,
    ExpansionCardDescription,
    ExpansionCardHeader,
    ExpansionCardTitle,
} from '@navikt/ds-react/ExpansionCard';

export default function Page() {
    return (
        <>
            <Box paddingBlock={'12'}>
                <Heading level={'1'} size="large">
                    Barnetrygden Min
                </Heading>
            </Box>

            <ExpansionCard aria-label="Informasjon om barnetrygd">
                <ExpansionCardHeader>
                    <ExpansionCardTitle>Du har barnetrygd</ExpansionCardTitle>
                    <ExpansionCardDescription>
                        <BodyShort
                            style={{ display: 'block' }}
                            as="span"
                            size="small"
                            textColor="subtle"
                            spacing
                        >
                            13.09.2023
                        </BodyShort>
                        Du har barnetrygd, her vil det komme mer informasjon om hvor mye du får hver
                        måned samt hvis du har søknader.
                    </ExpansionCardDescription>
                </ExpansionCardHeader>
                <ExpansionCardContent>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic laboriosam
                    repudiandae quibusdam ipsa fugit dolorem consequuntur rem omnis obcaecati.
                    Nostrum alias pariatur eum quidem similique incidunt consequuntur autem aliquid.
                    Ad.
                </ExpansionCardContent>
            </ExpansionCard>
        </>
    );
}
