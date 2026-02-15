import { Anthropic } from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { messages, intensity, language } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({
        content: "I hear you. It sounds like a lot to carry right now. What's on your mind?",
        escalation: false
      });
    }

    let systemPrompt = `You are a calm, emotionally validating support presence. Do not diagnose. Do not give clinical advice. Reflect, validate, ask gentle open questions. Keep responses under 120 words. Avoid therapy jargon. Respond in ${language || 'English'}.
    
    If the user expresses self-harm, suicidal ideation, or immediate danger: 
    1. Set the field "escalation_required" to true.
    2. Provide a warm, grounding message.
    3. Include Indian crisis resources: Vandrevala Foundation (1860 2662 345), iCall (9152987821).
    
    Return ONLY a JSON object with fields "content" (string) and "escalation_required" (boolean).`;
    
    if (intensity > 70) {
      systemPrompt += " Increase warmth and grounding. The user is feeling overwhelmed.";
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 500,
      system: systemPrompt,
      messages: messages.map((m: any) => ({
        role: m.sender_type === 'user' ? 'user' : 'assistant',
        content: m.content
      })),
    });

    const result = JSON.parse((response.content[0] as any).text);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Support error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
