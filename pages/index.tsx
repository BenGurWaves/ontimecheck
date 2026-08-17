'use client';

import { useState } from 'react';
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
    <main className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-6">
          See which airline actually shows up on time.
        </h1>
        <p className="text-lg text-center text-gray-300 mb-8">
          Official DOT data, updated monthly, by airline or specific route
        </p>
        <SearchForm onSearch={handleSearch} />
        {searchResults && (
          <Results results={searchResults} type={searchType} />
        )}
        {!searchResults && (
          <>
            <TrustSection />
            <HowToRead />
            <PricingTeaser />
          </>
        )}
      </div>
    </main>
  );
}
