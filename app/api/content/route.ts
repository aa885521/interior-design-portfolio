import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get services
    const servicesSnap = await getDocs(collection(db, 'services'));
    const services: any[] = [];
    servicesSnap.forEach((d) => services.push({ id: d.id, ...d.data() }));

    // Get aboutContent
    const aboutSnap = await getDoc(doc(db, 'siteData', 'aboutContent'));
    const aboutContent = aboutSnap.exists() ? aboutSnap.data() : {
      headline: 'We render\natmospheres.',
      descriptionLeft: '',
      descriptionRight: '',
      stats: []
    };

    // Get contactContent
    const contactSnap = await getDoc(doc(db, 'siteData', 'contactContent'));
    const contactContent = contactSnap.exists() ? contactSnap.data() : {
      headline: "Let's shape\nyour vision.",
      description: '',
      email: '',
      location: ''
    };

    // Get servicesIntro
    const siteDataSnap = await getDoc(doc(db, 'siteData', 'content'));
    const servicesIntro = siteDataSnap.exists() ? siteDataSnap.data()?.servicesIntro || '' : '';

    return NextResponse.json({ services, aboutContent, contactContent, servicesIntro });
  } catch (error) {
    console.error('Content GET error:', error);
    // Return safe fallback data instead of 500 — prevents frontend crash
    return NextResponse.json({
      services: [],
      aboutContent: { headline: '', descriptionLeft: '', descriptionRight: '', stats: [] },
      contactContent: { headline: '', description: '', email: '', location: '' },
      servicesIntro: ''
    });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Save services
    if (body.services) {
      for (const svc of body.services) {
        const { id, ...data } = svc;
        await setDoc(doc(db, 'services', id), data, { merge: true });
      }
    }

    // Save aboutContent
    if (body.aboutContent) {
      await setDoc(doc(db, 'siteData', 'aboutContent'), body.aboutContent, { merge: true });
    }

    // Save contactContent
    if (body.contactContent) {
      await setDoc(doc(db, 'siteData', 'contactContent'), body.contactContent, { merge: true });
    }

    // Save servicesIntro
    if (body.servicesIntro !== undefined) {
      await setDoc(doc(db, 'siteData', 'content'), { servicesIntro: body.servicesIntro }, { merge: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Content PUT error:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
