import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    basePath: '/barnetrygd/min-barnetrygd',
    // En hack for å bygge oasis. Burde løses med riktig config i prosjektet
    webpack: (config) => {
        config.externals.push({
            'node:crypto': 'commonjs crypto',
        });
        return config;
    },
};

export default nextConfig;
