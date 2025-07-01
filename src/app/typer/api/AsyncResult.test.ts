import { describe, test, expect } from 'vitest';
import { AsyncResult } from '@/app/typer/api/AsyncResult';

describe('AsyncResult', () => {
    test('skal opprette AsyncResult success', () => {
        // Act
        const asyncResult = AsyncResult.success('msg');

        // Expect
        expect(asyncResult.data).toBe('msg');
    });

    test('skal opprette AsyncResult failure for error', () => {
        // Act
        const asyncResult = AsyncResult.failure(
            new Error('Ops! Ops! Noe gikk galt!', { cause: 'cause' })
        );

        // Expect
        expect(asyncResult.error.message).toBe('Ops! Ops! Noe gikk galt!');
        expect(asyncResult.error.cause).toBe('cause');
    });

    test('skal opprette AsyncResult failure for string', () => {
        // Act
        const asyncResult = AsyncResult.failure('Ops! Ops! Noe gikk galt!');

        // Expect
        expect(asyncResult.error.message).toBe('Ops! Ops! Noe gikk galt!');
        expect(asyncResult.error.cause).toBeUndefined();
    });

    test('skal opprette AsyncResult failure for unknown', () => {
        // Arrange
        const obj = { key: 'value' } as unknown;

        // Act
        const asyncResult = AsyncResult.failure(obj);

        // Expect
        expect(asyncResult.error.message).toBe('En ukjent feil oppstod.');
        expect(asyncResult.error.cause).toBeUndefined();
    });
});
