import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Studio Design | Architectural Visualization',
  description: 'Award-winning architectural visualization studio. We craft immersive 3D renders that bring interior spaces to life with stunning realism.',
  keywords: ['interior design', 'architectural visualization', '3D rendering', 'portfolio'],
};

// Fetch typography settings from API at build/request time
async function getTypography() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/settings`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    const activeId = data.typography?.activeConcept || 'classic';
    return data.typography?.concepts?.find((c: any) => c.id === activeId) || null;
  } catch (e) {
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const typography = await getTypography();
  const defaultFontsUrl = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&family=Noto+Serif+TC:wght@300;500&family=Noto+Sans+TC:wght@300;400&display=swap";
  const googleFontsUrl = typography?.googleFonts 
    ? `https://fonts.googleapis.com/css2?${typography.googleFonts}&display=swap` 
    : defaultFontsUrl;

  return (
    <html lang="en">
      <head>
        <link href={googleFontsUrl} rel="stylesheet" />
        {typography && (
          <style dangerouslySetInnerHTML={{ __html: `
            :root {
              --font-display: ${typography.displayFont};
              --font-body: ${typography.bodyFont};
            }
          `}} />
        )}
      </head>
      <body className="noise-overlay">
        {children}
      </body>
    </html>
  );
}
