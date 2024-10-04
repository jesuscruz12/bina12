import { NextResponse } from 'next/server';
import elliptic from 'elliptic';

export async function POST(request) {
  const { privateKey, message, signature } = await request.json();
  const EC = elliptic.ec;
  const ec = new EC('secp256k1');
  
  try {
    const key = ec.keyFromPrivate(privateKey);
    const isVerified = key.verify(message, signature);
    return NextResponse.json({ verified: isVerified });
  } catch (error) {
    return NextResponse.json({ error: 'Error al verificar la firma' }, { status: 400 });
  }
}
