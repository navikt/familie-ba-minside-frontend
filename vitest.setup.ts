import { vi, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom/vitest';
import { server } from '@/test/mock/node';

expect.extend(matchers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());

beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
    cleanup();
    server.resetHandlers();
    vi.restoreAllMocks();
    vi.clearAllTimers();
});
