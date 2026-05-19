import { Box, type BoxProps } from "@chakra-ui/react";
import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { blurIn, easeOut, fadeUp, fadeUpScale } from "../lib/motion";

type RevealVariant = "fade" | "scale" | "blur";

const variantMap: Record<RevealVariant, Variants> = {
  fade: fadeUp,
  scale: fadeUpScale,
  blur: blurIn,
};

type SectionRevealProps = BoxProps & {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
};

export function SectionReveal({
  children,
  delay = 0,
  variant = "fade",
  ...boxProps
}: SectionRevealProps) {
  const reduceMotion = useReducedMotion();

  const revealTransition: Transition = {
    duration: 0.55,
    delay,
    ease: easeOut,
  };

  if (reduceMotion) {
    return <Box {...boxProps}>{children}</Box>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variantMap[variant]}
      transition={variant === "scale" ? { ...revealTransition, type: "spring", stiffness: 200, damping: 24 } : revealTransition}
    >
      <Box {...boxProps}>{children}</Box>
    </motion.div>
  );
}

type StaggerRevealProps = BoxProps & {
  children: ReactNode;
  stagger?: number;
};

export function StaggerReveal({
  children,
  stagger = 0.1,
  ...boxProps
}: StaggerRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <Box {...boxProps}>{children}</Box>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      <Box {...boxProps}>{children}</Box>
    </motion.div>
  );
}

export function StaggerItem({
  children,
  ...boxProps
}: BoxProps & { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <Box {...boxProps}>{children}</Box>;
  }

  return (
    <motion.div variants={fadeUp}>
      <Box {...boxProps}>{children}</Box>
    </motion.div>
  );
}
