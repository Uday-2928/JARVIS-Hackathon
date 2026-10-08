import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

const seedOpportunities = [
  {
    title: 'Robotics Hackathon',
    organizer: 'TechSpark Labs',
    event_type: 'hackathon',
    location: 'Bengaluru',
    mode: 'in_person',
    description: 'A 48-hour hackathon focused on building next-generation robotics solutions.',
    source: 'seed',
    source_id: 'seed-robotics-1',
    url: 'https://example.com/robotics-hackathon',
    skills: ['Robotics', 'IoT', 'C++'],
    deadline_days: 7
  },
  {
    title: 'Cloud & DevOps Workshop',
    organizer: 'CloudNest Academy',
    event_type: 'workshop',
    location: 'Online',
    mode: 'online',
    description: 'Learn the fundamentals of Cloud deployment and CI/CD pipelines.',
    source: 'seed',
    source_id: 'seed-cloud-1',
    url: 'https://example.com/cloud-workshop',
    skills: ['AWS', 'Docker', 'Git'],
    deadline_days: 3
  },
  {
    title: 'AI Innovation Challenge',
    organizer: 'NextGen AI',
    event_type: 'competition',
    location: 'Remote',
    mode: 'online',
    description: 'Solve real-world problems using cutting-edge generative AI models.',
    source: 'seed',
    source_id: 'seed-ai-1',
    url: 'https://example.com/ai-challenge',
    skills: ['Python', 'Machine Learning', 'Generative AI'],
    deadline_days: 14
  },
  {
    title: 'Cybersecurity Capture The Flag',
    organizer: 'SecurIT',
    event_type: 'competition',
    location: 'Hybrid',
    mode: 'hybrid',
    description: 'A 24-hour CTF competition testing network security and cryptography skills.',
    source: 'seed',
    source_id: 'seed-cyber-1',
    url: 'https://example.com/cyber-ctf',
    skills: ['Linux', 'Networking', 'Cybersecurity'],
    deadline_days: 5
  },
  {
    title: 'Full Stack Buildathon',
    organizer: 'DevCommunity',
    event_type: 'hackathon',
    location: 'Online',
    mode: 'online',
    description: 'Build a complete scalable web application from scratch over the weekend.',
    source: 'seed',
    source_id: 'seed-fullstack-1',
    url: 'https://example.com/fullstack',
    skills: ['React', 'Node.js', 'PostgreSQL'],
    deadline_days: 10
  }
];

export async function GET() {
  try {
    let count = 0;
    
    for (const opp of seedOpportunities) {
      const deadline = new Date();
      deadline.setDate(deadline.getDate() + opp.deadline_days);
      
      // Insert main opportunity
      const { data, error } = await supabaseAdmin
        .from('opportunities')
        .upsert({
          title: opp.title,
          organizer: opp.organizer,
          event_type: opp.event_type,
          location: opp.location,
          mode: opp.mode,
          description: opp.description,
          source: opp.source,
          source_id: opp.source_id,
          url: opp.url,
          registration_deadline: deadline.toISOString(),
          is_active: true
        }, { onConflict: 'source, source_id' })
        .select()
        .single();
        
      if (error) {
        console.error('Error inserting opportunity:', error);
        continue;
      }
      
      const oppId = data.id;
      
      // Insert skills
      for (const skill of opp.skills) {
        await supabaseAdmin
          .from('opportunity_skills')
          .upsert({
            opportunity_id: oppId,
            skill: skill
          }, { onConflict: 'opportunity_id, skill' });
      }
      
      count++;
    }
    
    return NextResponse.json({ success: true, message: `Seeded ${count} opportunities.` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to seed data.' }, { status: 500 });
  }
}
