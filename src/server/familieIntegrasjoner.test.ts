// @vitest-environment node
import { NextRequest } from 'next/server';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { GET as hentDokument } from '@/app/api/dokument/route';
import { GET as hentDokumenter } from '@/app/api/dokumenter/route';
import { hentOboToken } from '@/server/auth/hentOboToken';
import { erToggleSkruddPå, initialiserUnleash, UnleashToggle } from '@/util/unleash';

vi.mock('@/server/auth/hentOboToken', () => ({ hentOboToken: vi.fn() }));
vi.mock('@/util/unleash', async importOriginal => ({
    ...(await importOriginal<typeof import('@/util/unleash')>()),
    initialiserUnleash: vi.fn(),
    erToggleSkruddPå: vi.fn(),
}));

afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetAllMocks();
});

describe.each([
    {
        navn: 'dokument',
        get: hentDokument,
        path: '/api/journalpostselvbetjening/journalpost-test/dokument/dokument-test',
        response: () => new Response('dokument-test', { headers: { 'Content-Type': 'application/pdf' } }),
    },
    {
        navn: 'dokumenter',
        get: hentDokumenter,
        path: '/api/journalpostselvbetjening/dokumentoversikt/BAR',
        response: () => Response.json({ tema: [] }),
    },
])('$navn', ({ get, path, response }) => {
    test.each([
        ['dev', false, 'dev-fss', 'https://familie-integrasjoner.dev-fss-pub.nais.io'],
        ['prod', false, 'prod-fss', 'https://familie-integrasjoner.prod-fss-pub.nais.io'],
        ['dev', true, 'dev-gcp', 'http://familie-integrasjoner'],
        ['prod', true, 'prod-gcp', 'http://familie-integrasjoner'],
    ])('velger riktig audience og URL i %s med GCP-toggle %s', async (env, brukGcp, cluster, baseUrl) => {
        vi.stubEnv('ENV', env);
        vi.mocked(erToggleSkruddPå).mockReturnValue(brukGcp);
        vi.mocked(hentOboToken).mockResolvedValue({ ok: true, token: 'test-token' });
        const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(response());
        const req = new NextRequest(
            'http://localhost/api/dokument?journalpostId=journalpost-test&dokumentInfoId=dokument-test'
        );

        const result = await get(req);

        expect(result.status).toBe(200);
        expect(initialiserUnleash).toHaveBeenCalledOnce();
        expect(erToggleSkruddPå).toHaveBeenCalledExactlyOnceWith(UnleashToggle.BRUK_FAMILIE_INTEGRASJONER_I_GCP);
        expect(hentOboToken).toHaveBeenCalledWith(req, `${cluster}:teamfamilie:familie-integrasjoner`);
        expect(fetchMock).toHaveBeenCalledWith(`${baseUrl}${path}`, expect.any(Object));
    });

    test('sender ikke dokumentkall når tokenutveksling feiler', async () => {
        vi.mocked(erToggleSkruddPå).mockReturnValue(true);
        vi.mocked(hentOboToken).mockResolvedValue({ ok: false, error: 'Tokenutveksling feilet' });
        const fetchMock = vi.spyOn(globalThis, 'fetch');

        const result = await get(new NextRequest('http://localhost/api/dokument'));

        expect(result.status).toBe(401);
        expect(fetchMock).not.toHaveBeenCalled();
    });
});
