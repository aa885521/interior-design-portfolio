import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'site-data.json');

function readData() {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeData(data: any) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// GET: return projects
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const data = readData();
  
  if (id) {
    const project = data.projects.find((p: any) => p.id === id);
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(project);
  }
  
  return NextResponse.json(data.projects);
}

// POST: add a new project
export async function POST(request: Request) {
  const body = await request.json();
  const data = readData();
  const newId = String(Date.now());
  const newProject = {
    id: newId,
    title: body.title || 'Untitled Project',
    subtitle: body.subtitle || '',
    category: body.category || 'Residential',
    year: body.year || new Date().getFullYear().toString(),
    description: body.description || '',
    coverImage: body.coverImage || '',
    gallery: body.gallery || [],
    meta: body.meta || { location: '', scope: '', software: '' },
  };
  data.projects.push(newProject);
  writeData(data);
  return NextResponse.json({ success: true, project: newProject });
}

// PUT: update a project
export async function PUT(request: Request) {
  const body = await request.json();
  const data = readData();
  const index = data.projects.findIndex((p: any) => p.id === body.id);
  if (index === -1) {
    return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 });
  }
  data.projects[index] = { ...data.projects[index], ...body };
  writeData(data);
  return NextResponse.json({ success: true, project: data.projects[index] });
}

// DELETE: delete a project
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const data = readData();
  data.projects = data.projects.filter((p: any) => p.id !== id);
  writeData(data);
  return NextResponse.json({ success: true });
}
