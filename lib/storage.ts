'use client'

import type { UserProfile, SearchCache } from './types'

const PROFILE_KEY = 'govcontract_profile'
const CACHE_KEY_PREFIX = 'govcontract_cache_'
const CACHE_TTL_MS = 6 * 60 * 60 * 1000 // 6 hours

export function getProfile(): UserProfile {
  if (typeof window === 'undefined') return defaultProfile()
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    if (!raw) return defaultProfile()
    return { ...defaultProfile(), ...JSON.parse(raw) }
  } catch {
    return defaultProfile()
  }
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function updateProfile(updates: Partial<UserProfile>): UserProfile {
  const current = getProfile()
  const updated = { ...current, ...updates }
  saveProfile(updated)
  return updated
}

function defaultProfile(): UserProfile {
  return {
    companyName: '',
    industryDescription: '',
    savedNaicsCodes: [],
    samApiKey: '',
    defaultAgency: '',
    defaultSetAside: '',
  }
}

export function getCachedSearch(cacheKey: string): SearchCache | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CACHE_KEY_PREFIX + cacheKey)
    if (!raw) return null
    const cache: SearchCache = JSON.parse(raw)
    if (Date.now() - cache.timestamp > CACHE_TTL_MS) {
      localStorage.removeItem(CACHE_KEY_PREFIX + cacheKey)
      return null
    }
    return cache
  } catch {
    return null
  }
}

export function setCachedSearch(cacheKey: string, data: Omit<SearchCache, 'timestamp'>): void {
  if (typeof window === 'undefined') return
  try {
    const cache: SearchCache = { ...data, timestamp: Date.now() }
    localStorage.setItem(CACHE_KEY_PREFIX + cacheKey, JSON.stringify(cache))
  } catch {
    // localStorage may be full; silently fail
  }
}

export function buildCacheKey(query: string, filters: Record<string, string>): string {
  const sorted = Object.entries(filters)
    .filter(([, v]) => v)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('&')
  return btoa(`${query}::${sorted}`).slice(0, 64)
}
