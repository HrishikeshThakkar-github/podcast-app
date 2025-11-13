import styled from 'styled-components';
import { motion } from 'framer-motion';

const ErrorContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.error}11;
  border: 1px solid ${({ theme }) => theme.colors.error}33;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin: ${({ theme }) => theme.spacing(2)} 0;
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.95rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const RetryButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  background: ${({ theme }) => theme.colors.error}22;
  color: ${({ theme }) => theme.colors.error};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing(2)};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.error}33;
  }
`;

interface ComponentErrorProps {
  message: string;
  onRetry?: () => void;
}

export function ComponentError({ message, onRetry }: ComponentErrorProps) {
  return (
    <ErrorContainer role="alert">
      <ErrorText>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 12C7.4 12 7 11.6 7 11C7 10.4 7.4 10 8 10C8.6 10 9 10.4 9 11C9 11.6 8.6 12 8 12ZM9 9H7V4H9V9Z"
            fill="currentColor"
          />
        </svg>
        {message}
      </ErrorText>
      {onRetry && (
        <RetryButton
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </RetryButton>
      )}
    </ErrorContainer>
  );
}
