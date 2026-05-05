import type { SAMOpportunitiesResponse, SearchFilters } from './types'

const SAM_API_BASE = 'https://api.sam.gov/prod/opportunities/v2/search'

export function buildSAMParams(filters: SearchFilters, limit = 25, offset = 0): URLSearchParams {
  const params = new URLSearchParams()
  params.set('limit', String(limit))
  params.set('offset', String(offset))

  if (filters.keyword) params.set('q', filters.keyword)
  if (filters.naicsCode) params.set('naicsCode', filters.naicsCode)
  if (filters.typeOfSetAside) params.set('typeOfSetAside', filters.typeOfSetAside)
  if (filters.noticeType) params.set('ptype', filters.noticeType)
  if (filters.agency) params.set('organization', filters.agency)
  if (filters.postedFrom) params.set('postedFrom', filters.postedFrom)
  if (filters.postedTo) params.set('postedTo', filters.postedTo)

  return params
}

export function buildAwardsParams(filters: SearchFilters, limit = 25, offset = 0): URLSearchParams {
  const params = buildSAMParams(filters, limit, offset)
  params.set('ptype', 'a')
  return params
}

export async function fetchFromSAM(
  params: URLSearchParams,
  apiKey: string
): Promise<SAMOpportunitiesResponse> {
  const url = `${SAM_API_BASE}?${params.toString()}&api_key=${apiKey}`
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 0 },
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`SAM.gov API error ${response.status}: ${text.slice(0, 200)}`)
  }

  return response.json()
}
