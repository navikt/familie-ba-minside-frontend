import React from 'react';

type Props = {
    svgInnhold: React.ReactNode;
    størrelse?: 'stor' | 'medium' | 'liten' | number;
};

const AleneSmall: React.FC<Props> = ({ svgInnhold, størrelse = 'medium' }) => {
    const størrelseIPx =
        størrelse === 'stor'
            ? 64
            : størrelse === 'medium'
              ? 48
              : størrelse === 'liten'
                ? 32
                : størrelse;

    return (
        <svg
            width={størrelseIPx}
            height={størrelseIPx}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {svgInnhold}
        </svg>
    );
};

export default AleneSmall;
