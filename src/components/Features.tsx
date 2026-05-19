import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "../lib/motion";
import { SectionReveal, StaggerItem, StaggerReveal } from "./SectionReveal";

const MotionBox = motion(Box);
const MotionText = motion(Text);

const features = [
  {
    title: "Layout skeleton",
    description:
      "Instantly reveals how nested boxes stack—headers, grids, sidebars, and wrappers become obvious at a glance.",
    icon: "▦",
  },
  {
    title: "Padding & alignment",
    description:
      "Spot extra padding, misaligned elements, and overflow quirks faster than hunting through devtools panels.",
    icon: "⊞",
  },
  {
    title: "One-click toggle",
    description:
      "Run the bookmarklet again to remove every outline. No refresh, no cleanup scripts—just off.",
    icon: "↺",
  },
];

export function Features() {
  const reduceMotion = useReducedMotion();

  return (
    <Box as="section" py={{ base: 16, md: 24 }} bg="white" position="relative" overflow="hidden">
      {!reduceMotion && (
        <MotionBox
          position="absolute"
          top="-20%"
          right="-10%"
          w="400px"
          h="400px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(229,62,62,0.06) 0%, transparent 70%)"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <Container maxW="container.lg" position="relative">
        <SectionReveal variant="blur">
          <VStack spacing={12} align="stretch">
            <VStack spacing={3} textAlign="center">
              <Heading as="h2" size="xl" letterSpacing="-0.02em">
                Why developers use Redline
              </Heading>
              <Text color="gray.600" maxW="lg" fontSize="lg">
                A lightweight overlay for layout debugging on any site, any time.
              </Text>
            </VStack>

            <StaggerReveal stagger={0.12}>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                {features.map((feature) => (
                  <StaggerItem key={feature.title}>
                    <MotionBox
                      variants={reduceMotion ? undefined : fadeUp}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              y: -8,
                              boxShadow: "0 16px 40px rgba(0,0,0,0.1)",
                              borderColor: "red.200",
                            }
                      }
                      transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    >
                      <VStack
                        align="flex-start"
                        spacing={4}
                        p={8}
                        bg="gray.50"
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="gray.100"
                        h="full"
                      >
                        <MotionText
                          fontSize="2xl"
                          aria-hidden
                          color="red.500"
                          fontWeight="bold"
                          display="inline-block"
                          whileHover={
                            reduceMotion
                              ? undefined
                              : { rotate: [0, -8, 8, 0], scale: 1.15 }
                          }
                          transition={{ duration: 0.4 }}
                        >
                          {feature.icon}
                        </MotionText>
                        <Heading as="h3" size="md">
                          {feature.title}
                        </Heading>
                        <Text color="gray.600" lineHeight="tall">
                          {feature.description}
                        </Text>
                      </VStack>
                    </MotionBox>
                  </StaggerItem>
                ))}
              </SimpleGrid>
            </StaggerReveal>
          </VStack>
        </SectionReveal>
      </Container>
    </Box>
  );
}
