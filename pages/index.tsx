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
    <div className="split">
      <nav>
        <div className="brand">ONTIME</div>
        <div className="tag">Bureau of Transportation Statistics</div>
        <div style={{marginTop:'auto', fontSize:'12px', color:'var(--muted)'}}>Data lag ~3 months</div>
      </nav>
      <div className="main">
    <section className="hero-aw">
      <h1>See which airline actually shows up on time.</h1>
      <div className="sub">Official DOT • Updated monthly</div>
    </section>
    <div className="grid-aw">
      <div className="big motion-card">
        <SearchForm onSearch={handleSearch} />
      </div>
      <div className="small motion-card">
        <TrustSection />
      </div>
      <div className="big motion-card">
        <HowToRead />
      </div>
      <div className="small motion-card">
        <PricingTeaser />
      </div>
    </div>
    {searchResults && (
      <div className="grid-aw mt-8">
        <div className="big reveal">
          <Results results={searchResults} type={searchType} />
        </div>
      </div>
    )}
      </div>
    </div>
    </>
  );
}
