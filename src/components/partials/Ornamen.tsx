import { motion } from 'framer-motion';
import OrnamenSVG from '../assets/ornamen.svg';

interface OrnamenProps {
  className?: string;
  reverse?: boolean;
}

const Ornamen = ({ className = '', reverse = false }: OrnamenProps) => {
  return (
    <motion.div
      className={`${className} ${reverse ? 'rotate-180' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <OrnamenSVG className="w-full h-auto" />
    </motion.div>
  );
};

export default Ornamen;
