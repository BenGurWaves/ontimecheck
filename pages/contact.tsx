import Link from 'next/link';

export default function Contact() {
  return (
    <main className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">
          Contact Us
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Have questions or feedback? Reach out to us via email.
        </p>
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-300 mb-4">
            We read every message and aim to respond within 2 business days.
          </p>
          <a href="mailto:contact@calyvent.com?subject=OnTimeCheck%20Inquiry" className="inline-block px-6 py-3 rounded-lg bg-accent-green text-background font-medium text-sm hover:bg-accent-green-light transition-colors">
            Send Email
          </a>
        </div>
        <div className="mt-8">
          <Link href="/" className="text-accent-green hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
