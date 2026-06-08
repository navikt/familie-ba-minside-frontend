export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const { erLokalt } = await import('@/util/miljø');
        if (erLokalt()) {
            const { server } = await import('./test/mock/node');
            server.listen({
                onUnhandledRequest(request: Request, print: { warning: () => void }) {
                    if (request.url.includes('dekoratoren/api/version')) {
                        return;
                    }
                    print.warning();
                },
            });
        }
    }
}
