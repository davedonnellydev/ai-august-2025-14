'use client';

import React from 'react';
import { AppShell, Title, Group, Button } from '@mantine/core';
import Link from 'next/link';

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AppShell header={{ height: 56 }} padding="md">
      <AppShell.Header className="px-4 flex items-center">
        <Group justify="space-between" w="100%">
          <Title order={3}>Blog Admin</Title>
          <Group gap="xs">
            <Button component={Link} href="/admin" variant="subtle">
              Posts
            </Button>
            <Button component={Link} href="/admin/new" variant="light">
              New Post
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                try {
                  await fetch('/api/admin/logout', { method: 'POST' });
                  window.location.href = '/admin/login';
                } catch (e) {
                  window.location.href = '/admin/login';
                }
              }}
            >
              Logout
            </Button>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
