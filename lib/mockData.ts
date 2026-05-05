import type { Opportunity, SAMOpportunitiesResponse } from './types'

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    noticeId: 'mock-001',
    title: 'IT Support Services and Help Desk Operations',
    solicitationNumber: 'VA-2024-IT-001',
    fullParentPathName: 'Department of Veterans Affairs',
    fullParentPathCode: 'VA',
    postedDate: '2024-11-15',
    type: 'Presolicitation',
    baseType: 'Presolicitation',
    archiveType: 'autocustom',
    archiveDate: '2025-02-15',
    typeOfSetAside: 'SDVOSBC',
    typeOfSetAsideDescription: 'Service-Disabled Veteran-Owned Small Business',
    responseDeadLine: '2025-01-15T17:00:00-05:00',
    naicsCode: '541513',
    naicsDescription: 'Computer Facilities Management Services',
    classificationCode: 'D',
    active: 'Yes',
    pointOfContact: [
      {
        fullName: 'Sarah Johnson',
        email: 'sarah.johnson@va.gov',
        phone: '202-555-0101',
        title: 'Contracting Officer',
        type: 'primary',
      },
    ],
    description:
      'The Department of Veterans Affairs is seeking qualified Service-Disabled Veteran-Owned Small Businesses to provide comprehensive IT support services including help desk operations, desktop support, network monitoring, and cybersecurity compliance for 15 VA medical centers across the Southeast region.',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'Washington',
      state: 'DC',
      zipcode: '20420',
      countryCode: 'USA',
    },
    placeOfPerformance: {
      city: { name: 'Nashville', code: 'Nashville' },
      state: { name: 'Tennessee', code: 'TN' },
      country: { name: 'United States', code: 'USA' },
    },
    uiLink: 'https://sam.gov/opp/mock-001',
    links: [{ rel: 'self', href: 'https://api.sam.gov/prod/opportunities/v2/search/mock-001' }],
  },
  {
    noticeId: 'mock-002',
    title: 'Cybersecurity Assessment and Penetration Testing Services',
    solicitationNumber: 'DHS-2024-CYBER-042',
    fullParentPathName: 'Department of Homeland Security',
    fullParentPathCode: 'DHS',
    postedDate: '2024-11-20',
    type: 'Sources Sought',
    baseType: 'Sources Sought',
    archiveType: 'autocustom',
    archiveDate: '2025-03-01',
    typeOfSetAside: 'SBA',
    typeOfSetAsideDescription: 'Small Business',
    responseDeadLine: '2024-12-20T16:00:00-05:00',
    naicsCode: '541519',
    naicsDescription: 'Other Computer Related Services',
    classificationCode: 'D',
    active: 'Yes',
    pointOfContact: [
      {
        fullName: 'Michael Torres',
        email: 'm.torres@dhs.gov',
        phone: '202-555-0202',
        title: 'Contract Specialist',
        type: 'primary',
      },
    ],
    description:
      'DHS is conducting market research to identify qualified small businesses capable of providing comprehensive cybersecurity assessment services including vulnerability scanning, penetration testing, red team exercises, and NIST 800-53 compliance auditing across DHS component agencies.',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'Washington',
      state: 'DC',
      zipcode: '20528',
      countryCode: 'USA',
    },
    placeOfPerformance: {
      city: { name: 'Washington', code: 'Washington' },
      state: { name: 'District of Columbia', code: 'DC' },
      country: { name: 'United States', code: 'USA' },
    },
    uiLink: 'https://sam.gov/opp/mock-002',
  },
  {
    noticeId: 'mock-003',
    title: 'Facility Renovation and Construction — Building 12 Upgrades',
    solicitationNumber: 'ARMY-2024-CONST-187',
    fullParentPathName: 'Department of the Army',
    fullParentPathCode: 'ARMY',
    postedDate: '2024-11-10',
    type: 'Combined Synopsis/Solicitation',
    baseType: 'Combined Synopsis/Solicitation',
    archiveType: 'autocustom',
    archiveDate: '2025-04-01',
    typeOfSetAside: 'HZC',
    typeOfSetAsideDescription: 'HUBZone',
    responseDeadLine: '2025-01-30T15:00:00-05:00',
    naicsCode: '236220',
    naicsDescription: 'Commercial and Institutional Building Construction',
    classificationCode: 'Z',
    active: 'Yes',
    pointOfContact: [
      {
        fullName: 'Col. Patricia Hayes',
        email: 'patricia.hayes@army.mil',
        phone: '910-555-0303',
        title: 'Contracting Officer',
        type: 'primary',
      },
      {
        fullName: 'James Liu',
        email: 'james.liu@army.mil',
        phone: '910-555-0304',
        title: 'Project Manager',
        type: 'secondary',
      },
    ],
    description:
      'The U.S. Army Corps of Engineers seeks a qualified HUBZone contractor to perform renovations to Building 12 at Fort Bragg, NC. Work includes HVAC replacement, electrical system upgrades, ADA compliance improvements, interior renovation of 45,000 sq ft administrative space, and exterior facade restoration.',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'Fort Bragg',
      state: 'NC',
      zipcode: '28310',
      countryCode: 'USA',
    },
    placeOfPerformance: {
      city: { name: 'Fort Bragg', code: 'Fort Bragg' },
      state: { name: 'North Carolina', code: 'NC' },
      country: { name: 'United States', code: 'USA' },
    },
    uiLink: 'https://sam.gov/opp/mock-003',
  },
  {
    noticeId: 'mock-004',
    title: 'Healthcare Staffing Services — Registered Nurses and Allied Health',
    solicitationNumber: 'HHS-2024-MED-205',
    fullParentPathName: 'Department of Health and Human Services',
    fullParentPathCode: 'HHS',
    postedDate: '2024-11-18',
    type: 'Request for Proposal',
    baseType: 'Request for Proposal',
    archiveType: 'autocustom',
    archiveDate: '2025-03-15',
    typeOfSetAside: 'WOSB',
    typeOfSetAsideDescription: 'Women-Owned Small Business',
    responseDeadLine: '2025-01-10T17:00:00-05:00',
    naicsCode: '621111',
    naicsDescription: 'Offices of Physicians (except Mental Health Specialists)',
    classificationCode: 'Q',
    active: 'Yes',
    pointOfContact: [
      {
        fullName: 'Dr. Angela Brooks',
        email: 'a.brooks@hhs.gov',
        phone: '301-555-0404',
        title: 'Medical Contracting Officer',
        type: 'primary',
      },
    ],
    description:
      'HHS Indian Health Service requires temporary staffing services for Registered Nurses, Licensed Practical Nurses, and Allied Health professionals at 8 IHS facilities in the Southwest region. WOSB set-aside. 3-year base period with two 1-year options. Must meet Joint Commission staffing standards.',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'Rockville',
      state: 'MD',
      zipcode: '20857',
      countryCode: 'USA',
    },
    placeOfPerformance: {
      state: { name: 'New Mexico', code: 'NM' },
      country: { name: 'United States', code: 'USA' },
    },
    uiLink: 'https://sam.gov/opp/mock-004',
  },
  {
    noticeId: 'mock-005',
    title: 'Cloud Migration and DevOps Engineering Support',
    solicitationNumber: 'GSA-2024-CLOUD-093',
    fullParentPathName: 'General Services Administration',
    fullParentPathCode: 'GSA',
    postedDate: '2024-11-22',
    type: 'Sources Sought',
    baseType: 'Sources Sought',
    archiveType: 'autocustom',
    archiveDate: '2025-02-22',
    typeOfSetAside: '8AN',
    typeOfSetAsideDescription: '8(a) Program',
    responseDeadLine: '2024-12-30T16:00:00-05:00',
    naicsCode: '541511',
    naicsDescription: 'Custom Computer Programming Services',
    classificationCode: 'D',
    active: 'Yes',
    pointOfContact: [
      {
        fullName: 'Robert Kim',
        email: 'r.kim@gsa.gov',
        phone: '202-555-0505',
        title: 'IT Contracting Officer',
        type: 'primary',
      },
    ],
    description:
      'GSA 18F is seeking 8(a) firms with demonstrated AWS GovCloud and Azure Government expertise to support cloud migration of legacy federal systems. Required skills: Kubernetes, Terraform, CI/CD pipelines, FedRAMP authorization support, and Agile delivery. 2-year performance period.',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'Washington',
      state: 'DC',
      zipcode: '20405',
      countryCode: 'USA',
    },
    placeOfPerformance: {
      city: { name: 'Washington', code: 'Washington' },
      state: { name: 'District of Columbia', code: 'DC' },
      country: { name: 'United States', code: 'USA' },
    },
    uiLink: 'https://sam.gov/opp/mock-005',
  },
  {
    noticeId: 'mock-006',
    title: 'Environmental Remediation Services — Former Industrial Site',
    solicitationNumber: 'EPA-2024-ENV-312',
    fullParentPathName: 'Environmental Protection Agency',
    fullParentPathCode: 'EPA',
    postedDate: '2024-11-05',
    type: 'Presolicitation',
    baseType: 'Presolicitation',
    archiveType: 'autocustom',
    archiveDate: '2025-05-01',
    typeOfSetAside: 'SBA',
    typeOfSetAsideDescription: 'Small Business',
    responseDeadLine: '2025-02-05T17:00:00-05:00',
    naicsCode: '562910',
    naicsDescription: 'Remediation Services',
    classificationCode: 'F',
    active: 'Yes',
    pointOfContact: [
      {
        fullName: 'Lisa Patel',
        email: 'patel.lisa@epa.gov',
        phone: '312-555-0606',
        title: 'Contracting Officer Representative',
        type: 'primary',
      },
    ],
    description:
      'The EPA Superfund program requires environmental remediation services at a former manufacturing site in Gary, Indiana. Scope includes soil excavation and disposal, groundwater monitoring and treatment, vapor intrusion mitigation, site characterization, and 5-year long-term monitoring.',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'Chicago',
      state: 'IL',
      zipcode: '60604',
      countryCode: 'USA',
    },
    placeOfPerformance: {
      city: { name: 'Gary', code: 'Gary' },
      state: { name: 'Indiana', code: 'IN' },
      country: { name: 'United States', code: 'USA' },
    },
    uiLink: 'https://sam.gov/opp/mock-006',
  },
  {
    noticeId: 'mock-007',
    title: 'Professional Training and Development — Leadership Programs',
    solicitationNumber: 'DOD-2024-TRAIN-078',
    fullParentPathName: 'Department of Defense',
    fullParentPathCode: 'DOD',
    postedDate: '2024-11-25',
    type: 'Combined Synopsis/Solicitation',
    baseType: 'Combined Synopsis/Solicitation',
    archiveType: 'autocustom',
    archiveDate: '2025-03-25',
    typeOfSetAside: 'VOSB',
    typeOfSetAsideDescription: 'Veteran-Owned Small Business',
    responseDeadLine: '2025-01-25T15:00:00-05:00',
    naicsCode: '611430',
    naicsDescription: 'Professional and Management Development Training',
    classificationCode: 'U',
    active: 'Yes',
    pointOfContact: [
      {
        fullName: 'Cmdr. David Washington',
        email: 'd.washington@pentagon.mil',
        phone: '703-555-0707',
        title: 'Contracting Officer',
        type: 'primary',
      },
    ],
    description:
      'The Department of Defense seeks a Veteran-Owned Small Business to deliver leadership development and executive training programs for GS-13 through SES-level civilian personnel. Curriculum must include change management, strategic communication, emotional intelligence, and interagency collaboration modules. Hybrid delivery (in-person DC + virtual).',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'Arlington',
      state: 'VA',
      zipcode: '22202',
      countryCode: 'USA',
    },
    placeOfPerformance: {
      city: { name: 'Arlington', code: 'Arlington' },
      state: { name: 'Virginia', code: 'VA' },
      country: { name: 'United States', code: 'USA' },
    },
    uiLink: 'https://sam.gov/opp/mock-007',
  },
  {
    noticeId: 'mock-008',
    title: 'Janitorial and Custodial Services — Federal Office Complex',
    solicitationNumber: 'GSA-2024-FAC-441',
    fullParentPathName: 'General Services Administration',
    fullParentPathCode: 'GSA',
    postedDate: '2024-11-12',
    type: 'Request for Proposal',
    baseType: 'Request for Proposal',
    archiveType: 'autocustom',
    archiveDate: '2025-04-12',
    typeOfSetAside: 'SBA',
    typeOfSetAsideDescription: 'Small Business',
    responseDeadLine: '2025-01-12T17:00:00-05:00',
    naicsCode: '561720',
    naicsDescription: 'Janitorial Services',
    classificationCode: 'S',
    active: 'Yes',
    pointOfContact: [
      {
        fullName: 'Maria Gonzalez',
        email: 'm.gonzalez@gsa.gov',
        phone: '404-555-0808',
        title: 'Contract Specialist',
        type: 'primary',
      },
    ],
    description:
      'GSA Public Buildings Service requires daily and periodic janitorial services for the Sam Nunn Atlanta Federal Center, a 1.8 million square foot complex housing 15 federal agencies. Services include daily cleaning, floor care, window washing, restroom sanitation, recycling management, and event support.',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'Atlanta',
      state: 'GA',
      zipcode: '30303',
      countryCode: 'USA',
    },
    placeOfPerformance: {
      city: { name: 'Atlanta', code: 'Atlanta' },
      state: { name: 'Georgia', code: 'GA' },
      country: { name: 'United States', code: 'USA' },
    },
    uiLink: 'https://sam.gov/opp/mock-008',
  },
  {
    noticeId: 'mock-009',
    title: 'Data Analytics Platform Development and Integration',
    solicitationNumber: 'DOT-2024-DATA-156',
    fullParentPathName: 'Department of Transportation',
    fullParentPathCode: 'DOT',
    postedDate: '2024-11-28',
    type: 'Sources Sought',
    baseType: 'Sources Sought',
    archiveType: 'autocustom',
    archiveDate: '2025-02-28',
    typeOfSetAside: 'EDWOSB',
    typeOfSetAsideDescription: 'Economically Disadvantaged Women-Owned Small Business',
    responseDeadLine: '2024-12-28T16:00:00-05:00',
    naicsCode: '541512',
    naicsDescription: 'Computer Systems Design Services',
    classificationCode: 'D',
    active: 'Yes',
    pointOfContact: [
      {
        fullName: 'Jennifer Park',
        email: 'j.park@dot.gov',
        phone: '202-555-0909',
        title: 'Technology Contracting Officer',
        type: 'primary',
      },
    ],
    description:
      'The Federal Highway Administration seeks an EDWOSB with expertise in big data analytics, transportation modeling, and real-time data visualization. The platform will integrate traffic sensor data, incident reports, weather feeds, and construction schedules to support national highway performance management. Must have FedRAMP High experience.',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'Washington',
      state: 'DC',
      zipcode: '20590',
      countryCode: 'USA',
    },
    placeOfPerformance: {
      city: { name: 'Washington', code: 'Washington' },
      state: { name: 'District of Columbia', code: 'DC' },
      country: { name: 'United States', code: 'USA' },
    },
    uiLink: 'https://sam.gov/opp/mock-009',
  },
  {
    noticeId: 'mock-010',
    title: 'Logistics and Supply Chain Management Support',
    solicitationNumber: 'NAVY-2024-LOG-289',
    fullParentPathName: 'Department of the Navy',
    fullParentPathCode: 'NAVY',
    postedDate: '2024-11-08',
    type: 'Combined Synopsis/Solicitation',
    baseType: 'Combined Synopsis/Solicitation',
    archiveType: 'autocustom',
    archiveDate: '2025-04-08',
    typeOfSetAside: 'SDVOSBC',
    typeOfSetAsideDescription: 'Service-Disabled Veteran-Owned Small Business',
    responseDeadLine: '2025-01-08T15:00:00-05:00',
    naicsCode: '541614',
    naicsDescription: 'Process, Physical Distribution, and Logistics Consulting Services',
    classificationCode: 'R',
    active: 'Yes',
    pointOfContact: [
      {
        fullName: 'Capt. Thomas Reed',
        email: 't.reed@navy.mil',
        phone: '619-555-1010',
        title: 'Contracting Officer',
        type: 'primary',
      },
    ],
    description:
      'Naval Supply Systems Command requires logistics consulting support to optimize supply chain operations across Pacific Fleet installations. Services include inventory analysis, demand forecasting, warehouse optimization, transportation routing, and implementation of ERP supply chain modules. Secret clearance required.',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'San Diego',
      state: 'CA',
      zipcode: '92132',
      countryCode: 'USA',
    },
    placeOfPerformance: {
      city: { name: 'San Diego', code: 'San Diego' },
      state: { name: 'California', code: 'CA' },
      country: { name: 'United States', code: 'USA' },
    },
    uiLink: 'https://sam.gov/opp/mock-010',
  },
]

export const MOCK_AWARDS: Opportunity[] = [
  {
    noticeId: 'mock-award-001',
    title: 'Enterprise Software License Management',
    solicitationNumber: 'GSA-2023-SW-112',
    fullParentPathName: 'General Services Administration',
    fullParentPathCode: 'GSA',
    postedDate: '2024-08-15',
    type: 'Award Notice',
    baseType: 'Award Notice',
    archiveType: 'autocustom',
    archiveDate: '2025-08-15',
    typeOfSetAside: 'SBA',
    typeOfSetAsideDescription: 'Small Business',
    naicsCode: '511210',
    naicsDescription: 'Software Publishers',
    classificationCode: 'D',
    active: 'No',
    award: {
      date: '2024-08-15',
      number: 'GS-35F-0001AA',
      amount: '4200000',
      awardee: {
        name: 'TechSolutions Federal LLC',
        ueiSAM: 'ABCDEF123456',
        location: {
          city: { name: 'McLean', code: 'McLean' },
          state: { name: 'Virginia', code: 'VA' },
          country: { name: 'United States', code: 'USA' },
        },
      },
    },
    description:
      'Enterprise software license management and optimization services for GSA. Includes Microsoft 365 license tracking, Adobe Creative Cloud management, and security software compliance monitoring.',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'Washington',
      state: 'DC',
      zipcode: '20405',
      countryCode: 'USA',
    },
    uiLink: 'https://sam.gov/opp/mock-award-001',
  },
  {
    noticeId: 'mock-award-002',
    title: 'Medical Equipment Maintenance and Biomedical Engineering',
    solicitationNumber: 'VA-2023-MED-445',
    fullParentPathName: 'Department of Veterans Affairs',
    fullParentPathCode: 'VA',
    postedDate: '2024-07-01',
    type: 'Award Notice',
    baseType: 'Award Notice',
    archiveType: 'autocustom',
    archiveDate: '2025-07-01',
    typeOfSetAside: 'SDVOSBC',
    typeOfSetAsideDescription: 'Service-Disabled Veteran-Owned Small Business',
    naicsCode: '811219',
    naicsDescription: 'Other Electronic and Precision Equipment Repair and Maintenance',
    classificationCode: 'J',
    active: 'No',
    award: {
      date: '2024-07-01',
      number: 'VA-244-24-C-0087',
      amount: '8750000',
      awardee: {
        name: 'Veterans Biomedical Services Inc.',
        ueiSAM: 'GHIJKL789012',
        location: {
          city: { name: 'Richmond', code: 'Richmond' },
          state: { name: 'Virginia', code: 'VA' },
          country: { name: 'United States', code: 'USA' },
        },
      },
    },
    description:
      'Preventive maintenance, repair, and calibration services for medical equipment including MRI systems, CT scanners, ultrasound equipment, and patient monitoring systems at 12 VA medical centers.',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'Washington',
      state: 'DC',
      zipcode: '20420',
      countryCode: 'USA',
    },
    uiLink: 'https://sam.gov/opp/mock-award-002',
  },
  {
    noticeId: 'mock-award-003',
    title: 'Cybersecurity Operations Center (SOC) Services',
    solicitationNumber: 'DHS-2023-SOC-067',
    fullParentPathName: 'Department of Homeland Security',
    fullParentPathCode: 'DHS',
    postedDate: '2024-06-15',
    type: 'Award Notice',
    baseType: 'Award Notice',
    archiveType: 'autocustom',
    archiveDate: '2025-06-15',
    typeOfSetAside: '8AN',
    typeOfSetAsideDescription: '8(a) Program',
    naicsCode: '541519',
    naicsDescription: 'Other Computer Related Services',
    classificationCode: 'D',
    active: 'No',
    award: {
      date: '2024-06-15',
      number: 'HSHQDC-24-C-00001',
      amount: '12400000',
      awardee: {
        name: 'SecureGov Partners LLC',
        ueiSAM: 'MNOPQR345678',
        location: {
          city: { name: 'Herndon', code: 'Herndon' },
          state: { name: 'Virginia', code: 'VA' },
          country: { name: 'United States', code: 'USA' },
        },
      },
    },
    description:
      '24/7 Security Operations Center services including threat detection, incident response, SIEM management, and vulnerability management for DHS headquarters and component agencies.',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'Washington',
      state: 'DC',
      zipcode: '20528',
      countryCode: 'USA',
    },
    uiLink: 'https://sam.gov/opp/mock-award-003',
  },
  {
    noticeId: 'mock-award-004',
    title: 'Barracks Renovation — Fort Campbell Phase II',
    solicitationNumber: 'ARMY-2023-CONST-234',
    fullParentPathName: 'Department of the Army',
    fullParentPathCode: 'ARMY',
    postedDate: '2024-05-20',
    type: 'Award Notice',
    baseType: 'Award Notice',
    archiveType: 'autocustom',
    archiveDate: '2025-05-20',
    typeOfSetAside: 'HZC',
    typeOfSetAsideDescription: 'HUBZone',
    naicsCode: '236220',
    naicsDescription: 'Commercial and Institutional Building Construction',
    classificationCode: 'Z',
    active: 'No',
    award: {
      date: '2024-05-20',
      number: 'W912LT-24-C-0023',
      amount: '18900000',
      awardee: {
        name: 'Appalachian Federal Builders LLC',
        ueiSAM: 'STUVWX901234',
        location: {
          city: { name: 'Clarksville', code: 'Clarksville' },
          state: { name: 'Tennessee', code: 'TN' },
          country: { name: 'United States', code: 'USA' },
        },
      },
    },
    description:
      'Comprehensive renovation of 6 barracks buildings at Fort Campbell, KY/TN. Work includes complete interior gutting, new MEP systems, energy-efficient windows, accessibility upgrades, and common area modernization.',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'Fort Campbell',
      state: 'KY',
      zipcode: '42223',
      countryCode: 'USA',
    },
    uiLink: 'https://sam.gov/opp/mock-award-004',
  },
  {
    noticeId: 'mock-award-005',
    title: 'Telehealth Platform Development and Support',
    solicitationNumber: 'HHS-2023-TELE-089',
    fullParentPathName: 'Department of Health and Human Services',
    fullParentPathCode: 'HHS',
    postedDate: '2024-09-01',
    type: 'Award Notice',
    baseType: 'Award Notice',
    archiveType: 'autocustom',
    archiveDate: '2025-09-01',
    typeOfSetAside: 'WOSB',
    typeOfSetAsideDescription: 'Women-Owned Small Business',
    naicsCode: '541511',
    naicsDescription: 'Custom Computer Programming Services',
    classificationCode: 'D',
    active: 'No',
    award: {
      date: '2024-09-01',
      number: 'HHSP23320024082C',
      amount: '6300000',
      awardee: {
        name: 'HealthTech Innovations WOSB',
        ueiSAM: 'YZABCD567890',
        location: {
          city: { name: 'Boston', code: 'Boston' },
          state: { name: 'Massachusetts', code: 'MA' },
          country: { name: 'United States', code: 'USA' },
        },
      },
    },
    description:
      'Development and maintenance of a HIPAA-compliant telehealth platform for the Health Resources and Services Administration. Supports rural health clinics, federally qualified health centers, and underserved communities.',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'Rockville',
      state: 'MD',
      zipcode: '20857',
      countryCode: 'USA',
    },
    uiLink: 'https://sam.gov/opp/mock-award-005',
  },
  {
    noticeId: 'mock-award-006',
    title: 'Language Translation and Interpretation Services',
    solicitationNumber: 'DOS-2023-LANG-178',
    fullParentPathName: 'Department of State',
    fullParentPathCode: 'DOS',
    postedDate: '2024-04-10',
    type: 'Award Notice',
    baseType: 'Award Notice',
    archiveType: 'autocustom',
    archiveDate: '2025-04-10',
    typeOfSetAside: 'SBA',
    typeOfSetAsideDescription: 'Small Business',
    naicsCode: '541930',
    naicsDescription: 'Translation and Interpretation Services',
    classificationCode: 'R',
    active: 'No',
    award: {
      date: '2024-04-10',
      number: 'SAQMMA24C0089',
      amount: '3100000',
      awardee: {
        name: 'GlobalVoice Language Services',
        ueiSAM: 'EFGHIJ123456',
        location: {
          city: { name: 'Arlington', code: 'Arlington' },
          state: { name: 'Virginia', code: 'VA' },
          country: { name: 'United States', code: 'USA' },
        },
      },
    },
    description:
      'On-demand and scheduled translation and interpretation services for the State Department in 45 languages. Covers diplomatic correspondence, visa processing, consular operations, and international negotiations.',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'Washington',
      state: 'DC',
      zipcode: '20520',
      countryCode: 'USA',
    },
    uiLink: 'https://sam.gov/opp/mock-award-006',
  },
  {
    noticeId: 'mock-award-007',
    title: 'Air Traffic Control System Maintenance',
    solicitationNumber: 'DOT-2023-ATC-334',
    fullParentPathName: 'Department of Transportation',
    fullParentPathCode: 'DOT',
    postedDate: '2024-10-01',
    type: 'Award Notice',
    baseType: 'Award Notice',
    archiveType: 'autocustom',
    archiveDate: '2025-10-01',
    typeOfSetAside: 'NONE',
    typeOfSetAsideDescription: 'No Set-Aside',
    naicsCode: '488111',
    naicsDescription: 'Air Traffic Control',
    classificationCode: 'J',
    active: 'No',
    award: {
      date: '2024-10-01',
      number: 'DTFAWA24C00012',
      amount: '45000000',
      awardee: {
        name: 'Raytheon Federal Systems',
        ueiSAM: 'KLMNOP789012',
        location: {
          city: { name: 'Falls Church', code: 'Falls Church' },
          state: { name: 'Virginia', code: 'VA' },
          country: { name: 'United States', code: 'USA' },
        },
      },
    },
    description:
      'Preventive and corrective maintenance for FAA en route radar systems, STARS terminal automation systems, and VSCS voice switching at 22 Air Route Traffic Control Centers nationwide.',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'Washington',
      state: 'DC',
      zipcode: '20591',
      countryCode: 'USA',
    },
    uiLink: 'https://sam.gov/opp/mock-award-007',
  },
  {
    noticeId: 'mock-award-008',
    title: 'Workforce Development and Job Training Programs',
    solicitationNumber: 'DOL-2023-WRK-201',
    fullParentPathName: 'Department of Labor',
    fullParentPathCode: 'DOL',
    postedDate: '2024-03-15',
    type: 'Award Notice',
    baseType: 'Award Notice',
    archiveType: 'autocustom',
    archiveDate: '2025-03-15',
    typeOfSetAside: 'SBA',
    typeOfSetAsideDescription: 'Small Business',
    naicsCode: '611710',
    naicsDescription: 'Educational Support Services',
    classificationCode: 'U',
    active: 'No',
    award: {
      date: '2024-03-15',
      number: 'DOL-ETA-24-C-0034',
      amount: '2800000',
      awardee: {
        name: 'Workforce Pathways Inc.',
        ueiSAM: 'QRSTUV345678',
        location: {
          city: { name: 'Chicago', code: 'Chicago' },
          state: { name: 'Illinois', code: 'IL' },
          country: { name: 'United States', code: 'USA' },
        },
      },
    },
    description:
      'Design and delivery of registered apprenticeship programs and on-the-job training for manufacturing, healthcare, and IT sectors serving 500+ participants annually under the Workforce Innovation and Opportunity Act.',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'Washington',
      state: 'DC',
      zipcode: '20210',
      countryCode: 'USA',
    },
    uiLink: 'https://sam.gov/opp/mock-award-008',
  },
  {
    noticeId: 'mock-award-009',
    title: 'Solar Panel Installation — Federal Buildings Program',
    solicitationNumber: 'DOE-2023-SOLAR-456',
    fullParentPathName: 'Department of Energy',
    fullParentPathCode: 'DOE',
    postedDate: '2024-08-20',
    type: 'Award Notice',
    baseType: 'Award Notice',
    archiveType: 'autocustom',
    archiveDate: '2025-08-20',
    typeOfSetAside: 'HZS',
    typeOfSetAsideDescription: 'HUBZone Set-Aside',
    naicsCode: '238210',
    naicsDescription: 'Electrical Contractors and Other Wiring Installation Contractors',
    classificationCode: 'Z',
    active: 'No',
    award: {
      date: '2024-08-20',
      number: 'DE-SC0024567',
      amount: '7600000',
      awardee: {
        name: 'SunBelt Federal Energy LLC',
        ueiSAM: 'WXYZAB901234',
        location: {
          city: { name: 'Phoenix', code: 'Phoenix' },
          state: { name: 'Arizona', code: 'AZ' },
          country: { name: 'United States', code: 'USA' },
        },
      },
    },
    description:
      'Design, procurement, installation, and commissioning of 2.4 MW solar photovoltaic systems on 18 federal buildings in the Southwest region as part of the Federal Buildings Performance Standard initiative.',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'Golden',
      state: 'CO',
      zipcode: '80401',
      countryCode: 'USA',
    },
    uiLink: 'https://sam.gov/opp/mock-award-009',
  },
  {
    noticeId: 'mock-award-010',
    title: 'Records Management and Digital Archiving Services',
    solicitationNumber: 'NARA-2023-REC-099',
    fullParentPathName: 'National Archives and Records Administration',
    fullParentPathCode: 'NARA',
    postedDate: '2024-02-28',
    type: 'Award Notice',
    baseType: 'Award Notice',
    archiveType: 'autocustom',
    archiveDate: '2025-02-28',
    typeOfSetAside: 'SBA',
    typeOfSetAsideDescription: 'Small Business',
    naicsCode: '561410',
    naicsDescription: 'Document Preparation Services',
    classificationCode: 'R',
    active: 'No',
    award: {
      date: '2024-02-28',
      number: 'NARA-24-C-0012',
      amount: '1950000',
      awardee: {
        name: 'Digital Archives Group',
        ueiSAM: 'CDEFGH567890',
        location: {
          city: { name: 'College Park', code: 'College Park' },
          state: { name: 'Maryland', code: 'MD' },
          country: { name: 'United States', code: 'USA' },
        },
      },
    },
    description:
      'Digitization, metadata tagging, quality control, and electronic records management for NARA. Scope includes 8 million pages of historical documents, born-digital records migration, and long-term preservation system support.',
    organizationType: 'FEDERAL_AGENCY',
    officeAddress: {
      city: 'College Park',
      state: 'MD',
      zipcode: '20740',
      countryCode: 'USA',
    },
    uiLink: 'https://sam.gov/opp/mock-award-010',
  },
]

export function getMockOpportunitiesResponse(
  filters: { keyword?: string; naicsCode?: string; typeOfSetAside?: string; agency?: string } = {}
): SAMOpportunitiesResponse {
  let results = [...MOCK_OPPORTUNITIES]

  if (filters.keyword) {
    const kw = filters.keyword.toLowerCase()
    results = results.filter(
      (o) =>
        o.title.toLowerCase().includes(kw) ||
        o.description?.toLowerCase().includes(kw) ||
        o.naicsDescription?.toLowerCase().includes(kw)
    )
  }
  if (filters.naicsCode) {
    results = results.filter((o) => o.naicsCode?.startsWith(filters.naicsCode!))
  }
  if (filters.typeOfSetAside) {
    results = results.filter((o) => o.typeOfSetAside === filters.typeOfSetAside)
  }
  if (filters.agency) {
    const ag = filters.agency.toLowerCase()
    results = results.filter((o) => o.fullParentPathName?.toLowerCase().includes(ag))
  }

  return { totalRecords: results.length, opportunitiesData: results }
}

export function getMockAwardsResponse(
  filters: { keyword?: string; naicsCode?: string; agency?: string } = {}
): SAMOpportunitiesResponse {
  let results = [...MOCK_AWARDS]

  if (filters.keyword) {
    const kw = filters.keyword.toLowerCase()
    results = results.filter(
      (o) =>
        o.title.toLowerCase().includes(kw) ||
        o.description?.toLowerCase().includes(kw) ||
        o.naicsDescription?.toLowerCase().includes(kw)
    )
  }
  if (filters.naicsCode) {
    results = results.filter((o) => o.naicsCode?.startsWith(filters.naicsCode!))
  }
  if (filters.agency) {
    const ag = filters.agency.toLowerCase()
    results = results.filter((o) => o.fullParentPathName?.toLowerCase().includes(ag))
  }

  return { totalRecords: results.length, opportunitiesData: results }
}

export function getMockOpportunityById(id: string): Opportunity | undefined {
  return [...MOCK_OPPORTUNITIES, ...MOCK_AWARDS].find((o) => o.noticeId === id)
}
