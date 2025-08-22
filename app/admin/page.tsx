import { db } from '@/db';
import { posts } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { ListPosts } from '@/components/ListPosts/ListPosts';

export default async function AdminHome() {
  try {
    const rows = await db
      .select({ id: posts.id, title: posts.title, status: posts.status })
      .from(posts)
      .orderBy(desc(posts.updated_at));

    return <ListPosts posts={rows} isAdmin={true} />;
  } catch (error) {
    console.error('Error loading posts:', error);
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Posts</h1>
        </div>
        <div className="text-center py-8 text-red-500">
          <p>Error loading posts.</p>
          <p className="text-sm mt-2">
            Please check your database connection and try again.
          </p>
        </div>
      </div>
    );
  }
}
