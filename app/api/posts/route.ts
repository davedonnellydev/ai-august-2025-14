import { db } from '@/db';
import { posts } from '@/db/schema';
import { desc } from 'drizzle-orm';
import slugify from 'slugify';

export async function GET() {
  const data = await db.select().from(posts).orderBy(desc(posts.updated_at));
  return Response.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const slug = body.slug || slugify(body.title, { lower: true, strict: true });
  const now = Date.now();

  const [row] = await db
    .insert(posts)
    .values({
      title: body.title,
      slug,
      summary: body.summary ?? '',
      content_md: body.content_md ?? '',
      tags_csv: (body.tags ?? []).join(','),
      status: body.status ?? 'draft',
      published_at: body.status === 'published' ? new Date(now) : null,
      created_at: new Date(now),
      updated_at: new Date(now),
    } satisfies typeof posts.$inferInsert)
    .returning();

  return Response.json(row, { status: 201 });
}
