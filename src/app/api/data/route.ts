

import { NextResponse } from 'next/server';
import { Asset, assets } from '@/app/lib/data';

export async function GET() {
    const localData: Asset[] = assets;
  
    return NextResponse.json(localData, { status: 200 });
  }
