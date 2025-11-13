import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Episode } from '@/types';
import { formatDate, formatDuration } from '@/utils/dateUtils';

interface EpisodeGridProps {
  episodes: Episode[];
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing(4)};
  margin: ${({ theme }) => theme.spacing(4)} 0;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  overflow: hidden;
  transition: transform ${({ theme }) => theme.animation.timing};

  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
`;

const Title = styled.h3`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Description = styled.p`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MetaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing(0.5)} ${({ theme }) => theme.spacing(1.5)};
  border-radius: 12px;
  font-size: 0.75rem;
`;

export function EpisodeGrid({ episodes }: EpisodeGridProps) {
  return (
    <Grid>
      {episodes.map((episode) => (
        <Card key={episode.id}>
          <Link href={`/episodes/${episode.id}`}>
            <ImageContainer>
              <Image
                src={episode.thumbnailUrl}
                alt={episode.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </ImageContainer>
          </Link>
          <Content>
            <Link href={`/episodes/${episode.id}`} style={{ textDecoration: 'none' }}>
              <Title>{episode.title}</Title>
            </Link>
            <Description>{episode.shortDescription}</Description>
            <MetaContainer>
              <span>{formatDate(episode.publishDate)}</span>
              <span>•</span>
              <span>{formatDuration(episode.duration)}</span>
            </MetaContainer>
            <TagList>
              {episode.tags.slice(0, 3).map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagList>
          </Content>
        </Card>
      ))}
    </Grid>
  );
}
