import { useState } from 'react';
import styled from 'styled-components';
import { Episode } from '@/types';
import ReactMarkdown from 'react-markdown';

interface EpisodeDetailProps {
  episode: Episode;
}

const DetailContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing(2)};
  }
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.h1};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const MetaInfo = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const Description = styled.div`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const ShowNotes = styled.div`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.colors.text.primary};

  h2 {
    ${({ theme }) => theme.typography.h2};
    margin: ${({ theme }) => theme.spacing(3)} 0 ${({ theme }) => theme.spacing(2)};
  }

  h3 {
    ${({ theme }) => theme.typography.h3};
    margin: ${({ theme }) => theme.spacing(2)} 0 ${({ theme }) => theme.spacing(1)};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }

  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    padding-left: ${({ theme }) => theme.spacing(3)};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Categories = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const Category = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.inverse};
  padding: ${({ theme }) => theme.spacing(0.5)} ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.875rem;
`;

export function EpisodeDetail({ episode }: EpisodeDetailProps) {
  const [showFullNotes, setShowFullNotes] = useState(false);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <DetailContainer>
      <Title>{episode.title}</Title>
      
      <MetaInfo>
        <MetaItem>
          <span>Published:</span>
          <span>{formatDate(episode.publishDate)}</span>
        </MetaItem>
        <MetaItem>
          <span>Duration:</span>
          <span>{episode.duration}</span>
        </MetaItem>
      </MetaInfo>

      <Description>{episode.description}</Description>

      <ShowNotes>
        <h2>Show Notes</h2>
        <ReactMarkdown>
          {showFullNotes ? episode.showNotes : `${episode.showNotes.slice(0, 500)}...`}
        </ReactMarkdown>
        {episode.showNotes.length > 500 && (
          <button onClick={() => setShowFullNotes(!showFullNotes)}>
            {showFullNotes ? 'Show Less' : 'Show More'}
          </button>
        )}
      </ShowNotes>

      <Categories>
        {episode.categories.map((category) => (
          <Category key={category}>{category}</Category>
        ))}
      </Categories>
    </DetailContainer>
  );
}
