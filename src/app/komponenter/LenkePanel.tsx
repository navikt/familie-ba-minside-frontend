import { ChevronRightIcon } from '@navikt/aksel-icons';
import { Box, Heading, HStack } from '@navikt/ds-react';
import React, { ReactNode, useState } from 'react';

interface Props {
    href?: string;
    tittel?: ReactNode;
    ikon?: ReactNode;
    children?: ReactNode;
    graBakgrunn?: boolean;
}

const LenkePanel: React.FC<Props> = ({ href, tittel, ikon, children, graBakgrunn }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Box
            as="a"
            href={href}
            paddingInline={'6'}
            borderRadius={'xlarge'}
            background={
                graBakgrunn
                    ? isHovered
                        ? 'surface-default'
                        : 'surface-subtle'
                    : isHovered
                      ? 'surface-subtle'
                      : 'surface-default'
            }
            style={{
                textDecoration: 'none',
                color: 'inherit',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <HStack wrap={false} height={'100%'}>
                <Box marginBlock={'auto'} marginInline={'0 6'}>
                    {ikon && (
                        <Box
                            background={graBakgrunn ? 'surface-default' : 'surface-subtle'}
                            borderRadius={'full'}
                            height={'4rem'}
                            width={'4rem'}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {ikon}
                        </Box>
                    )}
                </Box>
                <Box width={'fit-content'} paddingBlock={'6'}>
                    {tittel && (
                        <Heading level={'3'} size="small" style={{ textDecoration: 'underline' }}>
                            {tittel}
                        </Heading>
                    )}
                    {children}
                </Box>
                <Box marginBlock={'auto'} marginInline={'auto 0'} paddingInline={'2 0'}>
                    <ChevronRightIcon fontSize="1.5rem" />
                </Box>
            </HStack>
        </Box>
    );
};

export default LenkePanel;
