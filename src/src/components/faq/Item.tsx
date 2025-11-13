import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { FAQ } from './Category';
import { ComponentError } from '@/components/common/ComponentError';

interface ItemProps {
  item: FAQ;
  isExpanded?: boolean;
  onClick?: () => void;
}

const ItemContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

const QuestionButton = styled.button<{ isOpen: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(3)};
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  ${({ theme }) => theme.typography.body1};
  gap: ${({ theme }) => theme.spacing(2)};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  &:active {
    background: ${({ theme }) => theme.colors.background};
    opacity: 0.9;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing(2.5)};
    font-size: 0.95rem;
    line-height: 1.4;
    min-height: 3.5rem;
    gap: ${({ theme }) => theme.spacing(1.5)};
  }
`;

const IconContainer = styled(motion.div)`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 20px;
    height: 20px;
    margin-top: 2px;
  }
`;

const Icon = styled(motion.span)`
  display: block;
  width: 16px;
  height: 2px;
  background: currentColor;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 2px;
    background: currentColor;
    transform: rotate(90deg);
    transition: transform 0.2s ease;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 14px;
    height: 1.5px;

    &::before {
      width: 14px;
      height: 1.5px;
    }
  }
`;

const Answer = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing(3)};
  padding-top: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing(2.5)};
    padding-top: 0;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
};

const answerVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

export function Item({ item, isExpanded = false, onClick }: ItemProps) {
  const [error, setError] = useState<string | null>(null);

  const handleError = (e: Error) => {
    console.error('Error in FAQ Item:', e);
    setError(e.message);
  };

  if (error) {
    return (
      <ComponentError
        message="Failed to load this FAQ item. Please try again."
        onRetry={() => setError(null)}
      />
    );
  }

  try {
    return (
      <ItemContainer
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
        id={item.id}
      >
        <QuestionButton
          onClick={onClick}
          isOpen={isExpanded}
          aria-expanded={isExpanded}
        >
          {item.question}
        <IconContainer
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon />
        </IconContainer>
      </QuestionButton>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <Answer
            variants={answerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            layout
          >
            {item.answer}
          </Answer>
        )}
      </AnimatePresence>
    </ItemContainer>
  );
  } catch (e) {
    handleError(e as Error);
    return null;
  }
}
