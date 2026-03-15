// Seed script: uploads local site-data.json to Firestore
// Run with: node scripts/seed-firestore.mjs

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const firebaseConfig = {
  apiKey: "AIzaSyCGbQz9qeL8LYO7b7D-nbAbaYGojJmkreI",
  authDomain: "interior-design-portfoli-cfce9.firebaseapp.com",
  projectId: "interior-design-portfoli-cfce9",
  storageBucket: "interior-design-portfoli-cfce9.firebasestorage.app",
  messagingSenderId: "657547522111",
  appId: "1:657547522111:web:03acb84129ed6f446fc88a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  const raw = readFileSync(join(__dirname, '..', 'data', 'site-data.json'), 'utf-8');
  const data = JSON.parse(raw);

  // 1. Upload settings
  console.log('📤 Uploading settings...');
  await setDoc(doc(db, 'siteData', 'settings'), data.siteSettings);

  // 2. Upload projects
  console.log('📤 Uploading projects...');
  for (const project of data.projects) {
    const { id, ...rest } = project;
    await setDoc(doc(db, 'projects', id), rest);
    console.log(`   ✅ Project: ${rest.title}`);
  }

  // 3. Upload services
  console.log('📤 Uploading services...');
  for (const service of data.services) {
    const { id, ...rest } = service;
    await setDoc(doc(db, 'services', id), rest);
    console.log(`   ✅ Service: ${rest.name}`);
  }

  // 4. Upload aboutContent
  console.log('📤 Uploading about content...');
  await setDoc(doc(db, 'siteData', 'aboutContent'), data.aboutContent);

  // 5. Upload contactContent
  console.log('📤 Uploading contact content...');
  await setDoc(doc(db, 'siteData', 'contactContent'), data.contactContent);

  console.log('\n🎉 All data seeded to Firestore successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
