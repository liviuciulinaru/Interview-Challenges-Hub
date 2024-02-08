import { render, screen } from '@/test-utils';
import { Error } from './Error';

describe('Error component', () => {
  it('has correct Next.js theming section link', () => {
    render(<Error />);
    expect(screen.getByText('Error')).toHaveAttribute('href', 'https://mantine.dev/guides/next/');
  });
});
