import Link from 'next/link';

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
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Posts</h1>
        {isAdmin && (
          <Link className="underline" href="/admin/new">
            New
          </Link>
        )}
      </div>
      {posts && posts.length > 0 ? (
        <ul className="space-y-2">
          {posts.map((p) => (
            <li key={p.id} className="flex justify-between">
              <span>
                {p.title}
                {isAdmin && (
                  <em className="opacity-60"> ({p.status})</em>
                )}
              </span>
              <span className="space-x-3">
                {isAdmin ? (
                  <>
                    <Link className="underline" href={`/admin/edit/${p.id}`}>
                      Edit
                    </Link>
                    <Link className="underline" href={`/admin/view/${p.id}`}>
                      View
                    </Link>
                  </>
                ) : (
                  <Link className="underline" href={`/posts/${p.id}`}>
                    View
                  </Link>
                )}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No posts found.</p>
        </div>
      )}
    </div>
  );
}
