import fs from 'fs';
import path from 'path';
import { Episode } from '../types';

const EPISODE_COUNT = 20;
const OUTPUT_DIR = path.join(process.cwd(), 'data', 'episodes');

const topics = [
  'Web Development',
  'AI and Machine Learning',
  'Design Systems',
  'User Experience',
  'Software Architecture',
];

const tags = [
  'technology',
  'development',
  'design',
  'frontend',
  'backend',
  'ai',
  'ux',
  'architecture',
];

function generateMockEpisode(index: number): Episode {
  const id = `episode-${index + 1}`;
  const topic = topics[Math.floor(Math.random() * topics.length)];
  const episodeTags = tags
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  const durationMinutes = Math.floor(Math.random() * 45) + 15;
  const durationSeconds = Math.floor(Math.random() * 60);
  
  const date = new Date();
  date.setDate(date.getDate() - (index * 7)); // One episode per week
  
  return {
    id,
    title: `${topic} Deep Dive - Episode ${index + 1}`,
    description: `Join us for an in-depth discussion about ${topic.toLowerCase()}. We'll cover the latest trends, best practices, and share expert insights.`,
    shortDescription: `A comprehensive look at ${topic.toLowerCase()} with industry experts.`,
    publishDate: date.toISOString(),
    duration: `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`,
    audioUrl: `/mock/audio/${id}.mp3`,
    imageUrl: `/mock/images/${id}-large.jpg`,
    thumbnailUrl: `/mock/images/${id}-thumb.jpg`,
    featured: index === 0, // Make the latest episode featured
    tags: episodeTags,
    showNotes: `
# ${topic} Deep Dive - Episode ${index + 1}

## Topics Covered

- Latest trends in ${topic}
- Best practices and common pitfalls
- Expert insights and recommendations
- Future predictions and upcoming changes

## Resources Mentioned

- Resource 1: [Example Link](https://example.com)
- Resource 2: [Example Link](https://example.com)
- Resource 3: [Example Link](https://example.com)

## Guest Information

Our guest for this episode is a ${topic} expert with over 10 years of experience.

## Timestamps

- 00:00 - Introduction
- 05:00 - Main Discussion
- 25:00 - Expert Interview
- 40:00 - Wrap Up
    `,
    chapters: [
      {
        title: 'Introduction',
        startTime: 0,
        endTime: 300,
      },
      {
        title: 'Main Discussion',
        startTime: 300,
        endTime: 1500,
      },
      {
        title: 'Expert Interview',
        startTime: 1500,
        endTime: 2400,
      },
      {
        title: 'Wrap Up',
        startTime: 2400,
        endTime: durationMinutes * 60 + durationSeconds,
      },
    ],
  };
}

function generateAllEpisodes() {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Generate episodes
  for (let i = 0; i < EPISODE_COUNT; i++) {
    const episode = generateMockEpisode(i);
    const filePath = path.join(OUTPUT_DIR, `${episode.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(episode, null, 2));
  }

  console.log(`Generated ${EPISODE_COUNT} mock episodes in ${OUTPUT_DIR}`);
}

generateAllEpisodes();
