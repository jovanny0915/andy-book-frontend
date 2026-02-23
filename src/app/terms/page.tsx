export const metadata = {
  title: 'Terms – Victoriacross.ca',
  description: 'Terms of use for Victoriacross.ca and The Chaplain\'s Diary project.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-heritage-stone">
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <h1 className="font-serif text-3xl md:text-4xl text-heritage-navy border-b border-heritage-gold/40 pb-3 mb-8">
          Terms of Use
        </h1>
        <div className="prose prose-heritage max-w-none text-heritage-charcoal space-y-6">
          <p className="text-sm text-heritage-charcoal/80">Last updated: February 2025.</p>
          <p>
            By using Victoriacross.ca, you agree to use the site for lawful, respectful purposes only. The content is provided for historical and educational interest and to support petitions for the review of certain Victoria Cross cases.
          </p>
          <h2 className="font-serif text-xl text-heritage-navy mt-8">Conduct</h2>
          <p>
            Forum and community features require respectful dialogue. We reserve the right to remove content or accounts that are abusive, off-topic, or otherwise contrary to the project&apos;s values. We are non-political and fact-focused.
          </p>
          <h2 className="font-serif text-xl text-heritage-navy mt-8">Accuracy</h2>
          <p>
            We strive for accuracy in historical content but do not guarantee that all material is complete or error-free. Sources are cited where possible. For formal research, please consult primary sources and experts.
          </p>
          <h2 className="font-serif text-xl text-heritage-navy mt-8">Donations</h2>
          <p>
            Optional donations are processed via third-party payment providers (e.g. Stripe). Refunds are subject to their and our policies. Donations do not entitle you to influence project content or decisions.
          </p>
          <h2 className="font-serif text-xl text-heritage-navy mt-8">Contact</h2>
          <p>
            For questions about these terms, use the contact email in the footer.
          </p>
        </div>
      </div>
    </div>
  );
}
