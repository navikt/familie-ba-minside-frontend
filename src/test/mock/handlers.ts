import { HentMinSideBarnetrygdSuksess } from '@/typer/api/barnetrygd';
import { hentFamilieBaSakBaseUrl } from '@/util/miljø';
import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('http://fakedings.intern.dev.nav.no/fake/tokenx', () => {
        return HttpResponse.json('1234', { status: 200 });
    }),
    http.get(hentFamilieBaSakBaseUrl() + '/api/minside/barnetrygd', () => {
        return HttpResponse.json<HentMinSideBarnetrygdSuksess>(
            {
                barnetrygd: {
                    ordinær: {
                        startmåned: '2024-10',
                    },
                },
            },
            { status: 200 }
        );
    }),
];
