import type { Metadata } from 'next';
import './globals.css';
import { NavHeader } from '@/components/NavHeader';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Victoriacross.ca – Remembering Waterman, Hickey & Vokes',
  description: 'Historical context and petitions for the review of Victoria Cross cases. Support the project and join the discussion.',
  openGraph: {
    title: 'Victoriacross.ca – Remembering Waterman, Hickey & Vokes',
    description: 'Historical context and petitions for the review of Victoria Cross cases.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <NavHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
