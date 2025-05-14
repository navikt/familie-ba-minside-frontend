import { NextApiRequest } from 'next';
import { validateToken } from '@navikt/oasis';

const erLokalt = () => {
    return process.env.NODE_ENV !== 'production';
};

export async function GET(req: NextApiRequest) {
    if (erLokalt()) {
        return new Response(null, { status: 200 });
    }

    const autorization = req.headers.authorization;

    if (!autorization) {
        return new Response('ingen token', { status: 201 });
    }
    const token = autorization.replace('Bearer ', '');

    const result = await validateToken(token);

    if (result.ok) {
        return new Response(token, { status: 200 });
    } else {
        return new Response(null, { status: 401 });
    }
}
