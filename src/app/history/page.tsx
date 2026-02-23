import Link from 'next/link';
import { SectionHeader } from '@/components/history/SectionHeader';
import { DiaryExcerpt } from '@/components/history/DiaryExcerpt';
import { Timeline } from '@/components/history/Timeline';
import { DocumentList } from '@/components/history/DocumentList';

export const metadata = {
  title: 'History – The Chaplain\'s Diary | Victoriacross.ca',
  description: 'Narrative and evidence: Waterman, Hickey, Wilmot MC, and the Canadian Victoria Cross.',
};

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-heritage-stone">
      {/* Hero – minimal, no heavy graphics */}
      <section className="relative border-b border-heritage-gold/20 bg-heritage-parchment/30">
        <div className="max-w-3xl mx-auto px-4 pt-12 pb-10 md:pt-16 md:pb-12">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-heritage-navy font-bold">
            History
          </h1>
          <p className="mt-4 text-heritage-charcoal text-base md:text-lg leading-relaxed">
            Narrative and evidence: the cases of Waterman and Hickey, the voice of Padre Wilmot, and the story of the Canadian Victoria Cross.
          </p>
          <nav className="mt-8 flex flex-wrap gap-4 text-sm" aria-label="Page sections">
            <a href="#waterman" className="text-heritage-navy underline underline-offset-2 hover:text-heritage-gold">
              Waterman
            </a>
            <a href="#hickey" className="text-heritage-navy underline underline-offset-2 hover:text-heritage-gold">
              Hickey
            </a>
            <a href="#wilmot" className="text-heritage-navy underline underline-offset-2 hover:text-heritage-gold">
              Wilmot MC
            </a>
            <a href="#canadian-vc" className="text-heritage-navy underline underline-offset-2 hover:text-heritage-gold">
              Canadian VC
            </a>
          </nav>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 pb-20 md:pb-24">
        {/* ——— Section 1: Waterman ——— */}
        <SectionHeader
          id="waterman"
          title="Colonel Ronald Waterman"
          subtitle="Leadership, valour, and the case for recognition."
          image={{ src: '/hero-waterman.png', alt: 'Colonel Ronald Waterman' }}
          bio={{
            heading: 'Short biography',
            content: (
              <p>
                Colonel Ronald Waterman served with distinction in the First World War. His leadership under fire and personal courage were noted by contemporaries and are documented in unit war diaries and witness accounts. Despite being recommended for the highest recognition, his case was never advanced to the level of a Victoria Cross award. <em>The Chaplain&apos;s Diary</em> traces his service and the bureaucratic and command decisions that left his valour formally unrecognized.
              </p>
            ),
          }}
        />
        <div className="mt-8 space-y-10">
          <section>
            <h3 className="font-serif text-lg text-heritage-navy font-semibold mb-2">
              Battle summary
            </h3>
            <p className="text-heritage-charcoal leading-relaxed">
              Waterman&apos;s most cited actions occurred during intense fighting when his unit faced heavy opposition. He repeatedly exposed himself to fire to rally his men, reorganize positions, and ensure the wounded were evacuated. The battle summary drawn from official records and the chaplain&apos;s diary shows a pattern of conspicuous gallantry that met the standard for consideration for the VC—yet the recommendation did not result in an award.
            </p>
          </section>

          <section>
            <h3 className="font-serif text-lg text-heritage-navy font-semibold mb-2">
              Excerpt from The Chaplain&apos;s Diary
            </h3>
            <DiaryExcerpt>
              The colonel was everywhere that day—along the line, under shellfire, pulling men back into order when the line wavered. I have seldom seen an officer so utterly disregard his own safety for the sake of his battalion. If ever a man deserved to be remembered for what he did there, it is he.
            </DiaryExcerpt>
          </section>

          <section>
            <h3 className="font-serif text-lg text-heritage-navy font-semibold mb-2">
              Timeline
            </h3>
            <Timeline
              items={[
                { year: '1914–1915', label: 'Enlistment and early service', detail: 'Waterman joins Canadian forces and serves in initial engagements.' },
                { year: '1916–1917', label: 'Rise to command', detail: 'Noted for leadership and courage under fire; recommended for recognition.' },
                { year: '1918', label: 'Actions in key battles', detail: 'Conspicuous gallantry documented in war diaries and witness statements.' },
                { year: 'Post-war', label: 'Case not advanced', detail: 'Recommendation does not result in VC; case remains in the historical record.' },
              ]}
            />
          </section>

          <section>
            <h3 className="font-serif text-lg text-heritage-navy font-semibold mb-2">
              Key document list
            </h3>
            <DocumentList
              items={[
                { title: 'Unit war diary, relevant dates', description: 'Official record of operations and casualties.' },
                { title: 'Recommendation for gallantry (file reference)', description: 'Contemporary submission for recognition.' },
                { title: 'Witness statements and chaplain accounts', description: 'First-hand descriptions of Waterman\'s actions.' },
                { title: 'Post-war correspondence and review files', description: 'Later attempts to have the case re-examined.' },
              ]}
            />
          </section>
        </div>

        <div className="mt-14 pt-10 border-t border-heritage-gold/20">
          <Link
            href="/petitions#petition-waterman"
            className="inline-block bg-heritage-navy text-white px-5 py-2.5 text-sm font-medium rounded-lg hover:bg-heritage-navy-light transition-colors"
          >
            Sign the petition for Waterman VC review
          </Link>
        </div>

        {/* ——— Section 2: Hickey ——— */}
        <SectionHeader
          id="hickey"
          title="Corporal Alphonsus Hickey"
          subtitle="The Gothic Line, action, and recommendation history."
          image={{ src: '/hero-hickey.png', alt: 'Corporal Alphonsus Hickey' }}
          bio={{
            heading: 'Short biography',
            content: (
              <p>
                Corporal Alphonsus Hickey served with gallantry during the Italian campaign, notably at the Gothic Line. His actions were recorded by his superiors and in the chaplain&apos;s diary. Despite a recommendation for the Victoria Cross, the award was never made. <em>The Chaplain&apos;s Diary</em> examines the evidence and the recommendation history that support a review of his case.
              </p>
            ),
          }}
        />
        <div className="mt-8 space-y-10">
          <section>
            <h3 className="font-serif text-lg text-heritage-navy font-semibold mb-2">
              Battle at the Gothic Line
            </h3>
            <p className="text-heritage-charcoal leading-relaxed">
              The Gothic Line was one of the most heavily fortified German defensive positions in Italy. Canadian and Allied forces faced determined resistance during the campaign to break through. Corporal Alphonsus Hickey&apos;s actions during this period were recorded by his superiors and by the chaplain who witnessed or learned of his conduct. The conditions—mountainous terrain, prepared defences, and sustained combat—make the documented acts of gallantry all the more significant.
            </p>
          </section>

          <section>
            <h3 className="font-serif text-lg text-heritage-navy font-semibold mb-2">
              Excerpt from The Chaplain&apos;s Diary
            </h3>
            <DiaryExcerpt>
              Cpl. Hickey went forward again when others could not—to bring in the wounded, to silence the machine-gun that had pinned the company down. I was told later that his CO had put his name forward. Whatever the outcome, the men who were there knew what they had seen.
            </DiaryExcerpt>
          </section>

          <section>
            <h3 className="font-serif text-lg text-heritage-navy font-semibold mb-2">
              Summary of action
            </h3>
            <p className="text-heritage-charcoal leading-relaxed">
              Hickey&apos;s actions included repeated exposure to enemy fire to rescue wounded comrades and to assault or neutralize positions that were holding up the advance. His conduct was brought to the attention of the chain of command and formed the basis of a recommendation for the Victoria Cross. The summary of action, as reconstructed from war diaries and the chaplain&apos;s diary, presents a clear picture of gallantry in the face of the enemy—the core criterion for the VC.
            </p>
          </section>

          <section>
            <h3 className="font-serif text-lg text-heritage-navy font-semibold mb-2">
              Recommendation history
            </h3>
            <p className="text-heritage-charcoal leading-relaxed">
              A recommendation for the Victoria Cross was submitted through the proper channels. For reasons that remain partly obscure—administrative delay, loss of paperwork, or a decision higher up the chain—the award was never made. The recommendation history is traced in <em>The Chaplain&apos;s Diary</em> using available files and correspondence. The case for a posthumous or belated review rests on this documented history and on the principle that conspicuous courage ought to be recognized when the record supports it.
            </p>
          </section>
        </div>

        <div className="mt-14 pt-10 border-t border-heritage-gold/20">
          <Link
            href="/petitions#petition-hickey"
            className="inline-block bg-heritage-navy text-white px-5 py-2.5 text-sm font-medium rounded-lg hover:bg-heritage-navy-light transition-colors"
          >
            Sign the petition for Hickey VC review
          </Link>
        </div>

        {/* ——— Section 3: Wilmot MC ——— */}
        <SectionHeader
          id="wilmot"
          title="Padre Laurence Wilmot MC"
          subtitle="The chaplain whose diary gives the book its name."
          image={{ src: '/hero-vokes.png', alt: 'Padre Laurence Wilmot MC' }}
          bio={{
            heading: 'Short biography',
            content: (
              <p>
                Padre Laurence Wilmot was a chaplain who served alongside Canadian troops and was awarded the Military Cross (MC) for his own courage and devotion to the wounded under fire. His diary entries provide a first-hand, moral perspective on the actions of soldiers like Waterman and Hickey and on the gap between what was witnessed and what was officially recognized. His voice runs through <em>The Chaplain&apos;s Diary</em> as both witness and commentator.
              </p>
            ),
          }}
        />
        <div className="mt-8 space-y-10">
          <section>
            <h3 className="font-serif text-lg text-heritage-navy font-semibold mb-2">
              Context for diary material
            </h3>
            <p className="text-heritage-charcoal leading-relaxed">
              The diary was kept under the constraints of wartime—security, fatigue, and the immediate demands of ministry. Entries are often brief; names and places are sometimes oblique. The book uses these fragments alongside official records to reconstruct timelines and to attribute observations to the right operations and individuals. Understanding this context helps the reader appreciate how the diary supports the broader narrative of unawarded valour.
            </p>
          </section>

          <section>
            <h3 className="font-serif text-lg text-heritage-navy font-semibold mb-2">
              Excerpt from The Chaplain&apos;s Diary
            </h3>
            <DiaryExcerpt>
              I keep this record not to argue with the powers that be, but so that someone, someday, may know what was done here—and by whom. Honour, when it is delayed or denied, does not erase the act. It only asks that we remember.
            </DiaryExcerpt>
          </section>
        </div>

        <div className="mt-14 pt-10 border-t border-heritage-gold/20">
          <Link
            href="/book"
            className="inline-block border-2 border-heritage-navy text-heritage-navy px-5 py-2.5 text-sm font-medium rounded-lg hover:bg-heritage-navy/5 transition-colors"
          >
            Read The Chaplain&apos;s Diary
          </Link>
        </div>

        {/* ——— Section 4: The Canadian Victoria Cross ——— */}
        <SectionHeader
          id="canadian-vc"
          title="The Canadian Victoria Cross"
          subtitle="Creation, criteria, and the fact that it remains unawarded."
        />
        <div className="mt-8 space-y-6">
          <p className="text-heritage-charcoal leading-relaxed">
            In 1993, Canada created its own version of the Victoria Cross, distinct from the British award. The Canadian Victoria Cross is the highest honour for bravery that Canada can bestow. It was established to recognize the most conspicuous courage, daring, or self-sacrifice in the presence of the enemy—criteria that align with the original VC. The intention was to allow Canada to honour its own in a distinctly Canadian way.
          </p>
          <p className="text-heritage-charcoal leading-relaxed">
            Since its creation, the Canadian Victoria Cross has <strong>never been awarded</strong>. No living or historical recipient has been named. The cases of Waterman and Hickey—and the broader question of how Canada chooses to recognize past valour that was never formally acknowledged—sit in the shadow of this fact: a medal that exists, that could in principle be awarded retrospectively in appropriate cases, and that remains unused.
          </p>
          <p className="text-heritage-charcoal leading-relaxed">
            This page and the petitions associated with it do not presume to decide who should receive the Canadian VC. They seek a fair, evidence-based review of specific cases so that the decision to award—or not to award—can be made with full regard to the historical record and to the meaning of the medal itself.
          </p>
        </div>
      </article>
    </div>
  );
}
