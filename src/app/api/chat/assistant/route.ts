import { Anthropic } from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { messages, language } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({
        options: [
          "I hear you, and I'm here for you.",
          "That sounds really difficult, how are you holding up?",
          "Thank you for sharing that with me."
        ]
      });
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 500,
      system: `You are coaching a peer supporter. Generate 3 emotionally intelligent responses using validation, reflection, and open-ended curiosity. 
      Keep short. No therapy language. Respond in ${language || 'English'}. 
      Return ONLY a JSON array of 3 strings.`,
      messages: [
        {
          role: 'user',
          content: `Help me respond to this conversation: ${JSON.stringify(messages)}`
        }
      ],
    });

    const result = JSON.parse((response.content[0] as any).text);
    return NextResponse.json({ options: result });
  } catch (error) {
    console.error('Assistant error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
