import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, addDoc } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // If an ID is provided, return a single project document
    if (id) {
      const snap = await getDoc(doc(db, 'projects', id));
      if (!snap.exists()) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }
      return NextResponse.json({ id: snap.id, ...snap.data() });
    }

    // Otherwise return all projects
    const snap = await getDocs(collection(db, 'projects'));
    const projects: any[] = [];
    snap.forEach((d) => {
      projects.push({ id: d.id, ...d.data() });
    });
    // Sort by year descending
    projects.sort((a, b) => (b.year || '0').localeCompare(a.year || '0'));
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Projects GET error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const ref = await addDoc(collection(db, 'projects'), data);
    return NextResponse.json({ success: true, id: ref.id });
  } catch (error) {
    console.error('Projects POST error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    if (!id) return NextResponse.json({ error: 'Missing project id' }, { status: 400 });
    await setDoc(doc(db, 'projects', id), data, { merge: true });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Projects PUT error:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await deleteDoc(doc(db, 'projects', id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Projects DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
