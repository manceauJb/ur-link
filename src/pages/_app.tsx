import { ReactElement } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Rubik } from 'next/font/google';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../../theme';
import { AuthUserProvider } from '@/contexts/AuthUserContext';

const rubik = Rubik({ subsets: ['latin'] });

export type NextPageWithLayoutGuard<P = object, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactElement;
    getGuard?: (page: ReactElement) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayoutGuard;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
    const getGuard = Component.getGuard ?? ((page) => page);

    return (
        <>
            <style jsx global>
                {`
                    :root {
                        --font-rubik: ${rubik.style.fontFamily};
                    }
                `}
            </style>
            <AuthUserProvider>
                <ChakraProvider theme={theme}>
                    {getLayout(getGuard(<Component {...pageProps} />))}
                </ChakraProvider>
            </AuthUserProvider>
        </>
    );
}
