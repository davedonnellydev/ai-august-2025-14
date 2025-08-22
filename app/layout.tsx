import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { theme } from '../theme';
import { ClientMantineProvider } from './ClientMantineProvider';

export const metadata = {
  title: 'Blog Manager',
  description:
    'An Blog Manager app with an AI writing assistant built for AIAugust App a Day Challenge',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <ClientMantineProvider theme={theme}>{children}</ClientMantineProvider>
      </body>
    </html>
  );
}
