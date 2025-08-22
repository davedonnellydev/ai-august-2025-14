import { render, screen } from '@/test-utils';
import { Welcome } from './Welcome';

describe('Welcome component', () => {
  it('renders the welcome title', () => {
    render(<Welcome />);
    expect(screen.getByText(/Welcome to your/)).toBeInTheDocument();
    expect(screen.getByText('Starter')).toBeInTheDocument();
  });
});
