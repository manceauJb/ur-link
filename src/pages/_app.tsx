import { AuthUserProvider } from '@/contexts/AuthUserContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <AuthUserProvider>
    <Component {...pageProps} />
  </AuthUserProvider>
}
