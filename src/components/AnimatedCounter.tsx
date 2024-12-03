import React from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  formatter?: (value: number) => string;
}

export function AnimatedCounter({ value, formatter = (v) => v.toString() }: AnimatedCounterProps) {
  const spring = useSpring(0, { duration: 2000 });
  const display = useTransform(spring, (current) => formatter(Math.floor(current)));

  React.useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}