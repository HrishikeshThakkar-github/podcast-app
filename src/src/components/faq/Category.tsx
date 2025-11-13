import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Item } from './Item';
import { ComponentError } from '@/components/common/ComponentError';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface CategoryProps {
  title: string;
  items: FAQ[];
  expandedItem?: string | null;
  onItemClick?: (id: string) => void;
}

const CategoryContainer = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const CategoryTitle = styled.h2`
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  word-break: break-word;
  hyphens: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.5rem;
    margin-bottom: ${({ theme }) => theme.spacing(3)};
    flex-wrap: wrap;
  }
`;

const ItemsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const NoItems = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  padding: ${({ theme }) => theme.spacing(4)};
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function Category({ title, items, expandedItem, onItemClick }: CategoryProps) {
  const [error, setError] = useState<string | null>(null);

  const handleError = (e: Error) => {
    console.error('Error in Category component:', e);
    setError(e.message);
  };

  if (error) {
    return (
      <ComponentError
        message={`Failed to load category "${title}". Please try again.`}
        onRetry={() => setError(null)}
      />
    );
  }

  try {
    return (
      <CategoryContainer>
        <CategoryTitle>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            ({items.length})
          </motion.span>
        </CategoryTitle>

      <AnimatePresence>
        {items.length > 0 ? (
          <ItemsContainer
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {items.map((item) => (
              <Item 
                key={item.id}
                item={item}
                isExpanded={expandedItem === item.id}
                onClick={() => onItemClick?.(item.id)}
              />
            ))}
          </ItemsContainer>
        ) : (
          <NoItems>No questions in this category yet.</NoItems>
        )}
      </AnimatePresence>
    </CategoryContainer>
  );
  } catch (e) {
    handleError(e as Error);
    return null;
  }
}
