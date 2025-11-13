import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Episode } from '@/types';
import { formatDate, formatDuration } from '@/utils/dateUtils';

interface FeaturedCardProps {
  episode: Episode;
}

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  overflow: hidden;
  margin: ${({ theme }) => theme.spacing(4)} 0;
  transition: transform ${({ theme }) => theme.animation.timing};

  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 300px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 200px;
  }
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
`;

const Title = styled.h2`
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Description = styled.p`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const MetaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
`;

const TagList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border-radius: 16px;
  font-size: 0.875rem;
`;

const PlayButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: 24px;
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  font-weight: 600;
  cursor: pointer;
  transition: background ${({ theme }) => theme.animation.timing};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

export function FeaturedCard({ episode }: FeaturedCardProps) {
  return (
    <Card>
      <Link href={`/episodes/${episode.id}`}>
        <ImageContainer>
          <Image
            src={episode.imageUrl}
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
        <Description>{episode.description}</Description>
        <MetaContainer>
          <span>{formatDate(episode.publishDate)}</span>
          <span>•</span>
          <span>{formatDuration(episode.duration)}</span>
        </MetaContainer>
        <TagList>
          {episode.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagList>
      </Content>
    </Card>
  );
}
