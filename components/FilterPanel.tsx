'use client'

import { AGENCY_OPTIONS, SET_ASIDE_LABELS, NOTICE_TYPE_LABELS } from '@/lib/types'

interface FilterPanelProps {
  filters: {
    naicsCode: string
    typeOfSetAside: string
    noticeType: string
    agency: string
    postedFrom: string
    postedTo: string
  }
  onChange: (key: string, value: string) => void
  onClear: () => void
}

export default function FilterPanel({ filters, onChange, onClear }: FilterPanelProps) {
  const hasFilters = Object.values(filters).some(Boolean)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900 text-sm">Filters</h2>
        {hasFilters && (
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
          value={filters.typeOfSetAside}
          onChange={(e) => onChange('typeOfSetAside', e.target.value)}
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
          value={filters.noticeType}
          onChange={(e) => onChange('noticeType', e.target.value)}
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
          value={filters.agency}
          onChange={(e) => onChange('agency', e.target.value)}
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
          value={filters.naicsCode}
          onChange={(e) => onChange('naicsCode', e.target.value)}
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
            value={filters.postedFrom}
            onChange={(e) => onChange('postedFrom', e.target.value)}
            className="w-full text-sm border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Posted To</label>
          <input
            type="date"
            value={filters.postedTo}
            onChange={(e) => onChange('postedTo', e.target.value)}
            className="w-full text-sm border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  )
}
