import { ReactNode } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Layout } from './Layout';

interface PageProps {
  children: ReactNode;
  title: string;
  description: string;
  image?: string;
}

const PageContainer = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
`;

export function Page({ children, title, description, image }: PageProps) {
  const fullTitle = `${title} | PodSite`;

  return (
    <Layout>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        {image && <meta property="og:image" content={image} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        {image && <meta name="twitter:image" content={image} />}
      </Head>
      <PageContainer>
        {children}
      </PageContainer>
    </Layout>
  );
}
