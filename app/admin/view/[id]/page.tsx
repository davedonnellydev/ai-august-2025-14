import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ViewPost } from '@/components/ViewPost/ViewPost';

export default async function AdminViewPost(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const [row] = await db.select().from(posts).where(eq(posts.id, Number(params.id)));
  if (!row) return <div>Not found</div>;
  return (
    <ViewPost
      post={row}
      isAdmin={true}
      backHref="/admin"
      backText="Back to admin posts"
    />
  );
}


