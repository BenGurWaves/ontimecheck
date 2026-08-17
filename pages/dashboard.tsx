import Head from 'next/head';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard — OnTimeCheck</title>
        <meta name="description" content="My watched routes and airlines with alerts on new BTS data." />
      </Head>
      <main className="magazine-grid">
        <div>
          <h1>My Watched Routes / Airlines</h1>
          <p className="mt-4">Saved searches and alerts when monthly BTS data updates.</p>
          <div className="card mt-8">
            <p>Sign in to enable watchlist. Email/password only, no confirmation required.</p>
          </div>
        </div>
      </main>
    </>
  );
}
