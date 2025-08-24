'use client';

import { useRouter } from 'next/navigation';
import { Button, PasswordInput, Stack } from '@mantine/core';
import { useState } from 'react';

export function AdminLoginForm({ next = '/admin' }: { next?: string }) {
  const [pwd, setPwd] = useState('');
  const router = useRouter();

  async function submit() {
    const res = await fetch('/api/admin/login', { method: 'POST', body: pwd });
    if (res.ok) {
      router.push(next);
    }
  }

  return (
    <Stack maw={360} mx="auto" mt="xl">
      <PasswordInput
        label="Admin password"
        value={pwd}
        onChange={(e) => setPwd(e.currentTarget.value)}
      />
      <Button onClick={submit}>Enter</Button>
    </Stack>
  );
}


