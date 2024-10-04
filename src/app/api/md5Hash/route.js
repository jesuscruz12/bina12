import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';

export async function POST(request) {
  const { message } = await request.json();
  try {
    const hash = CryptoJS.MD5(message).toString();
    return NextResponse.json({ md5: hash });
  } catch (error) {
    return NextResponse.json({ error: 'Error al generar el hash' }, { status: 400 });
  }
}
