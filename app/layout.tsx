import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CampusPilot - AI Career & Opportunity Agent',
  description: 'Your personal AI-powered student opportunity and career intelligence platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-on-background font-body-md antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
        {children}
      </body>
    </html>
  );
}
