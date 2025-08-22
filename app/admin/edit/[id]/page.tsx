
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { Editor } from '@/components/Editor/Editor';

async function getPost(id: string) {
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const res = await fetch(`${protocol}://${host}/api/posts/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function savePost(postId: string, payload: any) {
  'use server';

  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  const res = await fetch(`${protocol}://${host}/api/posts/${postId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to save post: ${res.status} ${res.statusText}`);
  }

  redirect('/admin');
}

export default async function Edit(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const post = await getPost(params.id);

  return (
    <Editor
      initial={post}
      onSave={savePost.bind(null, params.id)}
    />
  );
}
