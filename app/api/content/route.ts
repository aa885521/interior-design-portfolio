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

export async function GET() {
  const data = readData();
  return NextResponse.json({ 
    services: data.services,
    aboutContent: data.aboutContent,
    contactContent: data.contactContent
  });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const data = readData();
  
  if (body.services) data.services = body.services;
  if (body.aboutContent) data.aboutContent = body.aboutContent;
  if (body.contactContent) data.contactContent = body.contactContent;

  writeData(data);
  return NextResponse.json({ success: true });
}
