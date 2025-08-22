import Link from 'next/link';
import { Container, Group, Title, Button, Paper, Stack, Text } from '@mantine/core';

type PostListItem = {
  id: number;
  title: string;
  status: 'draft' | 'published';
};

export function ListPosts({
  posts,
  isAdmin = false,
}: {
  posts: PostListItem[];
  isAdmin?: boolean;
}) {
  return (
    <Container>
      <Group justify="space-between" mb="md">
        <Title order={2}>Posts</Title>
        {isAdmin && (
          <Button component={Link} href="/admin/new">
            New Post
          </Button>
        )}
      </Group>
      {posts && posts.length > 0 ? (
        <Stack>
          {posts.map((p) => (
            <Paper key={p.id} withBorder>
              <Group justify="space-between" wrap="wrap">
                <div>
                  <Text fw={600}>{p.title}</Text>
                  {isAdmin && (
                    <Text c="dimmed" size="sm" component="span" aria-live="polite">
                      {`(${p.status})`}
                    </Text>
                  )}
                </div>
                <Group gap="xs">
                  {isAdmin ? (
                    <>
                      <Button component={Link} href={`/admin/edit/${p.id}`} variant="subtle">
                        Edit
                      </Button>
                      <Button component={Link} href={`/admin/view/${p.id}`} variant="light">
                        View
                      </Button>
                    </>
                  ) : (
                    <Button component={Link} href={`/posts/${p.id}`} variant="light">
                      View
                    </Button>
                  )}
                </Group>
              </Group>
            </Paper>
          ))}
        </Stack>
      ) : (
        <Paper withBorder>
          <Text c="dimmed" ta="center">
            No posts found.
          </Text>
        </Paper>
      )}
    </Container>
  );
}
