import styled from 'styled-components';
import { Episode } from '@/types';
import Link from 'next/link';

interface RelatedEpisodesProps {
  episodes: Episode[];
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.a`
  display: block;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
`;

const Title = styled.h3`
  ${({ theme }) => theme.typography.h3};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Duration = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
`;

export function RelatedEpisodes({ episodes }: RelatedEpisodesProps) {
  return (
    <Grid>
      {episodes.map((episode) => (
        <Link href={`/episodes/${episode.id}`} key={episode.id} passHref>
          <Card>
            <ImageContainer>
              <Image src={episode.thumbnailUrl} alt={episode.title} />
            </ImageContainer>
            <Content>
              <Title>{episode.title}</Title>
              <Duration>{episode.duration}</Duration>
            </Content>
          </Card>
        </Link>
      ))}
    </Grid>
  );
}
