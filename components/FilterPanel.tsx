'use client'

import { useState, useEffect } from 'react'
import { AGENCY_OPTIONS, SET_ASIDE_LABELS, NOTICE_TYPE_LABELS } from '@/lib/types'

type Filters = {
  naicsCode: string
  typeOfSetAside: string
  noticeType: string
  agency: string
  postedFrom: string
  postedTo: string
}

interface FilterPanelProps {
  filters: Filters
  onApply: (filters: Filters) => void
  onClear: () => void
}

export default function FilterPanel({ filters, onApply, onClear }: FilterPanelProps) {
  const [draft, setDraft] = useState<Filters>(filters)

  useEffect(() => {
    setDraft(filters)
  }, [filters])

  const hasDraftFilters = Object.values(draft).some(Boolean)
  const isDirty = JSON.stringify(draft) !== JSON.stringify(filters)

  function handleChange(key: keyof Filters, value: string) {
    setDraft((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900 text-sm">Filters</h2>
        {hasDraftFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Set-Aside Type</label>
        <select
          value={draft.typeOfSetAside}
          onChange={(e) => handleChange('typeOfSetAside', e.target.value)}
          className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">All businesses</option>
          {Object.entries(SET_ASIDE_LABELS).map(([code, label]) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Notice Type</label>
        <select
          value={draft.noticeType}
          onChange={(e) => handleChange('noticeType', e.target.value)}
          className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">All types</option>
          {Object.entries(NOTICE_TYPE_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Agency</label>
        <select
          value={draft.agency}
          onChange={(e) => handleChange('agency', e.target.value)}
          className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">All agencies</option>
          {AGENCY_OPTIONS.map((agency) => (
            <option key={agency} value={agency}>
              {agency}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">NAICS Code</label>
        <input
          type="text"
          value={draft.naicsCode}
          onChange={(e) => handleChange('naicsCode', e.target.value)}
          placeholder="e.g. 541511"
          maxLength={6}
          className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Posted From</label>
          <input
            type="date"
            value={draft.postedFrom}
            onChange={(e) => handleChange('postedFrom', e.target.value)}
            className="w-full text-sm border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Posted To</label>
          <input
            type="date"
            value={draft.postedTo}
            onChange={(e) => handleChange('postedTo', e.target.value)}
            className="w-full text-sm border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => onApply(draft)}
        disabled={!isDirty}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        Apply Filters
      </button>
    </div>
  )
}
