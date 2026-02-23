export const metadata = {
  title: 'Privacy Policy – Victoriacross.ca',
  description: 'Privacy policy for Victoriacross.ca and The Chaplain\'s Diary project.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-heritage-stone">
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <h1 className="font-serif text-3xl md:text-4xl text-heritage-navy border-b border-heritage-gold/40 pb-3 mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-heritage max-w-none text-heritage-charcoal space-y-6">
          <p className="text-sm text-heritage-charcoal/80">Last updated: February 2025.</p>
          <p>
            Victoriacross.ca (&quot;we&quot;, &quot;the site&quot;) respects your privacy. This policy describes how we collect, use, and protect your information when you use this website.
          </p>
          <h2 className="font-serif text-xl text-heritage-navy mt-8">Information we collect</h2>
          <p>
            When you sign a petition, we collect your name, email address, and your consent to be counted. We do not publish or share individual voter names publicly. When you register for the forum, we collect your email and use it only for verification and account management.
          </p>
          <h2 className="font-serif text-xl text-heritage-navy mt-8">How we use it</h2>
          <p>
            Petition data is used to display aggregate signature counts and, where legally permitted, to support formal review requests. We do not sell or rent your data. Email addresses are used only for verification and, if you opt in, for project updates.
          </p>
          <h2 className="font-serif text-xl text-heritage-navy mt-8">Cookies and analytics</h2>
          <p>
            We may use minimal cookies for session and security purposes. We do not use third-party advertising or tracking beyond what is necessary to operate the site.
          </p>
          <h2 className="font-serif text-xl text-heritage-navy mt-8">Contact</h2>
          <p>
            For privacy-related questions, contact us at the email listed in the footer.
          </p>
        </div>
      </div>
    </div>
  );
}
