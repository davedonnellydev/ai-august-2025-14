'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, PasswordInput, Stack } from '@mantine/core';
import { useState } from 'react';

export default function AdminLogin() {
  const [pwd, setPwd] = useState('');
  const router = useRouter();
  const next = useSearchParams().get('next') ?? '/admin';

  async function submit() {
    // const ok = pwd === process.env.NEXT_PUBLIC_DUMMY ? false : true; // just to satisfy TS
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
