import { expect, beforeAll, afterEach, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom/vitest';
import { server } from '@/test/mock/node';

expect.extend(matchers);

beforeAll(() => server.listen());
afterEach(() => {
    cleanup();
    server.resetHandlers();
});
afterAll(() => server.close());
