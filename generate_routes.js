const fs = require('fs');
const path = require('path');

const routes = [
  { path: 'opportunities', title: 'My Opportunities' },
  { path: 'campus-drives', title: 'Campus Drives' },
  { path: 'internships', title: 'Internships' },
  { path: 'hackathons', title: 'Hackathons' },
  { path: 'training', title: 'Training & Prep' },
  { path: 'skill-gap', title: 'Skill Gap Analysis' },
  { path: 'applications', title: 'My Applications' },
  { path: 'deadlines', title: 'Deadlines & Calendar' },
  { path: 'notifications', title: 'Notifications' },
  { path: 'settings', title: 'Settings' }
];

const basePath = path.join(__dirname, 'app', 'student');

routes.forEach(route => {
  const dirPath = path.join(basePath, route.path);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const fileContent = `import React from 'react';
import ComingSoonPage from '@/components/ComingSoonPage';

export default function Page() {
  return <ComingSoonPage title="${route.title}" />;
}
`;

  fs.writeFileSync(path.join(dirPath, 'page.tsx'), fileContent);
});

console.log('All placeholder routes created!');
