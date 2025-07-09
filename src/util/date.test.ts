import { describe, expect, test } from 'vitest';
import { formatYearMonth, Locale } from './date';

describe('FormatYearMonth', () => {
    test('skal formatere YearMonth til nb-no', () => {
        // Act
        const formatted = formatYearMonth('2025-10', Locale.NB_NO);

        // Expect
        expect(formatted).toBe('10.2025');
    });

    test('skal formatere YearMonth til nn-no', () => {
        // Act
        const formatted = formatYearMonth('2025-10', Locale.NN_NO);

        // Expect
        expect(formatted).toBe('10.2025');
    });

    test('skal formatere YearMonth til en-gb', () => {
        // Act
        const formatted = formatYearMonth('2025-10', Locale.EN_GB);

        // Expect
        expect(formatted).toBe('10/2025');
    });
});
