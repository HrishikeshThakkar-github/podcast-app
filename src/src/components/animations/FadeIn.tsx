import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

interface FadeInProps extends PropsWithChildren {
  delay?: number;
  duration?: number;
  y?: number;
}

export function FadeIn({ children, delay = 0, duration = 0.6, y = 20 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
