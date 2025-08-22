import MarkdownIt from 'markdown-it';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';

type Post = {
  id: number;
  title: string;
  content_md: string;
  content_html: string | null;
  status: 'draft' | 'published';
};

const md = new MarkdownIt();

export function ViewPost({
  post,
  isAdmin = false,
  backHref = '/',
  backText = 'Back to posts',
}: {
  post: Post;
  isAdmin?: boolean;
  backHref?: string;
  backText?: string;
}) {
  if (!post) return <div>Not found</div>;

  if (!isAdmin && post.status !== 'published') {
    return <div>Not found</div>;
  }

  const html = DOMPurify.sanitize(post.content_html || md.render(post.content_md));

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="mb-4">
        <Link className="underline" href={backHref}>
          ← {backText}
        </Link>
      </div>
      <article className="prose mx-auto py-4">
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </div>
  );
}


