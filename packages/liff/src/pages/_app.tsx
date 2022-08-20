import '../styles/globals.css'
import '../styles/reset.css'

import type { AppProps } from 'next/app'

import { AuthProvider } from '~/contexts/AuthContext'
import { Authenticated } from '~/hoc/Authenticated'
import { useScrollTop } from '~/hooks/useScrollTop'
import { DefaultLayout } from '~/layouts/Default'

export default function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  useScrollTop()

  return (
    <AuthProvider>
      <Authenticated />

      <DefaultLayout>
        <Component {...pageProps} key={router.asPath} />
      </DefaultLayout>
    </AuthProvider>
  )
}
