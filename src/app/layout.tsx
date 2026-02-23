import type { Metadata } from 'next';
import './globals.css';
import { NavHeader } from '@/components/NavHeader';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'The Chaplain\'s Diary – Victoriacross.ca',
  description: 'A historical investigation into courage, command, and Canada\'s unawarded Victoria Cross. Sign the petitions for Waterman and Hickey.',
  openGraph: {
    title: 'The Chaplain\'s Diary – Victoriacross.ca',
    description: 'A historical investigation into courage, command, and Canada\'s unawarded Victoria Cross.',
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
