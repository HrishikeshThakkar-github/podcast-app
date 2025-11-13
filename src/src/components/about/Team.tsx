import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Host & Producer',
    bio: 'Tech enthusiast and veteran podcaster with over 10 years of experience in the industry.',
    image: '/team/sarah.jpg',
    social: {
      twitter: 'https://twitter.com/sarahjohnson',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
    },
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Technical Director',
    bio: 'Software architect and tech lead specializing in cloud infrastructure and DevOps.',
    image: '/team/michael.jpg',
    social: {
      github: 'https://github.com/michaelchen',
      linkedin: 'https://linkedin.com/in/michaelchen',
    },
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Content Producer',
    bio: 'Creative storyteller with a background in digital media and content strategy.',
    image: '/team/emily.jpg',
    social: {
      twitter: 'https://twitter.com/emilyrodriguez',
      linkedin: 'https://linkedin.com/in/emilyrodriguez',
    },
  },
];

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(4)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: ${({ theme }) => theme.spacing(3)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing(3)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const TeamCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 100%;
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
  padding: ${({ theme }) => theme.spacing(3)};
`;

const Name = styled.h3`
  ${({ theme }) => theme.typography.h3};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const Role = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Bio = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: 'easeOut'
    }
  }),
  hover: {
    y: -8,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  }
};

export function Team() {
  return (
    <Grid>
      {teamMembers.map((member, index) => (
        <TeamCard
          key={member.id}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          custom={index}
        >
          <ImageContainer>
            <Image 
              src={member.image} 
              alt={member.name}
              as={motion.img}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </ImageContainer>
          <Content>
            <Name>{member.name}</Name>
            <Role>{member.role}</Role>
            <Bio>{member.bio}</Bio>
            <SocialLinks>
              {member.social.twitter && (
                <SocialLink 
                  as={motion.a}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={member.social.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Twitter
                </SocialLink>
              )}
              {member.social.linkedin && (
                <SocialLink 
                  as={motion.a}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={member.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </SocialLink>
              )}
              {member.social.github && (
                <SocialLink 
                  as={motion.a}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={member.social.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  GitHub
                </SocialLink>
              )}
            </SocialLinks>
          </Content>
        </TeamCard>
      ))}
    </Grid>
  );
}
