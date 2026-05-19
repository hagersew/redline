import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { slideInLeft } from "../lib/motion";
import { SectionReveal, StaggerItem, StaggerReveal } from "./SectionReveal";

const MotionBox = motion(Box);

const steps = [
  {
    number: "01",
    title: "Install the bookmarklet",
    description:
      "Drag the red Redline button to your bookmarks bar, or copy the URL into a new bookmark.",
  },
  {
    number: "02",
    title: "Open any website",
    description:
      "Navigate to the page you want to inspect—your app, a client site, or anything in the browser.",
  },
  {
    number: "03",
    title: "Click to toggle",
    description:
      "Run Redline once to outline every element. Click again to turn all red outlines off.",
  },
];

export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <Box
      as="section"
      id="how-it-works"
      py={{ base: 16, md: 24 }}
      scrollMarginTop="80px"
    >
      <Container maxW="container.lg">
        <SectionReveal variant="scale">
          <VStack spacing={12} align="stretch">
            <VStack spacing={3} textAlign="center">
              <Heading as="h2" size="xl" letterSpacing="-0.02em">
                How it works
              </Heading>
              <Text color="gray.600" maxW="lg" fontSize="lg">
                Three steps from install to instant layout X-ray on any page.
              </Text>
            </VStack>

            <Box position="relative">
              {!reduceMotion && (
                <MotionBox
                  position="absolute"
                  top="48px"
                  left={{ base: "24px", md: "16%" }}
                  right={{ base: "auto", md: "16%" }}
                  h="2px"
                  bg="red.200"
                  display={{ base: "none", md: "block" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                  zIndex={0}
                />
              )}

              <StaggerReveal stagger={0.15}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} position="relative" zIndex={1}>
                  {steps.map((step) => (
                    <StaggerItem key={step.number}>
                      <MotionBox
                        variants={reduceMotion ? undefined : slideInLeft}
                        whileHover={
                          reduceMotion
                            ? undefined
                            : { y: -6, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }
                        }
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <VStack
                          align="flex-start"
                          spacing={4}
                          p={6}
                          bg="white"
                          borderRadius="xl"
                          border="1px solid"
                          borderColor="gray.100"
                          boxShadow="sm"
                          h="full"
                          position="relative"
                        >
                          <MotionBox
                            as={Text}
                            fontSize="sm"
                            fontWeight="bold"
                            color="red.500"
                            fontFamily="mono"
                            display="inline-block"
                            whileInView={
                              reduceMotion
                                ? undefined
                                : { scale: [1, 1.15, 1], rotate: [0, -3, 0] }
                            }
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            {step.number}
                          </MotionBox>
                          <Heading as="h3" size="md">
                            {step.title}
                          </Heading>
                          <Text color="gray.600" lineHeight="tall">
                            {step.description}
                          </Text>
                        </VStack>
                      </MotionBox>
                    </StaggerItem>
                  ))}
                </SimpleGrid>
              </StaggerReveal>
            </Box>
          </VStack>
        </SectionReveal>
      </Container>
    </Box>
  );
}
