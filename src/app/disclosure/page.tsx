import { ShareWidget } from '@/components/home/ShareWidget';
import { BuyMeACoffeeWidget } from '@/components/home/BuyMeACoffeeWidget';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Disclosure - Victoriacross.ca',
  description: "Website Terms, Disclaimer, and Disclosure for Victoriacross.ca and The Chaplain's Diary.",
};

type DisclosureSection = {
  title: string;
  content: ReactNode;
};

const sections: DisclosureSection[] = [
  {
    title: 'General Information Only',
    content: (
      <>
        <p>
          The content on this website, including but not limited to articles, commentary, historical analysis,
          research findings, petitions, and discussions, is provided for general informational and educational purposes
          only.
        </p>
        <p>
          Nothing on this site constitutes legal advice, historical certification, military adjudication, financial
          advice, or professional services of any kind.
        </p>
        <p>Visitors rely on the information at their own discretion and risk.</p>
      </>
    ),
  },
  {
    title: 'Historical Interpretation and Research',
    content: (
      <>
        <p>
          This website and the book The Chaplain&apos;s Diary present historical research, interpretation, analysis, and
          opinion.
        </p>
        <p>Certain conclusions are based on:</p>
        <ul>
          <li>Available archival records</li>
          <li>War diaries</li>
          <li>Published secondary sources</li>
          <li>Publicly accessible military documentation</li>
          <li>Personal interpretation of historical events</li>
        </ul>
        <p>Historical records may be incomplete, conflicting, or subject to reinterpretation.</p>
        <p>
          The opinions expressed are those of the author and contributors. They do not represent official positions
          of:
        </p>
        <ul>
          <li>The Government of Canada</li>
          <li>The Canadian Armed Forces</li>
          <li>Veterans Affairs Canada</li>
          <li>The Department of National Defence</li>
          <li>Any serving or retired military personnel</li>
          <li>Any family members of individuals discussed</li>
        </ul>
        <p>
          Where events are reconstructed, interpretive narrative techniques may be used. These sections are based on
          research but may include inferred dialogue or context for readability.
        </p>
      </>
    ),
  },
  {
    title: 'No Official Authority',
    content: (
      <>
        <p>This website is not affiliated with, endorsed by, or authorized by:</p>
        <ul>
          <li>The Government of Canada</li>
          <li>The Crown</li>
          <li>The Canadian Armed Forces</li>
          <li>Any veterans organization</li>
          <li>The Victoria Cross Secretariat</li>
        </ul>
        <p>
          The Canadian Victoria Cross remains a matter of official government authority. This website does not grant,
          imply, or determine eligibility for any medal or decoration.
        </p>
      </>
    ),
  },
  {
    title: 'Petition and Advocacy Disclaimer',
    content: (
      <>
        <p>Any petitions hosted on this site are expressions of public opinion.</p>
        <p>They do not:</p>
        <ul>
          <li>Compel government action</li>
          <li>Guarantee review</li>
          <li>Create legal obligation</li>
          <li>Establish entitlement</li>
        </ul>
        <p>Petitions are advocacy tools only.</p>
      </>
    ),
  },
  {
    title: 'Accuracy and Errors',
    content: (
      <>
        <p>While every effort has been made to ensure accuracy, errors or omissions may occur.</p>
        <p>Military records may contain discrepancies in:</p>
        <ul>
          <li>Dates</li>
          <li>Ranks</li>
          <li>Ages</li>
          <li>Unit designations</li>
          <li>Award citations</li>
        </ul>
        <p>
          Users who identify factual errors are encouraged to contact the site administrator with supporting
          documentation.
        </p>
      </>
    ),
  },
  {
    title: 'Defamation and Reputation',
    content: (
      <>
        <p>All individuals discussed are addressed in good faith based on available historical sources.</p>
        <p>No statements are intended to defame, misrepresent, or harm the reputation of:</p>
        <ul>
          <li>Living individuals</li>
          <li>Deceased service members</li>
          <li>Families</li>
          <li>Commanders</li>
          <li>Institutions</li>
        </ul>
        <p>If any party believes material is inaccurate or unfair, they may request review and correction.</p>
      </>
    ),
  },
  {
    title: 'User Conduct',
    content: (
      <>
        <p>By using this website, you agree:</p>
        <ul>
          <li>Not to post defamatory content</li>
          <li>Not to harass families or veterans</li>
          <li>Not to submit false information</li>
          <li>Not to impersonate others</li>
          <li>Not to disrupt discussions</li>
        </ul>
        <p>
          The site administrator reserves the right to remove comments, restrict access, or delete content that
          violates these principles.
        </p>
      </>
    ),
  },
  {
    title: 'Intellectual Property',
    content: (
      <>
        <p>All original text, design, research compilation, and media on this site are protected by copyright.</p>
        <p>
          No material may be copied, reproduced, or distributed without written permission, except as permitted by
          fair dealing or fair use law.
        </p>
        <p>Official military documents remain the property of their respective archives or governments.</p>
      </>
    ),
  },
  {
    title: 'Purchases and Donations',
    content: (
      <>
        <p>If the site includes book sales or voluntary &quot;Buy Me a Coffee&quot; contributions:</p>
        <ul>
          <li>All payments are processed through third-party providers such as Stripe</li>
          <li>The site owner does not store full credit card information</li>
          <li>Payments are voluntary and non-refundable unless otherwise stated</li>
        </ul>
        <p>No donation guarantees political or governmental action.</p>
      </>
    ),
  },
  {
    title: 'No Warranties',
    content: (
      <>
        <p>This website is provided as is.</p>
        <p>The owner makes no warranties regarding:</p>
        <ul>
          <li>Completeness</li>
          <li>Accuracy</li>
          <li>Availability</li>
          <li>Suitability for any purpose</li>
        </ul>
        <p>Use of the site is at the visitor&apos;s own risk.</p>
      </>
    ),
  },
  {
    title: 'Limitation of Liability',
    content: (
      <>
        <p>The site owner shall not be liable for:</p>
        <ul>
          <li>Decisions made based on website content</li>
          <li>Petition outcomes</li>
          <li>Historical disagreements</li>
          <li>Government decisions</li>
          <li>Financial transactions processed by third parties</li>
          <li>Technical interruptions</li>
        </ul>
      </>
    ),
  },
  {
    title: 'External Links',
    content: (
      <>
        <p>Links to external websites are provided for convenience only.</p>
        <p>The site owner is not responsible for external content, accuracy, or privacy practices.</p>
      </>
    ),
  },
  {
    title: 'Emotional Content Advisory',
    content: (
      <>
        <p>This website discusses wartime events including death, combat, and trauma.</p>
        <p>Some readers may find certain material emotionally difficult.</p>
      </>
    ),
  },
  {
    title: 'Changes to This Disclosure',
    content: (
      <>
        <p>This disclosure may be updated at any time without notice.</p>
        <p>Continued use of the website constitutes acceptance of the current version.</p>
      </>
    ),
  },
];

export default function DisclosurePage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-heritage-stone via-heritage-parchment/70 to-heritage-stone">
      <div className="absolute inset-0 bg-parchment-texture opacity-25 pointer-events-none" aria-hidden />
      <div
        className="absolute -top-20 right-0 w-[min(72vw,620px)] h-[50vh] bg-gradient-to-bl from-heritage-navy/12 via-heritage-gold/10 to-transparent blur-2xl pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-5xl mx-auto px-4 py-10 md:py-14">
        <section className="rounded-3xl border border-heritage-gold/35 bg-white/80 backdrop-blur-sm shadow-xl shadow-heritage-navy/10 p-6 md:p-8">
          <p className="inline-flex items-center rounded-full border border-heritage-gold/40 bg-heritage-gold/10 px-3 py-1 text-xs font-semibold tracking-wide text-heritage-navy uppercase">
            Legal Notice
          </p>
          <h1 className="mt-4 font-serif text-3xl md:text-5xl leading-tight text-heritage-navy">
            Website Terms, Disclaimer, and Disclosure
          </h1>
          <p className="mt-4 text-base md:text-lg text-heritage-charcoal/90 max-w-3xl leading-relaxed">
            This page explains the legal terms for using Victoriacross.ca, including petition participation, historical
            interpretation, and limits of liability.
          </p>
          <div className="mt-6 inline-flex items-center rounded-xl border border-heritage-gold/40 bg-white/70 px-4 py-2">
            <p className="text-sm font-medium text-heritage-charcoal">Effective Date: [Insert Date]</p>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-heritage-gold/25 bg-white/75 p-4">
            <p className="text-xs uppercase tracking-wide text-heritage-charcoal/70">Purpose</p>
            <p className="mt-1 text-sm text-heritage-charcoal">Informational and educational website terms.</p>
          </div>
          <div className="rounded-2xl border border-heritage-gold/25 bg-white/75 p-4">
            <p className="text-xs uppercase tracking-wide text-heritage-charcoal/70">Applies To</p>
            <p className="mt-1 text-sm text-heritage-charcoal">All visitors, readers, forum users, and petition signers.</p>
          </div>
          <div className="rounded-2xl border border-heritage-gold/25 bg-white/75 p-4">
            <p className="text-xs uppercase tracking-wide text-heritage-charcoal/70">Core Principle</p>
            <p className="mt-1 text-sm text-heritage-charcoal">Use of this website means acceptance of current terms.</p>
          </div>
        </section>

        <div className="mt-8 grid grid-cols-1 gap-5">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-heritage-gold/25 bg-white/85 backdrop-blur-sm shadow-md shadow-heritage-navy/5 px-5 py-5 md:px-6 md:py-6"
            >
              <h2 className="font-serif text-xl md:text-2xl text-heritage-navy">{section.title}</h2>
              <div className="mt-3 prose prose-heritage max-w-none text-heritage-charcoal prose-p:leading-relaxed prose-li:my-0.5">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
      <BuyMeACoffeeWidget floating />
      <ShareWidget floating />
    </div>
  );
}
