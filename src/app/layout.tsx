import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import Script from 'next/script';

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const Decorator = await fetchDecoratorReact({
        env: 'prod',
        params: {
            simple: true,
        },
    });

    return (
        <html lang="no">
            <head>
                <Decorator.HeadAssets />
            </head>
            <body>
                <Decorator.Header />
                {children}
                <Decorator.Footer />
                <Decorator.Scripts loader={Script} />
            </body>
        </html>
    );
};

export default RootLayout;
