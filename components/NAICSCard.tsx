'use client'

import type { NAICSMatch, NAICSCode } from '@/lib/types'

interface NAICSCardProps {
  match: NAICSMatch | NAICSCode
  onSave?: (code: NAICSCode) => void
  saved?: boolean
}

const CONFIDENCE_STYLES = {
  high: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-gray-100 text-gray-700 border-gray-200',
}

function isNAICSMatch(m: NAICSMatch | NAICSCode): m is NAICSMatch {
  return 'confidence' in m
}

export default function NAICSCard({ match, onSave, saved }: NAICSCardProps) {
  const isMatch = isNAICSMatch(match)
  const confidenceStyle = isMatch ? CONFIDENCE_STYLES[match.confidence] : null

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
            {match.code}
          </span>
          {isMatch && confidenceStyle && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${confidenceStyle}`}>
              {match.confidence} match
            </span>
          )}
        </div>
        <p className="text-sm font-semibold text-gray-900 mb-1">{match.title}</p>
        {isMatch && match.reason && (
          <p className="text-sm text-gray-600">{match.reason}</p>
        )}
      </div>
      {onSave && (
        <button
          type="button"
          onClick={() => onSave({ code: match.code, title: match.title })}
          className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            saved
              ? 'bg-green-100 text-green-700 cursor-default'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          disabled={saved}
        >
          {saved ? 'Saved' : 'Save'}
        </button>
      )}
    </div>
  )
}
