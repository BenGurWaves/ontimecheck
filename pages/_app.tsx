import type { AppProps } from 'next/app';
import Head from 'next/head';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import { Fraunces, Inter } from 'next/font/google';

const display = Fraunces({ subsets: ['latin'], weight: ['600','700'] });
const body = Inter({ subsets: ['latin'], weight: ['400','500'] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${display.className} ${body.className}`}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
    </div>
  );
}
