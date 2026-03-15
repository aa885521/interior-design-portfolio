import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

const SETTINGS_DOC = 'siteData/settings';

export async function GET() {
  try {
    const snap = await getDoc(doc(db, 'siteData', 'settings'));
    if (snap.exists()) {
      return NextResponse.json(snap.data());
    }
    // Return defaults if no data in Firestore yet
    return NextResponse.json({
      siteName: 'Studio Design',
      siteTagline: 'Architectural Visualization',
      heroTitle: 'Shaping\nReality\nThrough Light',
      heroSubtitle: 'Architectural visualization that transforms imagination into photorealistic immersive experiences.',
      scrollHint: 'Scroll to explore spaces ↓',
      typography: { activeConcept: 'classic', concepts: [] }
    });
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    await setDoc(doc(db, 'siteData', 'settings'), body, { merge: true });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Settings PUT error:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
