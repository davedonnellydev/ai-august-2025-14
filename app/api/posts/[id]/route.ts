import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(_: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const [row] = await db
    .select()
    .from(posts)
    .where(eq(posts.id, Number(params.id)));
  return row ? Response.json(row) : new Response('Not found', { status: 404 });
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const body = await req.json();
  const now = new Date();

  const updateData = {
    title: body.title,
    summary: body.summary ?? '',
    content_md: body.content_md ?? '',
    status: body.status ?? 'draft',
    tags_csv: (body.tags ?? []).join(','),
    updated_at: now,
    published_at:
      body.status === 'published'
        ? (body.published_at ? new Date(body.published_at) : now)
        : null,
  } satisfies Partial<typeof posts.$inferInsert>;

  const [row] = await db
    .update(posts)
    .set(updateData)
    .where(eq(posts.id, Number(params.id)))
    .returning();
  return Response.json(row);
}

export async function DELETE(_: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  await db.delete(posts).where(eq(posts.id, Number(params.id)));
  return new Response(null, { status: 204 });
}
