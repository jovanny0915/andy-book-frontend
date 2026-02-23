import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin – Victoriacross.ca',
  description: 'Site admin: approve posts and manage users.',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
