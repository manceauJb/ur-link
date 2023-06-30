import React from 'react';
import { AuthUserProvider } from '@/contexts/AuthUserContext'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Rubik } from 'next/font/google';
import { theme } from '../../theme';

const rubik = Rubik({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style>
        {`
          :root {
            --font-rubik: ${rubik.style.fontFamily};
          }
        `}
      </style>
      <AuthUserProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthUserProvider>
    </>
  );
}
