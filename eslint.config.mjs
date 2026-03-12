import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';

const eslintConfig = [
    eslintConfigPrettier,
    ...nextCoreWebVitals,
    ...nextTypescript,
    {
        ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
        rules: {
            'react-hooks/set-state-in-effect': 'warn', // TODO : Sett til error når problemene er fikset
        },
    },
];

export default eslintConfig;
