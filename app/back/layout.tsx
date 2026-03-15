import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel | Studio Design',
  robots: 'noindex, nofollow',
};

export default function BackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#111] text-white font-body">
      {children}
    </div>
  );
}
