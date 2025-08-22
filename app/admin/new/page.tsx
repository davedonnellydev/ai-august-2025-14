import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { Editor } from '@/components/Editor/Editor';

async function createPost(payload: any) {
  'use server';

  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  const res = await fetch(`${protocol}://${host}/api/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to create post: ${res.status} ${res.statusText}`);
  }

  const row = await res.json();
  redirect(`/admin/edit/${row.id}`);
}

export default function New() {
  return <Editor onSave={createPost} />;
}
