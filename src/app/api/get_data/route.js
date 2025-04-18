// src/app/api/get_data/route.js
import { db } from '../firebase-admin';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const snapshot = await db.collection('vehicle_detections').get();

    const data = snapshot.docs.map((doc, index) => {
      const d = doc.data();
      console.log("Data is: ", d);
      return {
        id: doc.id,
        S_No: index + 1,
        License_Number: d.license_plate || '',
        Serial_Number: d.serial_number || '',
        Container_ID: d.container_id || '',
        DOT_Number: d.dot_number || '',
        Mudflap: d.mudflap ?? false,
        Tail_Light: d.taillight ?? false,
        Image: d.image_base64 ? `data:image/jpeg;base64,${d.image_base64}` : '',
      };
    });

    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
