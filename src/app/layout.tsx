import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import Script from 'next/script';
import './index.css';
import { Page, PageBlock } from '@navikt/ds-react/Page';

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const Decorator = await fetchDecoratorReact({
        env: 'prod',
        // params: {
        //     simple: true,
        // },
    });

    return (
        <html lang="no">
            <head>
                <Decorator.HeadAssets />
                <title>Barnetrygden Min</title>
            </head>
            <Page
                as="body"
                footer={
                    <>
                        <Decorator.Footer />
                        <Decorator.Scripts loader={Script} />
                    </>
                }
            >
                <Decorator.Header />
                <PageBlock as="main">
                    <>{children}</>
                </PageBlock>
            </Page>
        </html>
    );
};

export default RootLayout;
