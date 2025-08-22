import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { MODEL } from '@/app/config/constants';
import { InputValidator, ServerRateLimiter } from '@/app/lib/utils/api-helpers';

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Server-side rate limiting
    if (!ServerRateLimiter.checkLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const { action, topic, text, tone, notes } = await request.json();

    const textInputs = `topic: ${topic};
      text: ${text};
      tone: ${tone};
      notes: ${notes};
      `;

    // Enhanced validation
    const textValidation = InputValidator.validateText(textInputs, 2000);
    if (!textValidation.isValid) {
      return NextResponse.json(
        { error: textValidation.error },
        { status: 400 }
      );
    }

    // Environment validation
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OpenAI API key not configured');
      return NextResponse.json(
        { error: 'Translation service temporarily unavailable' },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey,
    });

    // Enhanced content moderation
    const moderatedText = await client.moderations.create({
      input: textInputs,
    });

    const { flagged, categories } = moderatedText.results[0];

    if (flagged) {
      const keys: string[] = Object.keys(categories);
      const flaggedCategories = keys.filter(
        (key: string) => categories[key as keyof typeof categories]
      );
      return NextResponse.json(
        {
          error: `Content flagged as inappropriate: ${flaggedCategories.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const instructions: string = `You are an expert blog writer. Given a topic, create an engaging and insightful blog post. Return plain text only unless asked for markdown. Keep paragraphs short (2-4 sentences).`;

    const user = (() => {
      switch (action) {
        case 'outline':
          return `Create a 6-10 bullet outline for a blog post on: "${topic}".`;
        case 'title':
          return `Suggest 8 blog post titles (and a slug) for: "${topic}". Output as lines: "Title — slug".`;
        case 'expand':
          return `Continue and expand this section (150-250 words), keeping style consistent:\n\n${text}`;
        case 'rewrite':
          return `Rewrite the following in a ${tone ?? 'friendly, clear'} tone. Keep technical accuracy:\n\n${text}`;
        case 'summary':
          return `Write a 1-paragraph summary and 5 SEO bullet points for this post:\n\n${text}`;
        default:
          return `Given notes, propose an outline and intro:\n${notes ?? topic}`;
      }
    })();

    const response = await client.responses.create({
      model: MODEL,
      instructions,
      input: user,
    });

    if (response.status !== 'completed') {
      throw new Error(`Responses API error: ${response.status}`);
    }

    return NextResponse.json({
      response: response.output_text || 'Response recieved',
      originalInput: {
        action: action,
        topic: topic,
        text: text,
        tone: tone,
        notes: notes,
      },
      remainingRequests: ServerRateLimiter.getRemaining(ip),
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'OpenAI failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
