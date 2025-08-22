import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { ListPosts } from '@/components/ListPosts/ListPosts';
import { Button, Container, Group } from '@mantine/core';
import Link from 'next/link';

export default async function HomePage() {
  try {
    const rows = await db
      .select({ id: posts.id, title: posts.title, status: posts.status })
      .from(posts)
      .where(eq(posts.status, 'published'))
      .orderBy(desc(posts.updated_at));

    return (
      <>
        <Container>
          <Group justify="flex-end" mb="md">
            <Button component={Link} href="/admin" variant="outline">
              Admin
            </Button>
          </Group>
        </Container>
        <ListPosts posts={rows} isAdmin={false} />
      </>
    );
  } catch (error) {
    console.error('Error loading posts:', error);
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-8 text-red-500">
          <p>Error loading posts.</p>
        </div>
      </div>
    );
  }
}
