import { NextRequest, NextResponse } from 'next/server'
import { buildAwardsParams, fetchFromSAM } from '@/lib/samgov'
import { getMockAwardsResponse } from '@/lib/mockData'
import type { SearchFilters } from '@/lib/types'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const filters: SearchFilters = {
    keyword: searchParams.get('keyword') || undefined,
    naicsCode: searchParams.get('naicsCode') || undefined,
    agency: searchParams.get('agency') || undefined,
    postedFrom: searchParams.get('postedFrom') || undefined,
    postedTo: searchParams.get('postedTo') || undefined,
  }

  const limit = parseInt(searchParams.get('limit') || '25', 10)
  const offset = parseInt(searchParams.get('offset') || '0', 10)

  const apiKey = request.headers.get('x-sam-api-key') || ''

  if (!apiKey) {
    const data = getMockAwardsResponse(filters)
    return NextResponse.json({ ...data, isMock: true })
  }

  try {
    const params = buildAwardsParams(filters, limit, offset)
    const data = await fetchFromSAM(params, apiKey)
    return NextResponse.json(data)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
