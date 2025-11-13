import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState, Suspense } from 'react';
import { Page } from '@/components/layout/Page';
import { Category } from '@/components/faq/Category';
import { SearchResults } from '@/components/faq/SearchResults';
import { useSearch } from '@/components/faq/useSearch';
import { faqCategories } from '@/data/faq';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

const Container = styled.div`
  max-width: min(800px, 90vw);
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: min(800px, 95vw);
    padding: ${({ theme }) => theme.spacing(3)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 100%;
    padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(6)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing(5)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.spacing(4)};
  }
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.h1};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.95rem;
  }
`;

const SearchContainer = styled.div`
  margin: ${({ theme }) => theme.spacing(6)} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: ${({ theme }) => theme.spacing(5)} 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: ${({ theme }) => theme.spacing(4)} 0;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(2)};
  font-size: 1.1rem;
  border: 2px solid ${({ theme }) => theme.colors.text.disabled};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all 0.2s ease;
  -webkit-appearance: none;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}22;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
    padding: ${({ theme }) => theme.spacing(1.75)} ${({ theme }) => theme.spacing(2)};
    border-width: 1.5px;
  }
`;

const ContactSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing(8)};
  text-align: center;
  padding: ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing(4)};
    margin-top: ${({ theme }) => theme.spacing(6)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing(3)};
    margin-top: ${({ theme }) => theme.spacing(4)};
  }

  h2 {
    ${({ theme }) => theme.typography.h2};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing(2)};

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 1.5rem;
    }
  }

  p {
    ${({ theme }) => theme.typography.body1};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing(4)};

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 0.95rem;
      margin-bottom: ${({ theme }) => theme.spacing(3)};
    }
  }
`;

const ContactButton = styled.a`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.primary};
  color: #FFFFFF;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  font-size: 1rem;
  -webkit-tap-highlight-color: transparent;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
    font-size: 0.95rem;
    width: 100%;
    max-width: 250px;
    margin: 0 auto;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    opacity: 0.9;
  }
`;

export default function FAQPage() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const { search, results } = useSearch();

  const handleSearch = (query: string) => {
    search(query, faqCategories);
  };

  const handleResultClick = (itemId: string) => {
    setExpandedItem(itemId);
    // Scroll to the FAQ item
    const element = document.getElementById(itemId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Page 
      title="Frequently Asked Questions" 
      description="Find answers to common questions about our podcast and platform."
    >
      <ErrorBoundary>
        <Container>
          <Header>
            <Title>Frequently Asked Questions</Title>
            <Description>
              Find answers to the most common questions about our podcast, platform,
              and how to get involved. Can't find what you're looking for? Feel free
              to reach out to us directly.
            </Description>
          </Header>

        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search for a question..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </SearchContainer>

        <SearchResults results={results} onItemClick={handleResultClick} />

        {faqCategories.map((category) => (
          <Category
            key={category.title}
            title={category.title}
            items={category.items}
            expandedItem={expandedItem}
            onItemClick={setExpandedItem}
          />
        ))}

        <ContactSection>
          <h2>Still Have Questions?</h2>
          <p>
            Can't find the answer you're looking for? We're here to help! Reach
            out to our team directly.
          </p>
          <ContactButton
            as={motion.a}
            href="/about#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </ContactButton>
        </ContactSection>
      </Container>
      </ErrorBoundary>
    </Page>
  );
}
