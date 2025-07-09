import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import Script from 'next/script';
import './index.css';
import { Page, PageBlock } from '@navikt/ds-react/Page';
import { erDev, erLokalt } from './util/miljø';
import { LoggerWrapper } from './komponenter/LoggerWrapper';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default async function RootLayout({ children }: Readonly<RootLayoutProps>) {
    const Decorator = await fetchDecoratorReact({
        env: erDev() ? 'dev' : 'prod',
    });

    if (erLokalt()) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { server } = require('../test/mock/node');
        server.listen({
            onUnhandledRequest(request: Request, print: { warning: () => void }) {
                if (request.url.includes('dekoratoren/api/version')) {
                    return;
                }

                print.warning();
            },
        });
    }

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
}
