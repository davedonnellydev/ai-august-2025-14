'use client';

import React from 'react';
import { MantineProvider } from '@mantine/core';
import { MantineThemeOverride } from '@mantine/core';

interface ClientMantineProviderProps {
  children: React.ReactNode;
  theme: MantineThemeOverride;
}

export function ClientMantineProvider({ children, theme }: ClientMantineProviderProps) {
  return (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  );
}
