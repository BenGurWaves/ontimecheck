'use client';

import { useState } from 'react';
import Head from 'next/head';
import SearchForm from '@/components/SearchForm';
import Results from '@/components/Results';
import TrustSection from '@/components/TrustSection';
import HowToRead from '@/components/HowToRead';
import PricingTeaser from '@/components/PricingTeaser';

export default function Home() {
  const [searchResults, setSearchResults] = useState<any>(null);
  const [searchType, setSearchType] = useState<'airline' | 'route'>('airline');

  const handleSearch = (results: any, type: 'airline' | 'route') => {
    setSearchResults(results);
    setSearchType(type);
  };

  return (
    <>
    <Head>
      <title>OnTimeCheck — See which airline actually shows up on time</title>
      <meta name="description" content="Official DOT on-time performance by airline and route. Historical data, delay causes, cancellation rates, updated monthly." />
      <meta property="og:title" content="OnTimeCheck — Real on-time performance by airline and route" />
      <meta property="og:description" content="Lookup historical on-time performance from BTS official data." />
      <meta property="og:url" content="https://ontimecheck.calyvent.com/" />
    </Head>
    <main>
      <section className="hero">
        <div className="magazine-grid">
          <div>
            <h1>See which airline actually shows up on time.</h1>
            <p className="mt-4">Official DOT data, updated monthly. Compare airlines or a specific route without the marketing.</p>
          </div>
        </div>
      </section>
      <section className="magazine-grid">
        <div className="card">
          <SearchForm onSearch={handleSearch} />
        </div>
      </section>
      {searchResults && (
        <section className="magazine-grid">
          <Results results={searchResults} type={searchType} />
        </section>
      )}
      {!searchResults && (
        <>
          <section className="magazine-grid"><TrustSection /></section>
          <section className="magazine-grid"><HowToRead /></section>
          <section className="magazine-grid"><PricingTeaser /></section>
        </>
      )}
    </main>
    </>
  );
}
