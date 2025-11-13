import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FAQ } from './Category';
import DOMPurify from 'dompurify';

interface SearchResultsProps {
  results: Array<{
    item: FAQ;
    matches: {
      field: 'question' | 'answer';
      snippet: string;
    }[];
  }>;
  onItemClick: (itemId: string) => void;
}

const ResultsContainer = styled(motion.div)`
  margin-top: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

const ResultItem = styled(motion.button)`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: none;
  padding: ${({ theme }) => theme.spacing(3)};
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.disabled};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing(2)};
  }
`;

const Question = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  font-size: 1rem;
  line-height: 1.4;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.95rem;
    line-height: 1.3;
  }

  mark {
    background: ${({ theme }) => theme.colors.primary}33;
    color: ${({ theme }) => theme.colors.primary};
    padding: 0 4px;
    border-radius: 2px;
  }
`;

const Answer = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.95rem;
  line-height: 1.5;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.9rem;
    line-height: 1.4;
  }

  mark {
    background: ${({ theme }) => theme.colors.primary}22;
    color: ${({ theme }) => theme.colors.primary};
    padding: 0 2px;
    border-radius: 2px;
  }
`;

const ResultsHeader = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.disabled};
`;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export function SearchResults({ results, onItemClick }: SearchResultsProps) {
  const sanitizer = useRef(DOMPurify.sanitize);

  useEffect(() => {
    // Configure DOMPurify to only allow mark tags
    DOMPurify.addHook('afterSanitizeAttributes', (node: Element) => {
      if (node.tagName === 'MARK') {
        node.setAttribute('style', 'background-color: inherit; color: inherit;');
      }
    });

    return () => {
      DOMPurify.removeHook('afterSanitizeAttributes');
    };
  }, []);

  if (!results.length) return null;

  return (
    <ResultsContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ResultsHeader>
        Found {results.length} matching {results.length === 1 ? 'result' : 'results'}
      </ResultsHeader>
      {results.map(({ item, matches }) => (
        <ResultItem
          key={item.id}
          onClick={() => onItemClick(item.id)}
          variants={itemVariants}
        >
          <Question
            dangerouslySetInnerHTML={{
              __html: sanitizer.current(
                matches.find((m) => m.field === 'question')?.snippet || item.question
              ),
            }}
          />
          {matches.find((m) => m.field === 'answer') && (
            <Answer
              dangerouslySetInnerHTML={{
                __html: sanitizer.current(
                  matches.find((m) => m.field === 'answer')?.snippet || ''
                ),
              }}
            />
          )}
        </ResultItem>
      ))}
    </ResultsContainer>
  );
}
