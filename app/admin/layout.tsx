'use client';
import { MantineProvider, AppShell, Title } from '@mantine/core';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProvider defaultColorScheme="light">
      <AppShell header={{ height: 56 }} padding="md">
        <AppShell.Header className="px-4 flex items-center">
          <Title order={3}>Blog Admin</Title>
        </AppShell.Header>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
