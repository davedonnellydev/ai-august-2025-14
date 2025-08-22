import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ViewPost } from '@/components/ViewPost/ViewPost';

export async function generateStaticParams() {
  const rows = await db
    .select({ id: posts.id })
    .from(posts)
    .where(eq(posts.status, 'published'));
  return rows.map((r) => ({ id: r.id }));
}

export default async function PostPage(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  const [row] = await db.select().from(posts).where(eq(posts.id, params.id));
  if (!row) return <div>Not found</div>;
  return <ViewPost post={row} isAdmin={false} backHref="/" backText="Back to posts" />;
}
