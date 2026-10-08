const { Client } = require('pg');

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

async function seed() {
  const client = new Client({
    connectionString: 'postgresql://postgres.earfezywynvrzqavqdoz:Uday%40bnp1234@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres'
  });

  try {
    await client.connect();
    console.log('Connected to database');

    for (const opp of seedOpportunities) {
      const deadline = new Date();
      deadline.setDate(deadline.getDate() + opp.deadline_days);

      const res = await client.query(`
        INSERT INTO public.opportunities (title, organizer, event_type, location, mode, description, source, source_id, url, registration_deadline, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (source, source_id) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description
        RETURNING id;
      `, [opp.title, opp.organizer, opp.event_type, opp.location, opp.mode, opp.description, opp.source, opp.source_id, opp.url, deadline, true]);

      const oppId = res.rows[0].id;
      
      for (const skill of opp.skills) {
        await client.query(`
          INSERT INTO public.opportunity_skills (opportunity_id, skill)
          VALUES ($1, $2)
          ON CONFLICT (opportunity_id, skill) DO NOTHING;
        `, [oppId, skill]);
      }
    }

    console.log('Successfully seeded database');
  } catch (err) {
    console.error('Seeding failed', err);
  } finally {
    await client.end();
  }
}

seed();
