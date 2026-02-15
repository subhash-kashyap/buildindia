import { Anthropic } from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { message, language } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      // Mock for prototype testing
      const isProblematic = message.toLowerCase().includes('just') || message.toLowerCase().includes('should');
      return NextResponse.json({
        tone: isProblematic ? 'Dismissive' : 'Supportive',
        risk_level: 0,
        suggestions: isProblematic ? [
          "I hear you, tell me more about that.",
          "It makes sense that you feel this way.",
          "I'm here for you and I'm listening."
        ] : [],
        block: isProblematic,
        safety_flag: false
      });
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      system: `You are a message safety and empathy evaluator for a peer support app. 
      Evaluate the outgoing message. 
      Classify tone as: supportive, neutral, advice-heavy, dismissive, moralizing, invalidating, unsafe. 
      Respond in ${language || 'English'}.
      If problematic (dismissive, advice-heavy, unsafe), suggest 3 improved alternatives preserving intent but improving emotional safety. 
      Return ONLY a JSON object with fields: "tone", "safety_flag" (boolean), "suggestions" (array of strings), "block" (boolean).`,
      messages: [
        {
          role: 'user',
          content: `Evaluate this message: "${message}"`
        }
      ],
    });

    const result = JSON.parse((response.content[0] as any).text);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Classification error:', error);
    return NextResponse.json({ error: 'Failed to classify' }, { status: 500 });
  }
}
