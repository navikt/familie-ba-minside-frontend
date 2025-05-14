import { validateToken } from '@navikt/oasis';
import { NextRequest } from 'next/server';

const erLokalt = () => {
    return process.env.NODE_ENV !== 'production';
};

export async function GET(req: NextRequest) {
    if (erLokalt()) {
        return new Response(null, { status: 200 });
    }

    const authorization = req.headers.get('authorization');

    if (!authorization) {
        return new Response('ingen token', { status: 201 });
    }
    const token = authorization.replace('Bearer ', '');

    const result = await validateToken(token);

    if (result.ok) {
        return new Response(token, { status: 200 });
    } else {
        return new Response(null, { status: 401 });
    }
}
