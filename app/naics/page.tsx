'use client'

import { useState } from 'react'
import NAICSCard from '@/components/NAICSCard'
import { searchNAICS } from '@/lib/naicsCodes'
import { getProfile, updateProfile } from '@/lib/storage'
import type { NAICSMatch, NAICSCode } from '@/lib/types'

type Mode = 'ai' | 'search'

export default function NAICSPage() {
  const [mode, setMode] = useState<Mode>('ai')
  const [description, setDescription] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [aiResults, setAiResults] = useState<NAICSMatch[]>([])
  const [searchResults, setSearchResults] = useState<NAICSCode[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedCodes, setSavedCodes] = useState<Set<string>>(() => {
    const profile = getProfile()
    return new Set(profile.savedNaicsCodes.map((c) => c.code))
  })

  async function handleAIMatch() {
    if (description.trim().length < 10) return
    setLoading(true)
    setError(null)
    setAiResults([])

    try {
      const res = await fetch('/api/naics-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: description.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'AI matching failed')
      setAiResults(data.matches || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(q: string) {
    setSearchQuery(q)
    setSearchResults(q.trim() ? searchNAICS(q.trim()).slice(0, 30) : [])
  }

  function handleSave(code: NAICSCode) {
    const profile = getProfile()
    const already = profile.savedNaicsCodes.find((c) => c.code === code.code)
    if (!already) {
      updateProfile({ savedNaicsCodes: [...profile.savedNaicsCodes, code] })
      setSavedCodes((prev) => new Set([...prev, code.code]))
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">NAICS Code Discovery</h1>
        <p className="text-gray-600">
          NAICS codes classify your industry. Federal agencies use them to target contracts — getting
          the right codes is key to finding relevant opportunities.
        </p>
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
        <button
          onClick={() => setMode('ai')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            mode === 'ai' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          ✨ AI Matching
        </button>
        <button
          onClick={() => setMode('search')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            mode === 'search' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🔍 Browse Codes
        </button>
      </div>

      {mode === 'ai' && (
        <div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 text-sm text-blue-800">
            Describe what your business does in plain English. The more detail you provide, the better the matches.
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Example: We provide IT consulting, custom software development, and cloud infrastructure management for healthcare organizations and government agencies. We specialize in cybersecurity compliance and HIPAA-compliant systems."
            rows={5}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
          />
          <button
            onClick={handleAIMatch}
            disabled={loading || description.trim().length < 10}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors w-full sm:w-auto"
          >
            {loading ? 'Finding matches...' : 'Find My NAICS Codes'}
          </button>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
              {error}
            </div>
          )}

          {aiResults.length > 0 && (
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-3">
                Found {aiResults.length} relevant codes — save the ones that apply to your business:
              </p>
              <div className="space-y-3">
                {aiResults.map((match) => (
                  <NAICSCard
                    key={match.code}
                    match={match}
                    onSave={handleSave}
                    saved={savedCodes.has(match.code)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {mode === 'search' && (
        <div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by code number or keyword (e.g. software, construction, medical)"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          {searchResults.length > 0 && (
            <div className="space-y-3">
              {searchResults.map((code) => (
                <NAICSCard
                  key={code.code}
                  match={code}
                  onSave={handleSave}
                  saved={savedCodes.has(code.code)}
                />
              ))}
            </div>
          )}
          {searchQuery && searchResults.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-8">
              No codes found for &ldquo;{searchQuery}&rdquo;
            </p>
          )}
          {!searchQuery && (
            <p className="text-sm text-gray-500 text-center py-8">
              Start typing to search all NAICS codes
            </p>
          )}
        </div>
      )}

      {savedCodes.size > 0 && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-green-800 mb-1">
            {savedCodes.size} code{savedCodes.size !== 1 ? 's' : ''} saved to your profile
          </p>
          <p className="text-xs text-green-700">
            Your saved codes help pre-fill search filters.{' '}
            <a href="/profile" className="underline">Manage in Profile →</a>
          </p>
        </div>
      )}
    </div>
  )
}
