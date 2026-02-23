import Link from 'next/link';
import { SectionHeader } from '@/components/history/SectionHeader';
import { Timeline } from '@/components/history/Timeline';
import { ShareWidget } from '@/components/home/ShareWidget';
import { BuyMeACoffeeWidget } from '@/components/home/BuyMeACoffeeWidget';

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
            heading: 'Biography',
            content: (
              <>
                <p>
                  Ronald Waterman began his service long before the first shot was fired in Italy. A professional soldier who rose from the ranks, he led men through Sicily, Ortona, and into the grinding advance toward the Gothic Line. He was not ornamental. He was direct, demanding, and present where the fighting was worst.
                </p>
                <p className="mt-4">
                  At the Foglia River in September 1944, Waterman rallied exhausted troops under intense machine gun and mortar fire. With communications broken and positions collapsing, he moved forward repeatedly under fire to reorganize his companies, drag wounded men to cover, and restore order where retreat seemed imminent. His leadership prevented a total collapse of the line.
                </p>
                <p className="mt-4">
                  A recommendation was written for the highest award for gallantry. It did not proceed. Instead, the record settled for lesser recognition. Waterman would later be relieved for exhaustion. Official language called it necessary. Those who served under him called it the cost of carrying too much for too long.
                </p>
              </>
            ),
          }}
        />
        <div className="mt-8 space-y-10">
          <section>
            <h3 className="font-serif text-lg text-heritage-navy font-semibold mb-2">
              Timeline
            </h3>
            <Timeline
              items={[
                { year: '1943', label: 'Sicily', detail: 'Waterman leads his men through the campaign.' },
                { year: '1943–1944', label: 'Ortona', detail: 'Intense fighting; leadership under fire noted.' },
                { year: '1944', label: 'Advance toward the Gothic Line', detail: 'Grinding advance through Italian theatre.' },
                { year: 'September 1944', label: 'Foglia River', detail: 'Rallied troops under fire; recommendation for highest gallantry written.' },
                { year: 'Afterward', label: 'Recognition and relief', detail: 'Lesser recognition only; later relieved for exhaustion.' },
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
            heading: 'Biography',
            content: (
              <>
                <p>
                  Corporal Alphonsus Hickey was a steelworker from Cape Breton who served with the Princess Patricia&apos;s Canadian Light Infantry. He was not an officer. He was not decorated with high rank. His act of courage was simple and absolute.
                </p>
                <p className="mt-4">
                  During a withdrawal under heavy enemy fire near the Gothic Line, Hickey volunteered to remain behind with his Bren gun to cover his battalion&apos;s retreat. From a low stone wall, he fired in deliberate bursts, holding back advancing forces while wounded men crawled to safety. By dawn, his ammunition was spent. He had held the line alone.
                </p>
                <p className="mt-4">
                  His action saved lives. It was recorded briefly. He received a Mention in Despatches. No higher award followed.
                </p>
              </>
            ),
          }}
        />

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
          title="Padre Laurence Wilmot, MC"
          subtitle="The chaplain whose diary gives the book its name."
          image={{ src: '/hero-vokes.png', alt: 'Padre Laurence Wilmot, MC' }}
          bio={{
            heading: 'Biography',
            content: (
              <>
                <p>
                  Padre Laurence Wilmot served as a chaplain with Canadian forces in Italy. He did not carry a rifle. He carried stretchers, prayers, and the burden of the dying.
                </p>
                <p className="mt-4">
                  At Ortona and later at the Foglia River, Wilmot moved through shellfire to recover wounded men from exposed ground. For his actions under fire, he was awarded the Military Cross. He rarely spoke of it.
                </p>
                <p className="mt-4">
                  His private diaries record the moral strain of command decisions, the exhaustion of officers, and the courage of ordinary soldiers. Through his words, the battlefield is seen not only in tactics and objectives, but in conscience and consequence. His account forms the moral spine of <em>The Chaplain&apos;s Diary</em>.
                </p>
              </>
            ),
          }}
        />

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
            In 1993, Canada created its own Victoria Cross as part of the Canadian honours system. The design mirrors the original British decoration, but carries the inscription <em>Pro Valore</em>. The standard remains unchanged. It is awarded for the most conspicuous bravery, or some daring or pre-eminent act of valour in the presence of the enemy.
          </p>
          <p className="text-heritage-charcoal leading-relaxed">
            Since its creation, the Canadian Victoria Cross has never been awarded.
          </p>
          <p className="text-heritage-charcoal leading-relaxed">
            Other Commonwealth nations, including Australia and New Zealand, have awarded their modern versions. Britain has reviewed and, in some cases, reassessed earlier conflicts. Canada&apos;s Cross remains uninscribed.
          </p>
          <p className="text-heritage-charcoal leading-relaxed">
            <em>The Chaplain&apos;s Diary</em> does not argue that standards should be lowered. It asks whether certain acts, recorded in diaries and operational reports, were seen clearly at the time. It invites readers to examine the historical record and decide whether silence was caution, policy, or something more enduring.
          </p>
        </div>
      </article>
      <BuyMeACoffeeWidget floating />
      <ShareWidget floating />
    </div>
  );
}
