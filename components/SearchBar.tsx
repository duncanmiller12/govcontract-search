'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  defaultValue?: string
  placeholder?: string
  size?: 'default' | 'large'
}

export default function SearchBar({
  defaultValue = '',
  placeholder = 'Search contracts by keyword, industry, or agency...',
  size = 'default',
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)
  const router = useRouter()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    router.push(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={`flex-1 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          size === 'large' ? 'px-5 py-4 text-base' : 'px-4 py-2.5 text-sm'
        }`}
      />
      <button
        type="submit"
        className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shrink-0 ${
          size === 'large' ? 'px-6 py-4 text-base' : 'px-4 py-2.5 text-sm'
        }`}
      >
        Search
      </button>
    </form>
  )
}
