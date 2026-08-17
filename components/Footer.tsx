import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <span className="text-sm">OnTimeCheck</span>
          <div className="flex space-x-4 text-sm">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="/pricing" className="hover:text-white">
              Pricing
            </Link>
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
        <div className="text-xs text-gray-500 border-t border-gray-800 pt-4">
          <p>
            Disclaimer: Historical performance does not guarantee future results for any individual flight. Data has an approximate 3-month reporting lag and covers major carriers only. Always check real-time flight status directly with your airline before travel.
          </p>
          <p>
            <a href="mailto:contact@calyvent.com?subject=OnTimeCheck%20Inquiry" className="text-accent-green hover:underline">
              contact@calyvent.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
