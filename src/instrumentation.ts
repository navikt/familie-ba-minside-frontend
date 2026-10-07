export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const { erLokalt } = await import('@/util/miljø');
        if (erLokalt()) {
            const { server } = await import('./test/mock/node');
            server.listen({
                onUnhandledFrame({ frame, defaults }) {
                    if (frame.protocol === 'http') {
                        const { request } = frame.data as { request: Request };
                        if (request.url.includes('dekoratoren/api/version')) {
                            return;
                        }
                    }
                    defaults.warn();
                },
            });
        }
    }
}
