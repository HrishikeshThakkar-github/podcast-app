import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Page } from '@/components/layout/Page';
import { AboutScene } from '@/components/three/AboutScene';
import { Team } from '@/components/about/Team';
import { ContactForm } from '@/components/about/ContactForm';
import { FadeIn } from '@/components/animations/FadeIn';

const HeroSection = styled.section`
  position: relative;
  height: 60vh;
  min-height: 400px;
  max-height: 800px;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 50vh;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 40vh;
    min-height: 300px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 35vh;
    min-height: 250px;
  }
`;

const HeroContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;
  padding: ${({ theme }) => theme.spacing(4)};
  background: linear-gradient(
    to bottom,
    transparent 0%,
    ${({ theme }) => theme.colors.background}90 50%,
    ${({ theme }) => theme.colors.background} 100%
  );

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing(3)};
  }
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.h1};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2rem;
    margin-bottom: ${({ theme }) => theme.spacing(1.5)};
  }
`;

const Subtitle = styled.p`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.primary};
  max-width: 600px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  font-size: 1.2rem;
  line-height: 1.5;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.1rem;
    max-width: 500px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
    max-width: 100%;
  }
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(8)} ${({ theme }) => theme.spacing(4)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing(7)} ${({ theme }) => theme.spacing(4)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(3)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing(5)} ${({ theme }) => theme.spacing(2)};
  }
`;

const Content = styled.div`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.primary};
  max-width: 800px;
  margin: 0 auto;
  
  h2 {
    ${({ theme }) => theme.typography.h2};
    margin-bottom: ${({ theme }) => theme.spacing(4)};
    text-align: center;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-bottom: ${({ theme }) => theme.spacing(3)};
    }
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing(3)};
    line-height: 1.6;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 0.95rem;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-top: ${({ theme }) => theme.spacing(4)};
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing(2)};
    margin-top: ${({ theme }) => theme.spacing(3)};
  }
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.text.primary};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export default function AboutPage() {
  return (
    <Page
      title="About Us"
      description="Learn more about our podcast and the team behind it."
    >
      <HeroSection
        as={motion.section}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <AboutScene />
        <HeroContent>
          <FadeIn delay={0.2}>
            <Title>About Our Podcast</Title>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Subtitle>
              Exploring the intersection of technology, design, and innovation through
              meaningful conversations.
            </Subtitle>
          </FadeIn>
        </HeroContent>
      </HeroSection>

      <Section>
        <Content>
          <FadeIn>
            <h2>Our Mission</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p>
              At PodSite, we believe in the power of meaningful conversations to inspire,
              educate, and connect people across the tech industry. Our podcast brings
              together thought leaders, innovators, and creators to share their insights
              and experiences.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p>
              Each episode dives deep into topics ranging from software development and
              design principles to emerging technologies and industry trends. We strive
              to create content that not only informs but also sparks curiosity and
              encourages continuous learning.
            </p>
          </FadeIn>
        </Content>

        <FadeIn delay={0.4}>
          <SocialLinks>
            <SocialLink 
              as={motion.a}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://twitter.com/podsite" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Twitter
            </SocialLink>
            <SocialLink 
              as={motion.a}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://linkedin.com/company/podsite" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              LinkedIn
            </SocialLink>
            <SocialLink 
              as={motion.a}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/podsite" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              GitHub
            </SocialLink>
          </SocialLinks>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn>
          <h2>Meet the Team</h2>
        </FadeIn>
        <Team />
      </Section>

      <Section>
        <FadeIn>
          <h2>Get in Touch</h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <ContactForm />
        </FadeIn>
      </Section>
    </Page>
  );
}
