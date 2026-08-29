import type React from 'react';

type Props = {
    svgInnhold: React.ReactNode;
    ariaLabel?: string;
    størrelse?: 'stor' | 'medium' | 'liten' | number;
};

export function Pictogram({ svgInnhold, ariaLabel, størrelse = 'medium' }: Props) {
    const størrelseIPx =
        størrelse === 'stor' ? 64 : størrelse === 'medium' ? 48 : størrelse === 'liten' ? 32 : størrelse;

    return (
        <svg
            aria-label={ariaLabel}
            role="img"
            width={størrelseIPx}
            height={størrelseIPx}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {svgInnhold}
        </svg>
    );
}
