'use client'

import { useState, useEffect } from 'react'
import { getProfile, updateProfile } from '@/lib/storage'
import type { UserProfile, NAICSCode } from '@/lib/types'

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [saved, setSaved] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  useEffect(() => {
    setProfile(getProfile())
  }, [])

  function handleChange(field: keyof UserProfile, value: string) {
    if (!profile) return
    setProfile({ ...profile, [field]: value })
    setSaved(false)
  }

  function handleSave() {
    if (!profile) return
    updateProfile(profile)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function removeNaicsCode(code: string) {
    if (!profile) return
    const updated = { ...profile, savedNaicsCodes: profile.savedNaicsCodes.filter((c) => c.code !== code) }
    setProfile(updated)
    updateProfile(updated)
  }

  if (!profile) return null

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Profile</h1>
      <p className="text-gray-600 mb-8">
        Save your business details once to speed up future searches.
        Everything is stored locally in your browser — nothing leaves your device.
      </p>

      <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
        <div className="p-6 space-y-5">
          <h2 className="font-semibold text-gray-900">Business Information</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              value={profile.companyName || ''}
              onChange={(e) => handleChange('companyName', e.target.value)}
              placeholder="Your company name"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What does your business do?</label>
            <textarea
              value={profile.industryDescription || ''}
              onChange={(e) => handleChange('industryDescription', e.target.value)}
              placeholder="Describe your products or services in plain English"
              rows={3}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">Used in the NAICS code discovery tool</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Default Agency</label>
            <input
              type="text"
              value={profile.defaultAgency || ''}
              onChange={(e) => handleChange('defaultAgency', e.target.value)}
              placeholder="e.g. Department of Veterans Affairs"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="p-6">
          <h2 className="font-semibold text-gray-900 mb-1">SAM.gov API Key</h2>
          <p className="text-sm text-gray-600 mb-4">
            Without an API key, the app uses sample data. Get your free key at{' '}
            <a
              href="https://sam.gov/content/entity-information/registration"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              sam.gov
            </a>{' '}
            (requires account registration).
          </p>
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={profile.samApiKey || ''}
              onChange={(e) => handleChange('samApiKey', e.target.value)}
              placeholder="Paste your SAM.gov API key"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
            <button
              type="button"
              onClick={() => setShowApiKey((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700 font-medium"
            >
              {showApiKey ? 'Hide' : 'Show'}
            </button>
          </div>
          {profile.samApiKey && (
            <p className="text-xs text-green-700 mt-1.5">✓ API key saved — live data enabled</p>
          )}
        </div>

        <div className="p-6">
          <h2 className="font-semibold text-gray-900 mb-3">Saved NAICS Codes</h2>
          {profile.savedNaicsCodes.length === 0 ? (
            <p className="text-sm text-gray-500">
              No codes saved yet.{' '}
              <a href="/naics" className="text-blue-600 hover:underline">
                Discover your codes →
              </a>
            </p>
          ) : (
            <div className="space-y-2">
              {profile.savedNaicsCodes.map((code: NAICSCode) => (
                <div
                  key={code.code}
                  className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3"
                >
                  <div>
                    <span className="font-mono text-sm font-bold text-blue-700 mr-2">{code.code}</span>
                    <span className="text-sm text-gray-700">{code.title}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeNaicsCode(code.code)}
                    className="text-xs text-red-500 hover:text-red-700 font-medium ml-3"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6">
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            {saved ? '✓ Saved!' : 'Save Profile'}
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Stored in your browser only. Clearing browser data will remove this.
          </p>
        </div>
      </div>
    </div>
  )
}
