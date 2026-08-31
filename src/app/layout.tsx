import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import Script from 'next/script';
import './index.css';
import { Page, PageBlock } from '@navikt/ds-react/Page';
import { KillSwitch } from '@/komponenter/KillSwitch';
import { LoggerWrapper } from '@/komponenter/LoggerWrapper';
import { AxeCoreReact } from '@/test/AxeCoreReact';
import { erDev } from '@/util/miljø';
import { initialiserUnleash } from '@/util/unleash';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default async function RootLayout({ children }: Readonly<RootLayoutProps>) {
    const Decorator = await fetchDecoratorReact({
        env: erDev() ? 'dev' : 'prod',
    });

    await initialiserUnleash();

    return (
        <html lang="no">
            <head>
                <Decorator.HeadAssets />
                <title>Barnetrygden min</title>
            </head>
            <LoggerWrapper>
                <AxeCoreReact />
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
                        <KillSwitch>{children}</KillSwitch>
                    </PageBlock>
                </Page>
            </LoggerWrapper>
        </html>
    );
}
