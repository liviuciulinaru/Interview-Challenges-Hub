'use client';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
  /* Put your mantine theme override here */

  headings: {
    // properties for all headings
    fontWeight: '800',
    fontFamily: 'Syne',

    // properties for individual headings, all of them are optional
    sizes: {
      // h1: {
      //   fontWeight: '100',
      //   fontSize: rem(36),
      //   lineHeight: '1.4',
      // },
      // h2: { fontSize: rem(30), lineHeight: '1.5' },
      // // ...up to h6
      // h6: { fontWeight: '900' },
    },
  },
});
