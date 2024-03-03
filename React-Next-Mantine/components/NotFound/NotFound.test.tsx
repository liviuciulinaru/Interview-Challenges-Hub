import { render, screen } from '@/test-utils';
import { NotFound } from './NotFound';

describe('Welcome component', () => {
  it('has correct Next.js theming section link', () => {
    render(<NotFound />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/next/'
    );
  });
});
