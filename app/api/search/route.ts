import { NextResponse } from 'next/server';
import { groupResultsByCategory, searchAll } from '@/lib/search';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') ?? '';
  const results = searchAll(query);
  return NextResponse.json({ results, grouped: groupResultsByCategory(results) });
}
