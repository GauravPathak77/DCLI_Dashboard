// src/app/api/edit_data/route.js
import { db } from '../firebase-admin';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { id, field, value } = await req.json();

    if (!id || !field) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await db.collection('vehicles').doc(id).update({
      [field]: value,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error updating data:', err);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}
