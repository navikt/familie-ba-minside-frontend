interface Success<T> {
    data: T;
    error?: never;
}

interface Failure {
    data?: never;
    error: Error;
}

export type AsyncResult<T> = Success<T> | Failure;

export function failure(error: Error | string | unknown): Failure {
    if (error instanceof Error) {
        return { error: new Error(error.message, { cause: error.cause }) };
    }
    if (typeof error === 'string') {
        return { error: new Error(error) };
    }
    return { error: new Error('En ukjent feil oppstod.') };
}

export function success<T>(data: T) {
    return { data };
}

export * as AsyncResult from './AsyncResult';
