import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import Script from 'next/script';
import './index.css';
import { Page, PageBlock } from '@navikt/ds-react/Page';
import { erDev } from './util/miljø';
import { LoggerWrapper } from './komponenter/LoggerWrapper';

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const Decorator = await fetchDecoratorReact({
        env: erDev() ? 'dev' : 'prod',
    });

    return (
        <html lang="no">
            <head>
                <Decorator.HeadAssets />
                <title>Barnetrygden min</title>
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
                    <LoggerWrapper>{children}</LoggerWrapper>
                </PageBlock>
            </Page>
        </html>
    );
};

export default RootLayout;
