'use client';
import { motion } from 'framer-motion';

type AnimatedWaveProps = {
  color?: string;
  speed?: number;
  direction?: 'left' | 'right';
  opacity?: number;
  height?: string;
};

export const WaveDivider = ({
  color = '#072143',
  speed = 20,
  direction = 'left',
  opacity = 1,
  height = '6rem',
}: AnimatedWaveProps) => {
  const xFrom = direction === 'left' ? 0 : -1200;
  const xTo = direction === 'left' ? -1200 : 0;

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      <motion.div
        className="absolute bottom-0 flex w-[2400px]"
        animate={{ x: [xFrom, xTo] }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: 'linear',
        }}
      >
        {[...Array(3)].map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 1200 110"
            className="w-[1200px] shrink-0"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill={color}
              fillOpacity={opacity}
              d="M0,0V53.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,
              136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,
              583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,
              69.85-17.84,104.45-29.34C989.49,25,
              1113-14.29,1200,52.47V0Z"
            />
          </svg>
        ))}
      </motion.div>
    </div>
  );
};
