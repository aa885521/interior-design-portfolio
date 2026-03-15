import type { Metadata } from 'next';
import './globals.css';
import fs from 'fs';
import path from 'path';

function getTypography() {
  const DATA_PATH = path.join(process.cwd(), 'data', 'site-data.json');
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    const data = JSON.parse(raw);
    const activeId = data.siteSettings.typography?.activeConcept || 'classic';
    return data.siteSettings.typography?.concepts.find((c: any) => c.id === activeId) || data.siteSettings.typography?.concepts[0];
  } catch (e) {
    return null;
  }
}

export const metadata: Metadata = {
  title: 'Studio Design | Architectural Visualization',
  description: 'Award-winning architectural visualization studio. We craft immersive 3D renders that bring interior spaces to life with stunning realism.',
  keywords: ['interior design', 'architectural visualization', '3D rendering', 'portfolio'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const typography = getTypography();
  const googleFontsUrl = typography ? `https://fonts.googleapis.com/css2?${typography.googleFonts}&display=swap` : "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap";

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
