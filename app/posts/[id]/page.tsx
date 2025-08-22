import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import MarkdownIt from "markdown-it";
import DOMPurify from "isomorphic-dompurify";

const md = new MarkdownIt();

export async function generateStaticParams() {
  const rows = await db.select({ id: posts.id }).from(posts).where(eq(posts.status, "published"));
  return rows.map(r => ({ id: r.id }));
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const [row] = await db.select().from(posts).where(eq(posts.id, params.id));
  if (!row || row.status !== "published") return <div>Not found</div>;
  const html = DOMPurify.sanitize(row.content_html || md.render(row.content_md));
  return (
    <article className="prose mx-auto py-10" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
