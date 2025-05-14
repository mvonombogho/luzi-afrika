import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Luzi Afrika',
  description: 'Privacy policy and data protection information for Luzi Afrika Limited',
};

const PrivacyPolicy = () => {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            Luzi Afrika Limited ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-4">We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Contact information (name, email address, phone number)</li>
            <li>Company information</li>
            <li>Technical support requests and communication history</li>
            <li>Service preferences and requirements</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Communicate with you about our services</li>
            <li>Respond to your requests and inquiries</li>
            <li>Monitor and analyze trends and usage</li>
            <li>Protect against fraud and unauthorized access</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information Sharing and Disclosure</h2>
          <p className="mb-4">
            We do not sell or rent your personal information to third parties. We may share your information with:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Service providers who assist in our operations</li>
            <li>Professional advisors (lawyers, accountants, etc.)</li>
            <li>Law enforcement or regulatory authorities when required</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Withdraw consent</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy or our practices, please contact us at:
          </p>
          <p className="mb-4">
            Luzi Afrika Limited<br />
            Kiserian, Sankale Road<br />
            Kajiado, Kenya<br />
            Email: info@luziafrika.com<br />
            Phone: +254 701 868 849
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last revised" date and the updated version will be effective as soon as it is accessible.
          </p>
        </section>

        <p className="text-sm text-gray-600">
          Last revised: May 2025
        </p>
      </div>
    </main>
  );
};

export default PrivacyPolicy;