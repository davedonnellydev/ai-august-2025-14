import MarkdownIt from 'markdown-it';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import { Container, Paper, Title, Anchor } from '@mantine/core';

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
    <Container>
      <Anchor component={Link} href={backHref} mb="md">
        ← {backText}
      </Anchor>
      <Paper>
        <Title order={2} mb="sm">
          {post.title}
        </Title>
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </Paper>
    </Container>
  );
}


