import Link from 'next/link'
import SearchBar from '@/components/SearchBar'

const FEATURES = [
  {
    icon: '🔍',
    title: 'Plain-English Results',
    desc: 'We translate government jargon into terms that make sense for your business.',
  },
  {
    icon: '🏷️',
    title: 'NAICS Code Discovery',
    desc: 'Not sure what codes apply to you? Describe your business and let AI find the right ones.',
  },
  {
    icon: '🎯',
    title: 'Smart Filters',
    desc: 'Filter by set-aside type, agency, deadline, and more to find contracts you can actually win.',
  },
  {
    icon: '📋',
    title: 'Your Profile',
    desc: 'Save your NAICS codes and API key once — search instantly every time.',
  },
]

const SETASIDE_EXPLAINERS = [
  { code: 'Small Business', desc: 'Contracts reserved for companies under a certain size' },
  { code: 'SDVOSB', desc: 'Service-Disabled Veteran-Owned Small Business' },
  { code: '8(a)', desc: 'Socially & economically disadvantaged businesses' },
  { code: 'HUBZone', desc: 'Businesses in historically underutilized areas' },
  { code: 'WOSB', desc: "Women-Owned Small Business" },
  { code: 'Veteran-Owned', desc: 'Veteran-Owned Small Business' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            Find Government Contracts<br className="hidden sm:block" /> Made for Your Business
          </h1>
          <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
            Search billions in federal contracting opportunities on SAM.gov — without the complexity.
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar size="large" placeholder="Try: IT support, construction, healthcare staffing..." />
          </div>
          <p className="text-blue-300 text-sm mt-4">
            Uses live SAM.gov data when you add your free API key in{' '}
            <Link href="/profile" className="underline hover:text-white">
              Profile
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
          {[
            { href: '/search?q=IT+services', label: '💻 IT Services' },
            { href: '/search?q=construction', label: '🏗️ Construction' },
            { href: '/search?q=healthcare', label: '🏥 Healthcare' },
            { href: '/search?q=consulting', label: '📊 Consulting' },
            { href: '/search?q=logistics', label: '🚚 Logistics' },
            { href: '/search?q=cybersecurity', label: '🔒 Cybersecurity' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 border border-gray-200 hover:border-blue-300 px-4 py-2 rounded-full transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Government contracting, simplified
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-gray-200 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What are set-asides?</h2>
          <p className="text-gray-600 mb-8">
            The federal government reserves a portion of contracts exclusively for certain types of
            businesses. If you qualify, you face less competition:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SETASIDE_EXPLAINERS.map(({ code, desc }) => (
              <div key={code} className="bg-blue-50 rounded-xl p-4">
                <p className="font-semibold text-blue-900 text-sm mb-1">{code}</p>
                <p className="text-blue-700 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">New to government contracting?</h2>
          <p className="text-gray-600 mb-6">
            Start by finding your NAICS codes — the industry classification codes that determine
            which contracts you can compete for.
          </p>
          <Link
            href="/naics"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Discover My NAICS Codes →
          </Link>
        </div>
      </section>
    </div>
  )
}
