import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('http://fakedings.intern.dev.nav.no/fake/tokenx', () => {
        return HttpResponse.json('1234', { status: 200 });
    }),
];
