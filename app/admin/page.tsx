import Link from "next/link";
import { headers } from 'next/headers';

export default async function AdminHome() {
  try {
    // Get the host dynamically from headers
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const res = await fetch(`${protocol}://${host}/api/posts`, { cache: "no-store" });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }
    
    const posts = await res.json();

    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Posts</h1>
          <Link className="underline" href="/admin/new">New</Link>
        </div>
        {posts && posts.length > 0 ? (
          <ul className="space-y-2">
            {posts.map((p: any) => (
              <li key={p.id} className="flex justify-between">
                <span>{p.title} <em className="opacity-60">({p.status})</em></span>
                <span className="space-x-3">
                  <Link className="underline" href={`/admin/edit/${p.id}`}>Edit</Link>
                  <Link className="underline" href={`/posts/${p.slug}`}>View</Link>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No posts found.</p>
            <p className="text-sm mt-2">Create your first post using the "New" link above.</p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error loading posts:', error);
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Posts</h1>
          <Link className="underline" href="/admin/new">New</Link>
        </div>
        <div className="text-center py-8 text-red-500">
          <p>Error loading posts.</p>
          <p className="text-sm mt-2">Please check your database connection and try again.</p>
          <details className="mt-4 text-xs text-left max-w-md mx-auto">
            <summary className="cursor-pointer">Error details</summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
              {error instanceof Error ? error.message : String(error)}
            </pre>
          </details>
        </div>
      </div>
    );
  }
}
