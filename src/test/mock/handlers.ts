import { http, HttpResponse } from 'msw';
import { HentMinSideBarnetrygdSuksessDto } from '@/app/typer/api/Barnetrygd';

export const handlers = [
    http.get('/barnetrygd/min-barnetrygd/api/minside/barnetrygd', () => {
        return HttpResponse.json<HentMinSideBarnetrygdSuksessDto>({
            barnetrygd: {
                ordinær: {
                    startmåned: '2025-10',
                },
            },
        });
    }),
];
