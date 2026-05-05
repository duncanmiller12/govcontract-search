# govcontract-search

A Next.js app for searching federal contracting opportunities on SAM.gov — without the complexity. Plain-English search, AI-powered NAICS code discovery, and smart filters for set-aside types, agencies, and deadlines.

## Features

- **Search** — keyword search across active opportunities and historical awards via the SAM.gov API
- **Smart filters** — filter by NAICS code, set-aside type, notice type, agency, and posted date
- **NAICS code discovery** — describe your business in plain English; Claude AI suggests the right industry codes
- **Profile** — save your SAM.gov API key and NAICS codes locally (browser localStorage, nothing sent to a server)

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Then edit `.env.local` and add your Anthropic API key (used server-side for NAICS matching):

   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```

3. **SAM.gov API key** — each user enters their own free SAM.gov API key in the Profile page. It is stored in their browser only and never sent to this server. Get one at [sam.gov](https://sam.gov/content/entity-information/registration).

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com)
- [Anthropic Claude API](https://docs.anthropic.com) — NAICS code matching (`/api/naics-match`)
- [SAM.gov Opportunities API v2](https://open.gsa.gov/api/get-opportunities-public-api/) — live contract data

## Deployment

Deploy to [Vercel](https://vercel.com) and set `ANTHROPIC_API_KEY` as an environment variable in the project settings. No database required — user data lives in the browser.
