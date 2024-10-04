import { NextResponse } from 'next/server';
import elliptic from 'elliptic';

export async function POST(request) {
  const { privateKey, message } = await request.json();
  const EC = elliptic.ec;
  const ec = new EC('secp256k1');
  
  try {
    const key = ec.keyFromPrivate(privateKey);
    const signature = key.sign(message).toDER('hex');
    return NextResponse.json({ signature });
  } catch (error) {
    return NextResponse.json({ error: 'Error al generar la firma' }, { status: 400 });
  }
}
