import { createTheme, MantineColorsTuple } from '@mantine/core';

const brand: MantineColorsTuple = [
  '#f0f6ff',
  '#d9e8ff',
  '#b2d0ff',
  '#89b6ff',
  '#6aa2ff',
  '#598fff',
  '#4f84ff',
  '#4573e6',
  '#3b66cc',
  '#2a4da6',
];

export const theme = createTheme({
  fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  headings: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial',
    sizes: {
      h1: { fontSize: '2rem', lineHeight: '1.2', fontWeight: '700' },
      h2: { fontSize: '1.5rem', lineHeight: '1.3', fontWeight: '700' },
    },
  },
  colors: { brand },
  primaryColor: 'brand',
  defaultRadius: 'md',
  components: {
    Container: {
      defaultProps: {
        size: 'lg',
      },
    },
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Paper: {
      defaultProps: {
        radius: 'md',
        p: 'md',
        withBorder: true,
      },
    },
    AppShell: {
      styles: {
        main: {
          backgroundColor: 'var(--mantine-color-gray-0)',
        },
      },
    },
  },
});
