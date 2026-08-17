import type { AppProps } from 'next/app';
import Head from 'next/head';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Organization Schema */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "OnTimeCheck",
          "url": "https://ontimecheck.calyvent.com",
          "logo": "https://ontimecheck.calyvent.com/favicon.ico",
          "description": "Lookup tool showing historical on-time performance, delay causes, and cancellation rates by airline and specific route, sourced from BTS official data.",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-800-555-0199",
            "contactType": "Customer Service",
            "email": "contact@calyvent.com"
          }
        })}</script>
      </Head>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
