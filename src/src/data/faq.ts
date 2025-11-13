import { FAQ } from '@/components/faq/Category';

export const faqCategories: { title: string; items: FAQ[] }[] = [
  {
    title: 'General',
    items: [
      {
        id: 'general-1',
        question: 'What is this podcast about?',
        answer: 'Our podcast focuses on exploring technology, design, and innovation through in-depth conversations with industry experts, thought leaders, and creators. We cover topics ranging from software development and design principles to emerging technologies and industry trends.',
        category: 'general',
      },
      {
        id: 'general-2',
        question: 'How often do you release new episodes?',
        answer: 'We release new episodes every week on Wednesday. Occasionally, we also release bonus episodes featuring special guests or covering major industry events.',
        category: 'general',
      },
      {
        id: 'general-3',
        question: 'Where can I listen to the podcast?',
        answer: 'You can listen to our podcast on all major platforms including Spotify, Apple Podcasts, Google Podcasts, and directly on our website. Each episode page includes an embedded player for easy listening.',
        category: 'general',
      },
    ],
  },
  {
    title: 'Content & Episodes',
    items: [
      {
        id: 'content-1',
        question: 'How long are your episodes?',
        answer: 'Most of our episodes run between 45-60 minutes, though some in-depth discussions may go longer. We also occasionally release shorter format episodes (15-30 minutes) for specific topics or quick insights.',
        category: 'content',
      },
      {
        id: 'content-2',
        question: 'Do you provide transcripts of your episodes?',
        answer: "Yes, we provide full transcripts for all our episodes. You can find them on each episode's page, along with show notes and relevant links discussed in the conversation.",
        category: 'content',
      },
      {
        id: 'content-3',
        question: 'Can I suggest a topic or guest for the podcast?',
        answer: 'Absolutely! We welcome suggestions from our community. You can submit your ideas through our contact form on the About page or reach out to us on social media.',
        category: 'content',
      },
    ],
  },
  {
    title: 'Participation',
    items: [
      {
        id: 'participation-1',
        question: 'How can I be a guest on the show?',
        answer: "If you'd like to be a guest on our podcast, please fill out the contact form on our About page with details about your expertise and potential topic ideas. Our team reviews all submissions and will reach out if there's a good fit.",
        category: 'participation',
      },
      {
        id: 'participation-2',
        question: 'Can I advertise on your podcast?',
        answer: 'Yes, we offer various sponsorship opportunities. Please contact us through our website for our media kit and sponsorship details.',
        category: 'participation',
      },
    ],
  },
  {
    title: 'Technical',
    items: [
      {
        id: 'technical-1',
        question: 'What audio quality can I expect?',
        answer: 'We record all our episodes in high-quality audio (48kHz, 24-bit) and work with professional audio engineers to ensure the best possible listening experience.',
        category: 'technical',
      },
      {
        id: 'technical-2',
        question: 'Is there an RSS feed available?',
        answer: 'Yes, we provide an RSS feed for our podcast. You can find the link in the footer of our website or in the podcast directory listings.',
        category: 'technical',
      },
      {
        id: 'technical-3',
        question: 'Do you offer a mobile app?',
        answer: 'Currently, we don't have a dedicated mobile app, but our website is fully responsive and provides a great mobile experience. You can also find us on any major podcast platform.',
        category: 'technical',
      },
    ],
  },
];
