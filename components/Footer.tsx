import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold mb-4">OnTimeCheck</h3>
            <p className="text-sm text-gray-400">
              Official airline performance data from Bureau of Transportation Statistics
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-accent-green">Home</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-accent-green">Pricing</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent-green">About</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-accent-green">Contact Us</Link>
              </li>
              <li>
                <a href="mailto:support@calyvent.com" className="hover:text-accent-green">support@calyvent.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-500">
          <p>© 2024 OnTimeCheck. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
