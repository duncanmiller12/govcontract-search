// Core types matching SAM.gov API response shapes exactly

export interface Opportunity {
  noticeId: string
  title: string
  solicitationNumber?: string
  fullParentPathName?: string
  fullParentPathCode?: string
  postedDate: string
  type: string
  baseType?: string
  archiveType?: string
  archiveDate?: string
  typeOfSetAside?: string
  typeOfSetAsideDescription?: string
  responseDeadLine?: string
  naicsCode?: string
  naicsDescription?: string
  classificationCode?: string
  active: string
  award?: {
    date?: string
    number?: string
    amount?: string
    awardee?: {
      name?: string
      ueiSAM?: string
      location?: {
        streetAddress?: string
        city?: { name?: string; code?: string }
        state?: { name?: string; code?: string }
        zip?: string
        country?: { name?: string; code?: string }
      }
    }
  }
  pointOfContact?: Array<{
    additionalInfo?: { content?: string }
    email?: string
    fax?: string
    fullName?: string
    phone?: string
    title?: string
    type?: string
  }>
  description?: string
  organizationType?: string
  officeAddress?: {
    zipcode?: string
    city?: string
    countryCode?: string
    state?: string
  }
  placeOfPerformance?: {
    streetAddress?: string
    city?: { name?: string; code?: string }
    state?: { name?: string; code?: string }
    zip?: string
    country?: { name?: string; code?: string }
  }
  additionalInfoLink?: string
  uiLink?: string
  links?: Array<{ rel?: string; href?: string }>
  resourceLinks?: string[]
}

export interface SAMOpportunitiesResponse {
  totalRecords: number
  opportunitiesData: Opportunity[]
  links?: Array<{ rel?: string; href?: string }>
}

export interface SearchFilters {
  keyword?: string
  naicsCode?: string
  typeOfSetAside?: string
  noticeType?: string
  agency?: string
  postedFrom?: string
  postedTo?: string
  minValue?: string
  maxValue?: string
}

export interface UserProfile {
  companyName?: string
  industryDescription?: string
  savedNaicsCodes: NAICSCode[]
  samApiKey?: string
  defaultAgency?: string
  defaultSetAside?: string
}

export interface NAICSCode {
  code: string
  title: string
  description?: string
}

export interface NAICSMatch {
  code: string
  title: string
  reason: string
  confidence: 'high' | 'medium' | 'low'
}

export interface SearchCache {
  query: string
  timestamp: number
  opportunities: Opportunity[]
  totalRecords: number
}

export const NOTICE_TYPES: Record<string, string> = {
  'o': 'Sources Sought',
  'p': 'Presolicitation',
  'k': 'Combined Synopsis/Solicitation',
  'r': 'Request for Proposal',
  's': 'Special Notice',
  'g': 'Sale of Surplus Property',
  'i': 'Intent to Bundle Requirements',
  'a': 'Award Notice',
  'u': 'Justification and Approval',
  'j': 'Justification',
  'l': 'Fair Opportunity / Limited Sources Justification',
  'm': 'Modification/Amendment',
  'f': 'Foreign Government Standard',
}

export const NOTICE_TYPE_LABELS: Record<string, string> = {
  'Sources Sought': 'Sources Sought',
  'Presolicitation': 'Presolicitation',
  'Combined Synopsis/Solicitation': 'Solicitation',
  'Request for Proposal': 'Request for Proposal',
  'Solicitation': 'Solicitation',
  'Special Notice': 'Special Notice',
  'Award Notice': 'Award Notice',
  'Modification/Amendment': 'Amendment',
}

export const SET_ASIDE_LABELS: Record<string, string> = {
  'SBA': 'Small Business',
  'SBP': 'Small Business Set-Aside (Partial)',
  '8AN': '8(a) Program',
  'HZC': 'HUBZone',
  'HZS': 'HUBZone Set-Aside',
  'SDVOSBC': 'Service-Disabled Veteran-Owned Small Business',
  'SDVOSBS': 'SDVOSB Set-Aside',
  'WOSB': 'Women-Owned Small Business',
  'EDWOSB': 'Economically Disadvantaged WOSB',
  'VSB': 'Veteran Small Business',
  'VOSB': 'Veteran-Owned Small Business',
  'IEE': 'Indian Economic Enterprise',
  'ISBEE': 'Indian Small Business Economic Enterprise',
  'BICiv': 'Buy Indian Set-Aside',
  'LOCAL': 'Local Area Set-Aside',
  'NONE': 'No Set-Aside',
}

export const AGENCY_OPTIONS = [
  'Department of Defense',
  'Department of the Army',
  'Department of the Navy',
  'Department of the Air Force',
  'Department of Veterans Affairs',
  'Department of Health and Human Services',
  'Department of Homeland Security',
  'General Services Administration',
  'Department of Transportation',
  'Department of Energy',
  'Department of Justice',
  'Department of Agriculture',
  'Department of Commerce',
  'Department of the Interior',
  'Department of State',
  'Department of Education',
  'Department of Housing and Urban Development',
  'Department of Labor',
  'Department of the Treasury',
  'NASA',
  'Environmental Protection Agency',
  'Social Security Administration',
]
