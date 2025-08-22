'use client';

import React from 'react';
import { AppShell, Title } from '@mantine/core';

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AppShell header={{ height: 56 }} padding="md">
      <AppShell.Header className="px-4 flex items-center">
        <Title order={3}>Blog Admin</Title>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
