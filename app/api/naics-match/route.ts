import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { NAICS_CODES } from '@/lib/naicsCodes'
import type { NAICSMatch } from '@/lib/types'

const client = new Anthropic()

const SYSTEM_PROMPT = `You are a government contracting specialist with deep expertise in NAICS (North American Industry Classification System) codes. Your job is to analyze a business description and identify the most relevant NAICS codes for federal government contracting.

You will be given:
1. A list of available NAICS codes (code + title)
2. A business description from a small business owner

Return a JSON array of the top 5-8 most relevant NAICS codes. For each match include:
- code: the 6-digit NAICS code (string)
- title: the official NAICS title
- reason: a plain-English explanation (1-2 sentences) of why this code fits the business, written for someone unfamiliar with government contracting
- confidence: "high", "medium", or "low"

Rules:
- Only return codes from the provided list
- Sort by confidence (high first)
- Be generous: include adjacent codes the business could plausibly qualify for
- Focus on codes that appear frequently in federal procurement
- Return ONLY valid JSON with no markdown, no code fences, no explanation

Example format:
[{"code":"541511","title":"Custom Computer Programming Services","reason":"Your software development work fits directly under this code, which covers custom application development for clients.","confidence":"high"}]`

export async function POST(request: NextRequest) {
  try {
    const { description } = await request.json()

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return NextResponse.json({ error: 'Business description is required (min 10 characters)' }, { status: 400 })
    }

    const naicsListText = NAICS_CODES.map((c) => `${c.code}: ${c.title}`).join('\n')

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [
        {
          role: 'user',
          content: `Available NAICS codes:\n${naicsListText}\n\nBusiness description:\n${description.trim()}`,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      return NextResponse.json({ error: 'Unexpected response from AI' }, { status: 500 })
    }

    let matches: NAICSMatch[]
    try {
      matches = JSON.parse(content.text)
    } catch {
      return NextResponse.json({ error: 'Failed to parse AI response as JSON' }, { status: 500 })
    }

    if (!Array.isArray(matches)) {
      return NextResponse.json({ error: 'Unexpected AI response format' }, { status: 500 })
    }

    return NextResponse.json({ matches })
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json({ error: `AI service error: ${error.message}` }, { status: 502 })
    }
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
