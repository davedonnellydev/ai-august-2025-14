import { render, screen } from '@/test-utils';
import { ListPosts } from './ListPosts';

describe('ListPosts', () => {
  it('renders posts and hides admin controls when not admin', () => {
    render(
      <ListPosts
        posts={[
          { id: 1, title: 'Post A', status: 'published' },
          { id: 2, title: 'Post B', status: 'draft' },
        ]}
        isAdmin={false}
      />
    );

    expect(screen.getByText('Posts')).toBeInTheDocument();
    expect(screen.getByText('Post A')).toBeInTheDocument();
    expect(screen.getByText('Post B')).toBeInTheDocument();
    expect(screen.queryByText(/New/)).not.toBeInTheDocument();
    expect(screen.getAllByText('View').length).toBeGreaterThan(0);
  });

  it('shows admin controls when admin', () => {
    render(
      <ListPosts
        posts={[{ id: 1, title: 'Admin Post', status: 'draft' }]}
        isAdmin
      />
    );

    expect(screen.getByText('Admin Post')).toBeInTheDocument();
    expect(screen.getByText('(draft)')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();
  });
});
