import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const query = searchParams.get('query');

  try {
    let dbQuery = supabase
      .from('opportunities')
      .select('*, opportunity_skills(skill)')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (type) {
      dbQuery = dbQuery.eq('event_type', type);
    }
    
    if (query) {
      dbQuery = dbQuery.ilike('title', `%${query}%`);
    }

    const { data, error } = await dbQuery;

    if (error) {
      console.error('Error fetching opportunities:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Format the skills array
    const formattedData = data.map(opp => ({
      ...opp,
      skills: opp.opportunity_skills.map((s: any) => s.skill)
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
