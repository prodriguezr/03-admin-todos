import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  return NextResponse.json({
    hola: 'mundo',
  });
}

export async function POST(req: Request) {
  return NextResponse.json({
    hola: 'mundo',
    method: 'POST',
  });
}
