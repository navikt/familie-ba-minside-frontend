import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { render } from '@/test/testrender';
import Page from './page';

expect.extend(toHaveNoViolations);

describe('Page', () => {
    it('viser overskrifter', () => {
        const { screen } = render(<Page />);
        expect(screen.getByRole('heading', { name: /Barnetrygden min/i })).toBeInTheDocument();
        expect(screen.getByText('Ønsker du å kontakte oss?')).toBeInTheDocument();
        expect(screen.getByText('Snarveier')).toBeInTheDocument();
        expect(screen.getByText('Dokumentoversikt')).toBeInTheDocument();
        expect(screen.getByText('Dette kan du ha rett til')).toBeInTheDocument();
    });

    it('har ingen a11y-feil', async () => {
        const { container } = render(<Page />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
