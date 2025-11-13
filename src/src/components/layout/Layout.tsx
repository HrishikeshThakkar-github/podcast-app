import styled, { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { Navigation } from './Navigation';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const LayoutWrapper = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Main = styled.main`
  padding: ${({ theme }) => theme.spacing(4)};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing(8)};
  }
`;

export function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <LayoutWrapper>
        <Navigation />
        <Main>{children}</Main>
      </LayoutWrapper>
    </ThemeProvider>
  );
}
