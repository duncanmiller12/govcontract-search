'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getProfile } from '@/lib/storage'
import { getMockOpportunityById } from '@/lib/mockData'
import { SET_ASIDE_LABELS } from '@/lib/types'
import Tooltip from '@/components/Tooltip'
import type { Opportunity } from '@/lib/types'

function formatDate(d?: string) {
  if (!d) return 'N/A'
  try {
    return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  } catch {
    return d
  }
}

function formatCurrency(amount?: string) {
  if (!amount) return null
  const n = parseFloat(amount)
  if (isNaN(n)) return amount
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function daysUntil(d?: string) {
  if (!d) return null
  return Math.ceil((new Date(d).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
}

export default function OpportunityPage() {
  const { id } = useParams<{ id: string }>()
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const profile = getProfile()
      const apiKey = profile.samApiKey || ''

      if (!apiKey) {
        const mock = getMockOpportunityById(id)
        if (mock) {
          setOpportunity(mock)
        } else {
          setError('Opportunity not found')
        }
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`/api/opportunities?noticeId=${id}`, {
          headers: { 'x-sam-api-key': apiKey },
        })
        const data = await res.json()
        const found = data.opportunitiesData?.[0]
        if (found) {
          setOpportunity(found)
        } else {
          const mock = getMockOpportunityById(id)
          if (mock) setOpportunity(mock)
          else setError('Opportunity not found')
        }
      } catch {
        const mock = getMockOpportunityById(id)
        if (mock) setOpportunity(mock)
        else setError('Failed to load opportunity')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
        <div className="h-4 bg-gray-100 rounded w-1/2 mb-8" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-4 bg-gray-100 rounded" />)}
        </div>
      </div>
    )
  }

  if (error || !opportunity) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-lg font-medium text-gray-900 mb-2">{error || 'Not found'}</p>
        <Link href="/search" className="text-blue-600 hover:underline">← Back to search</Link>
      </div>
    )
  }

  const opp = opportunity
  const days = daysUntil(opp.responseDeadLine)
  const setAsideLabel = opp.typeOfSetAside ? SET_ASIDE_LABELS[opp.typeOfSetAside] || opp.typeOfSetAside : null
  const primaryContact = opp.pointOfContact?.find((c) => c.type === 'primary') || opp.pointOfContact?.[0]

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/search" className="text-sm text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← Back to search
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-navy-800 text-white px-6 py-6">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h1 className="text-xl font-bold leading-snug">{opp.title}</h1>
            {opp.active === 'Yes' ? (
              <span className="shrink-0 bg-green-400 text-green-900 text-xs font-semibold px-2 py-1 rounded-full">
                Active
              </span>
            ) : (
              <span className="shrink-0 bg-gray-400 text-gray-900 text-xs font-semibold px-2 py-1 rounded-full">
                Closed
              </span>
            )}
          </div>
          <p className="text-blue-200 text-sm">{opp.fullParentPathName}</p>
        </div>

        <div className="px-6 py-5 grid sm:grid-cols-2 gap-4 border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Notice Type</p>
            <p className="text-sm font-medium text-gray-900">{opp.type}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Solicitation #</p>
            <p className="text-sm font-medium text-gray-900">{opp.solicitationNumber || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Posted Date</p>
            <p className="text-sm font-medium text-gray-900">{formatDate(opp.postedDate)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Response Deadline</p>
            <p className={`text-sm font-medium ${days !== null && days >= 0 && days <= 7 ? 'text-red-600' : days !== null && days < 0 ? 'text-gray-400' : 'text-gray-900'}`}>
              {opp.responseDeadLine ? `${formatDate(opp.responseDeadLine)}${days !== null && days >= 0 ? ` (${days}d)` : days !== null && days < 0 ? ' (closed)' : ''}` : 'N/A'}
            </p>
          </div>
          {setAsideLabel && (
            <div>
              <Tooltip content="This contract is reserved for businesses that meet this qualification. If you qualify, you face less competition.">
                <p className="text-xs text-gray-500 mb-0.5">Set-Aside</p>
              </Tooltip>
              <p className="text-sm font-medium text-blue-700">{setAsideLabel}</p>
            </div>
          )}
          {opp.naicsCode && (
            <div>
              <Tooltip content="NAICS codes classify your industry. This code tells you what type of business this contract targets.">
                <p className="text-xs text-gray-500 mb-0.5">NAICS Code</p>
              </Tooltip>
              <p className="text-sm font-medium text-gray-900">
                {opp.naicsCode} — {opp.naicsDescription}
              </p>
            </div>
          )}
          {opp.placeOfPerformance?.state?.name && (
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Place of Performance</p>
              <p className="text-sm font-medium text-gray-900">
                {[opp.placeOfPerformance.city?.name, opp.placeOfPerformance.state.name]
                  .filter(Boolean)
                  .join(', ')}
              </p>
            </div>
          )}
        </div>

        {opp.award && (
          <div className="px-6 py-5 border-b border-gray-100 bg-green-50">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Award Information</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {opp.award.awardee?.name && (
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Awarded To</p>
                  <p className="text-sm font-medium text-gray-900">{opp.award.awardee.name}</p>
                </div>
              )}
              {opp.award.amount && (
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Award Amount</p>
                  <p className="text-sm font-bold text-green-700">{formatCurrency(opp.award.amount)}</p>
                </div>
              )}
              {opp.award.date && (
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Award Date</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(opp.award.date)}</p>
                </div>
              )}
              {opp.award.number && (
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Contract Number</p>
                  <p className="text-sm font-medium text-gray-900">{opp.award.number}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {opp.description && (
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{opp.description}</p>
          </div>
        )}

        {primaryContact && (
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Point of Contact</h2>
            <div className="space-y-1 text-sm text-gray-700">
              {primaryContact.fullName && <p className="font-medium">{primaryContact.fullName}</p>}
              {primaryContact.title && <p className="text-gray-500">{primaryContact.title}</p>}
              {primaryContact.email && (
                <p>
                  <a href={`mailto:${primaryContact.email}`} className="text-blue-600 hover:underline">
                    {primaryContact.email}
                  </a>
                </p>
              )}
              {primaryContact.phone && <p>{primaryContact.phone}</p>}
            </div>
          </div>
        )}

        <div className="px-6 py-5 flex flex-wrap gap-3">
          {opp.uiLink && (
            <a
              href={opp.uiLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              View on SAM.gov →
            </a>
          )}
          <Link
            href={`/search?q=${encodeURIComponent(opp.naicsCode || '')}`}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            Find Similar Contracts
          </Link>
        </div>
      </div>
    </div>
  )
}
