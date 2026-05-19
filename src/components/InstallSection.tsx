import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { useBookmarkletActions } from "../hooks/useBookmarkletActions";
import { fadeUp, springSnappy } from "../lib/motion";
import { SectionReveal, StaggerItem, StaggerReveal } from "./SectionReveal";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const buttons = [
  { label: "Add to bookmarks", variant: "solid" as const, colorScheme: "gray", action: "add" },
  { label: "Copy bookmarklet URL", variant: "outline" as const, colorScheme: "red", action: "copy" },
  { label: "Try on this page", variant: "ghost" as const, colorScheme: "red", action: "try" },
];

export function InstallSection() {
  const { addBookmarkToBrowser, copyBookmarklet, tryOnPage } =
    useBookmarkletActions();
  const reduceMotion = useReducedMotion();

  const handlers = {
    add: addBookmarkToBrowser,
    copy: copyBookmarklet,
    try: tryOnPage,
  };

  return (
    <Box
      as="section"
      id="install"
      py={{ base: 16, md: 24 }}
      scrollMarginTop="80px"
    >
      <Container maxW="container.lg">
        <SectionReveal variant="scale">
          <MotionBox
            p={{ base: 8, md: 12 }}
            bg="white"
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="lg"
            position="relative"
            overflow="hidden"
            whileHover={reduceMotion ? undefined : { boxShadow: "0 24px 48px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            {!reduceMotion && (
              <MotionBox
                position="absolute"
                inset={-1}
                borderRadius="2xl"
                bg="linear-gradient(135deg, #fc8181, #e53e3e, #feb2b2, #e53e3e)"
                opacity={0.35}
                zIndex={0}
                animate={{ opacity: [0.2, 0.45, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                pointerEvents="none"
                aria-hidden
              />
            )}

            <VStack spacing={8} align="stretch" position="relative" zIndex={1}>
              <VStack spacing={3} textAlign="center">
                <Heading as="h2" size="xl" letterSpacing="-0.02em">
                  Install Redline
                </Heading>
                <Text color="gray.600" maxW="lg" fontSize="lg">
                  Prefer drag-and-drop? Use the red button in the hero. Or pick
                  one of these options.
                </Text>
              </VStack>

              <StaggerReveal stagger={0.1}>
                <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={4}>
                  {buttons.map((btn) => (
                    <StaggerItem key={btn.action}>
                      <MotionButton
                        size="lg"
                        variant={btn.variant}
                        colorScheme={btn.colorScheme}
                        w="full"
                        onClick={handlers[btn.action as keyof typeof handlers]}
                        variants={reduceMotion ? undefined : fadeUp}
                        whileHover={
                          reduceMotion ? undefined : { scale: 1.03, y: -2 }
                        }
                        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                        transition={springSnappy}
                      >
                        {btn.label}
                      </MotionButton>
                    </StaggerItem>
                  ))}
                </SimpleGrid>
              </StaggerReveal>

              <Text fontSize="sm" color="gray.500" textAlign="center">
                After saving, open any site and click Redline from your bookmarks
                bar. Run it twice to turn red outlines off.
              </Text>
            </VStack>
          </MotionBox>
        </SectionReveal>
      </Container>
    </Box>
  );
}
