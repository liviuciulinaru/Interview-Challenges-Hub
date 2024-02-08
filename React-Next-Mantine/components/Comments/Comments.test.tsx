import { render, screen } from '@/test-utils';
import Comments from './Comments';

describe('Comments component', () => {
  it('has correct Next.js theming section link', () => {
    render(<Comments />);
    expect(screen.getByText('Error')).toHaveAttribute('href', 'https://mantine.dev/guides/next/');
  });
});
