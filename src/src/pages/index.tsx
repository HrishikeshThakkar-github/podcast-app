import { GetStaticProps } from 'next';
import styled from 'styled-components';
import { Page } from '@/components/layout/Page';
import { HeroScene } from '@/components/three/HeroScene';
import { FeaturedCard } from '@/components/episodes/FeaturedCard';
import { EpisodeGrid } from '@/components/episodes/EpisodeGrid';
import { Episode } from '@/types';
import fs from 'fs';
import path from 'path';

interface HomeProps {
  featuredEpisode: Episode | null;
  recentEpisodes: Episode[];
}

const Section = styled.section`
  margin: ${({ theme }) => theme.spacing(8)} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: ${({ theme }) => theme.spacing(4)} 0;
  }
`;

const SectionTitle = styled.h2`
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export default function Home({ featuredEpisode, recentEpisodes }: HomeProps) {
  return (
    <Page
      title="Home"
      description="Welcome to PodSite - Your source for insightful conversations about technology, design, and innovation."
    >
      <HeroScene />
      
      {featuredEpisode && (
        <Section>
          <SectionTitle>Featured Episode</SectionTitle>
          <FeaturedCard episode={featuredEpisode} />
        </Section>
      )}

      {recentEpisodes.length > 0 && (
        <Section>
          <SectionTitle>Recent Episodes</SectionTitle>
          <EpisodeGrid episodes={recentEpisodes} />
        </Section>
      )}
    </Page>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const episodesDir = path.join(process.cwd(), 'data', 'episodes');
    const episodeFiles = fs.readdirSync(episodesDir);
    
    const episodes = episodeFiles
      .filter(filename => filename.endsWith('.json'))
      .map((filename) => {
        const filePath = path.join(episodesDir, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent) as Episode;
      })
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

    const featuredEpisode = episodes.find((episode) => episode.featured) || episodes[0] || null;
    const recentEpisodes = featuredEpisode 
      ? episodes.filter((episode) => episode.id !== featuredEpisode.id).slice(0, 6)
      : episodes.slice(0, 6);

    return {
      props: {
        featuredEpisode,
        recentEpisodes,
      },
    };
  } catch (error) {
    console.error('Error loading episodes:', error);
    return {
      props: {
        featuredEpisode: null,
        recentEpisodes: [],
      },
    };
  }
};
