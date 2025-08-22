import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const [row] = await db.select().from(posts).where(eq(posts.id, Number(params.id)));
  return row ? Response.json(row) : new Response("Not found", { status: 404 });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const now = Date.now();
  const [row] = await db.update(posts).set({
    ...body,
    tags_csv: (body.tags ?? []).join(","),
    updated_at: now,
    published_at: body.status === "published" ? (body.published_at ?? now) : null,
  }).where(eq(posts.id, Number(params.id))).returning();
  return Response.json(row);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await db.delete(posts).where(eq(posts.id, Number(params.id)));
  return new Response(null, { status: 204 });
}
