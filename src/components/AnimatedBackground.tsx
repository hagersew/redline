import { Box } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";

const MotionBox = motion(Box);

const orbs = [
  { top: "8%", left: "5%", size: 320, delay: 0 },
  { top: "45%", right: "8%", size: 280, delay: 0.4 },
  { bottom: "12%", left: "35%", size: 240, delay: 0.8 },
];

export function AnimatedBackground() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <Box
      position="fixed"
      inset={0}
      pointerEvents="none"
      overflow="hidden"
      zIndex={0}
      aria-hidden
    >
      <Box
        position="absolute"
        inset={0}
        opacity={0.4}
        bgImage="radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)"
        bgSize="32px 32px"
      />
      {orbs.map((orb, i) => (
        <MotionBox
          key={i}
          position="absolute"
          top={orb.top}
          left={orb.left}
          right={orb.right}
          bottom={orb.bottom}
          w={orb.size}
          h={orb.size}
          borderRadius="full"
          bg="radial-gradient(circle, rgba(229,62,62,0.12) 0%, transparent 70%)"
          animate={{
            y: [0, -20, 0],
            x: [0, i % 2 === 0 ? 12 : -12, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </Box>
  );
}
