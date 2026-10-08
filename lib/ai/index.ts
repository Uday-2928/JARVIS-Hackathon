export interface ExtractedEventMetadata {
  skills: string[];
  technologies: string[];
  domains: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'unknown';
  event_type: 'hackathon' | 'workshop' | 'competition' | 'internship' | 'conference' | 'training' | 'campus_drive' | 'other';
  mode: 'online' | 'in_person' | 'hybrid' | 'unknown';
  eligibility: string[];
  team_size_min: number | null;
  team_size_max: number | null;
  experience_requirements: string[];
  education_requirements: string[];
  industry: string[];
  prize_available: boolean;
  prize_summary: string | null;
}

export interface AIProvider {
  extractMetadata(text: string): Promise<ExtractedEventMetadata>;
  generateEmbeddings(text: string): Promise<number[]>;
}

export class OpenAIProvider implements AIProvider {
  private apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async extractMetadata(text: string): Promise<ExtractedEventMetadata> {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        response_format: { type: "json_object" },
        messages: [
          { role: 'system', content: 'You are an AI that extracts event metadata into JSON. Output exactly the requested schema keys.' },
          { role: 'user', content: `Extract metadata from this text:\n\n${text}` }
        ]
      })
    });
    if (!res.ok) throw new Error('OpenAI extraction failed');
    const data = await res.json();
    return JSON.parse(data.choices[0].message.content);
  }

  async generateEmbeddings(text: string): Promise<number[]> {
    const res = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small',
        input: text
      })
    });
    if (!res.ok) throw new Error('OpenAI embedding failed');
    const data = await res.json();
    return data.data[0].embedding;
  }
}

export class GeminiProvider implements AIProvider {
  private apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async extractMetadata(text: string): Promise<ExtractedEventMetadata> {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Extract metadata into JSON format matching the schema.\n\n${text}` }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });
    if (!res.ok) throw new Error('Gemini extraction failed');
    const data = await res.json();
    return JSON.parse(data.candidates[0].content.parts[0].text);
  }

  async generateEmbeddings(text: string): Promise<number[]> {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'models/text-embedding-004',
        content: { parts: [{ text }] }
      })
    });
    if (!res.ok) throw new Error('Gemini embedding failed');
    const data = await res.json();
    return data.embedding.values;
  }
}

export class DeterministicProvider implements AIProvider {
  async extractMetadata(text: string): Promise<ExtractedEventMetadata> {
    const textLower = text.toLowerCase();
    
    // Simple keyword matching fallback
    const skills = [];
    if (textLower.includes('python')) skills.push('Python');
    if (textLower.includes('react')) skills.push('React');
    if (textLower.includes('c++')) skills.push('C++');
    
    let event_type: any = 'other';
    if (textLower.includes('hackathon')) event_type = 'hackathon';
    else if (textLower.includes('workshop')) event_type = 'workshop';
    
    let mode: any = 'unknown';
    if (textLower.includes('online')) mode = 'online';
    else if (textLower.includes('in-person')) mode = 'in_person';

    return {
      skills,
      technologies: skills,
      domains: [],
      difficulty: 'unknown',
      event_type,
      mode,
      eligibility: [],
      team_size_min: null,
      team_size_max: null,
      experience_requirements: [],
      education_requirements: [],
      industry: [],
      prize_available: textLower.includes('prize'),
      prize_summary: null
    };
  }

  async generateEmbeddings(text: string): Promise<number[]> {
    // Generate a pseudo-random zero-vector fallback
    return new Array(1536).fill(0);
  }
}

export function getAIProvider(): AIProvider {
  if (process.env.OPENAI_API_KEY) {
    return new OpenAIProvider(process.env.OPENAI_API_KEY);
  }
  if (process.env.GEMINI_API_KEY) {
    return new GeminiProvider(process.env.GEMINI_API_KEY);
  }
  return new DeterministicProvider();
}
