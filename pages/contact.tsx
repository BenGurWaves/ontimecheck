import Link from 'next/link';

export default function Contact() {
  return (
    <div className="magazine-grid mt-12 mb-16">
      <div className="full">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg text-muted mb-8">
          Have questions or feedback? Reach out to us via email.
        </p>
        <div className="motion-card text-center mt-8">
          <p className="text-sm text-muted mb-4">
            We read every message and aim to respond within 2 business days.
          </p>
          <a href="mailto:contact@calyvent.com?subject=OnTimeCheck%20Inquiry" className="btn-glow">
            <span>Send Email</span>
          </a>
        </div>
        <div className="mt-8">
          <a href="/" className="btn-glow"><span>← Back to Home</span></a>
        </div>
      </div>
    </div>
  );
}
