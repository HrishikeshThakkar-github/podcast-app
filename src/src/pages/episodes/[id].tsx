import { GetStaticPaths, GetStaticProps } from 'next';
import styled from 'styled-components';
import { Page } from '@/components/layout/Page';
import { AudioPlayer } from '@/components/player/AudioPlayer';
import { EpisodeDetail } from '@/components/episodes/EpisodeDetail';
import { RelatedEpisodes } from '@/components/episodes/RelatedEpisodes';
import { Episode } from '@/types';
import { ShareButtons } from '@/components/common/ShareButtons';
import fs from 'fs';
import path from 'path';

interface EpisodePageProps {
  episode: Episode;
  relatedEpisodes: Episode[];
}

const EpisodeContainer = styled.article`
  max-width: ${({ theme }) => theme.layout.contentWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing(2)};
  }
`;

const Section = styled.section`
  margin: ${({ theme }) => theme.spacing(6)} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: ${({ theme }) => theme.spacing(4)} 0;
  }
`;

const SectionTitle = styled.h2`
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export default function EpisodePage({ episode, relatedEpisodes }: EpisodePageProps) {
  return (
    <Page
      title={episode.title}
      description={episode.description}
      image={episode.coverImage}
    >
      <EpisodeContainer>
        <AudioPlayer
          audioUrl={episode.audioUrl}
          title={episode.title}
          duration={episode.duration}
        />
        
      <Section>
        <EpisodeDetail episode={episode} />
        <ShareButtons
          url={`${process.env.NEXT_PUBLIC_SITE_URL}/episodes/${episode.id}`}
          title={episode.title}
        />
      </Section>        <Section>
          <SectionTitle>Related Episodes</SectionTitle>
          <RelatedEpisodes episodes={relatedEpisodes} />
        </Section>
      </EpisodeContainer>
    </Page>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const episodesDir = path.join(process.cwd(), 'data', 'episodes');
  const episodeFiles = fs.readdirSync(episodesDir);

  const paths = episodeFiles.map((filename) => ({
    params: { id: filename.replace('.json', '') },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<EpisodePageProps> = async ({ params }) => {
  const episodesDir = path.join(process.cwd(), 'data', 'episodes');
  const episodeContent = fs.readFileSync(
    path.join(episodesDir, `${params?.id}.json`),
    'utf-8'
  );
  const episode = JSON.parse(episodeContent) as Episode;

  // Get all episodes for finding related ones
  const episodeFiles = fs.readdirSync(episodesDir);
  const allEpisodes = episodeFiles
    .map((filename) => {
      const filePath = path.join(episodesDir, filename);
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as Episode;
    })
    .filter((ep) => ep.id !== episode.id);

  // Find related episodes based on shared categories
  const relatedEpisodes = allEpisodes
    .filter((ep) => 
      ep.categories.some((cat) => episode.categories.includes(cat))
    )
    .slice(0, 3);

  return {
    props: {
      episode,
      relatedEpisodes,
    },
  };
};
