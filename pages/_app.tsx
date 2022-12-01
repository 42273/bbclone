import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../component/layout'
import { Provider } from '../context/context'
import { SessionProvider } from "next-auth/react"
import { NextPage } from 'next'
import HostLayout from '../component/hostLayout'
import { useEffect } from "react";
import RoomLayout from '../component/roomLayout'
import BookLayout from '../component/bookLayout'

export default function App({ Component, pageProps }: AppProps) {
  const { layout } = Component as NextPage & { layout?: string };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader');
      if (loader)
        loader.style.display = 'none';
    }
  }, []);

  return <>

    <SessionProvider session={pageProps.session}>
      <Provider>
        {
          !layout &&
          <Layout>
            <Component {...pageProps} />
          </Layout>
        }
        
        {layout === "noLine" && <Component {...pageProps} />}

        {layout === "host" &&
          <HostLayout>
            <Component {...pageProps} />
          </HostLayout>}

        {
          layout === 'rooms' && <RoomLayout>
            <Component {...pageProps} />
          </RoomLayout>
        }

        {
          layout === 'books' && <BookLayout>
            <Component {...pageProps} />
          </BookLayout>
        }
      </Provider>
    </SessionProvider>
  </>
}
