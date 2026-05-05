'use client'

import { Suspense, useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchBar from '@/components/SearchBar'
import ContractCard from '@/components/ContractCard'
import FilterPanel from '@/components/FilterPanel'
import SkeletonCard from '@/components/SkeletonCard'
import { getProfile, getCachedSearch, setCachedSearch, buildCacheKey } from '@/lib/storage'
import type { Opportunity } from '@/lib/types'

const EMPTY_FILTERS = {
  naicsCode: '',
  typeOfSetAside: '',
  noticeType: '',
  agency: '',
  postedFrom: '',
  postedTo: '',
}

type Tab = 'active' | 'awards'

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  const [tab, setTab] = useState<Tab>('active')
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [awards, setAwards] = useState<Opportunity[]>([])
  const [totalActive, setTotalActive] = useState(0)
  const [totalAwards, setTotalAwards] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMock, setIsMock] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const fetchData = useCallback(async (q: string, f: typeof EMPTY_FILTERS) => {
    setLoading(true)
    setError(null)

    const profile = getProfile()
    const apiKey = profile.samApiKey || ''

    const activeKey = buildCacheKey(`active:${q}`, f)
    const awardsKey = buildCacheKey(`awards:${q}`, f)

    const cachedActive = getCachedSearch(activeKey)
    const cachedAwards = getCachedSearch(awardsKey)

    if (cachedActive && cachedAwards) {
      setOpportunities(cachedActive.opportunities)
      setTotalActive(cachedActive.totalRecords)
      setAwards(cachedAwards.opportunities)
      setTotalAwards(cachedAwards.totalRecords)
      setLoading(false)
      return
    }

    const params = new URLSearchParams()
    if (q) params.set('keyword', q)
    if (f.naicsCode) params.set('naicsCode', f.naicsCode)
    if (f.typeOfSetAside) params.set('typeOfSetAside', f.typeOfSetAside)
    if (f.noticeType) params.set('noticeType', f.noticeType)
    if (f.agency) params.set('agency', f.agency)
    if (f.postedFrom) params.set('postedFrom', f.postedFrom)
    if (f.postedTo) params.set('postedTo', f.postedTo)

    const headers: Record<string, string> = {}
    if (apiKey) headers['x-sam-api-key'] = apiKey

    try {
      const [activeRes, awardsRes] = await Promise.all([
        fetch(`/api/opportunities?${params}`, { headers }),
        fetch(`/api/awards?${params}`, { headers }),
      ])

      if (!activeRes.ok || !awardsRes.ok) {
        throw new Error('Failed to fetch opportunities')
      }

      const activeData = await activeRes.json()
      const awardsData = await awardsRes.json()

      setOpportunities(activeData.opportunitiesData || [])
      setTotalActive(activeData.totalRecords || 0)
      setAwards(awardsData.opportunitiesData || [])
      setTotalAwards(awardsData.totalRecords || 0)
      setIsMock(activeData.isMock || false)

      setCachedSearch(activeKey, {
        query: q,
        opportunities: activeData.opportunitiesData || [],
        totalRecords: activeData.totalRecords || 0,
      })
      setCachedSearch(awardsKey, {
        query: q,
        opportunities: awardsData.opportunitiesData || [],
        totalRecords: awardsData.totalRecords || 0,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData(query, filters)
  }, [query, filters, fetchData])

  function handleFilterChange(key: string, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  function handleClearFilters() {
    setFilters(EMPTY_FILTERS)
  }

  const activeCount = opportunities.length
  const awardsCount = awards.length
  const displayItems = tab === 'active' ? opportunities : awards
  const displayTotal = tab === 'active' ? totalActive : totalAwards

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6">
        <SearchBar defaultValue={query} />
      </div>

      {isMock && (
        <div className="mb-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
          Showing sample data. Add your free{' '}
          <a
            href="https://sam.gov/content/entity-information/registration"
            className="underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            SAM.gov API key
          </a>{' '}
          in{' '}
          <a href="/profile" className="underline font-medium">
            Profile
          </a>{' '}
          to see live contracts.
        </div>
      )}

      <div className="flex gap-6">
        <div className="hidden lg:block w-64 shrink-0">
          <FilterPanel filters={filters} onChange={handleFilterChange} onClear={handleClearFilters} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setTab('active')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  tab === 'active'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Active Opportunities
                {!loading && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                    {activeCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setTab('awards')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  tab === 'awards'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Historical Awards
                {!loading && (
                  <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">
                    {awardsCount}
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={() => setShowFilters((v) => !v)}
              className="lg:hidden text-sm text-blue-600 font-medium border border-blue-300 px-3 py-2 rounded-lg"
            >
              Filters {Object.values(filters).some(Boolean) ? '●' : ''}
            </button>
          </div>

          {showFilters && (
            <div className="lg:hidden mb-4">
              <FilterPanel
                filters={filters}
                onChange={handleFilterChange}
                onClear={handleClearFilters}
              />
            </div>
          )}

          {!loading && query && (
            <p className="text-sm text-gray-500 mb-4">
              {displayTotal} result{displayTotal !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800 mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : displayItems.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg font-medium mb-2">No results found</p>
              <p className="text-sm">Try different keywords or remove some filters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {displayItems.map((opp) => (
                <ContractCard key={opp.noticeId} opportunity={opp} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  )
}
