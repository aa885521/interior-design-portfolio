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

// GET: return site settings
export async function GET() {
  const data = readData();
  return NextResponse.json(data.siteSettings);
}

// PUT: update site settings
export async function PUT(request: Request) {
  const body = await request.json();
  const data = readData();
  data.siteSettings = { ...data.siteSettings, ...body };
  writeData(data);
  return NextResponse.json({ success: true, data: data.siteSettings });
}
