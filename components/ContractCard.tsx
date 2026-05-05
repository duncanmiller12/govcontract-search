import Link from 'next/link'
import type { Opportunity } from '@/lib/types'
import { SET_ASIDE_LABELS } from '@/lib/types'
import Tooltip from './Tooltip'

interface ContractCardProps {
  opportunity: Opportunity
}

const NOTICE_COLORS: Record<string, string> = {
  'Presolicitation': 'bg-yellow-100 text-yellow-800',
  'Sources Sought': 'bg-purple-100 text-purple-800',
  'Combined Synopsis/Solicitation': 'bg-blue-100 text-blue-800',
  'Request for Proposal': 'bg-green-100 text-green-800',
  'Award Notice': 'bg-gray-100 text-gray-700',
  'Special Notice': 'bg-orange-100 text-orange-800',
  'Modification/Amendment': 'bg-red-100 text-red-800',
}

const NOTICE_TOOLTIPS: Record<string, string> = {
  'Presolicitation': 'An early notice that a contract will be available soon. Good time to reach out to the agency.',
  'Sources Sought': 'The government is researching the market — not yet a formal contract. Responding helps you get on their radar.',
  'Combined Synopsis/Solicitation': 'A combined announcement and request for bids. You can submit a proposal directly.',
  'Request for Proposal': 'A formal invitation to submit a detailed proposal to win the contract.',
  'Award Notice': 'This contract has already been awarded to another company.',
  'Special Notice': 'Important information about upcoming opportunities or program changes.',
  'Modification/Amendment': 'A change or update to an existing contract or solicitation.',
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return 'TBD'
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

function daysUntil(dateStr?: string): number | null {
  if (!dateStr) return null
  const diff = new Date(dateStr).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export default function ContractCard({ opportunity: opp }: ContractCardProps) {
  const setAsideLabel = opp.typeOfSetAside ? SET_ASIDE_LABELS[opp.typeOfSetAside] || opp.typeOfSetAside : null
  const noticeColor = NOTICE_COLORS[opp.type] || 'bg-gray-100 text-gray-700'
  const noticeTooltip = NOTICE_TOOLTIPS[opp.type] || ''
  const days = daysUntil(opp.responseDeadLine)
  const isUrgent = days !== null && days <= 7 && days >= 0
  const isPast = days !== null && days < 0

  return (
    <Link
      href={`/opportunity/${opp.noticeId}`}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-400 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 leading-snug line-clamp-2">
          {opp.title}
        </h3>
        <Tooltip content={noticeTooltip}>
          <span className={`shrink-0 text-xs font-medium px-2 py-1 rounded-full ${noticeColor}`}>
            {opp.type === 'Combined Synopsis/Solicitation' ? 'Solicitation' : opp.type}
          </span>
        </Tooltip>
      </div>

      <p className="text-sm text-gray-500 mb-3">{opp.fullParentPathName}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {setAsideLabel && (
          <Tooltip content="This contract is reserved for businesses that meet this qualification.">
            <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
              {setAsideLabel}
            </span>
          </Tooltip>
        )}
        {opp.naicsCode && (
          <span className="text-xs bg-gray-50 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full">
            NAICS {opp.naicsCode}
          </span>
        )}
        {opp.placeOfPerformance?.state?.name && (
          <span className="text-xs bg-gray-50 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full">
            {opp.placeOfPerformance.state.name}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Posted {formatDate(opp.postedDate)}</span>
        {opp.responseDeadLine && (
          <span className={`font-medium ${isUrgent ? 'text-red-600' : isPast ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
            {isPast
              ? `Closed ${formatDate(opp.responseDeadLine)}`
              : isUrgent
              ? `Due in ${days} day${days === 1 ? '' : 's'} — ${formatDate(opp.responseDeadLine)}`
              : `Due ${formatDate(opp.responseDeadLine)}`}
          </span>
        )}
        {opp.award?.amount && (
          <span className="font-medium text-green-700">
            ${Number(opp.award.amount).toLocaleString()}
          </span>
        )}
      </div>
    </Link>
  )
}
