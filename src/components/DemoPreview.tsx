import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { scaleIn } from "../lib/motion";
import { SectionReveal } from "./SectionReveal";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

type DemoBlockProps = {
  active: boolean;
  index: number;
  reduceMotion: boolean | null;
  children?: ReactNode;
} & Record<string, unknown>;

function DemoBlock({
  active,
  index,
  reduceMotion,
  children,
  ...boxProps
}: DemoBlockProps) {
  return (
    <MotionBox
      initial={false}
      animate={{
        outlineWidth: active ? "1px" : "0px",
        outlineColor: active ? "#e53e3e" : "transparent",
        outlineStyle: "solid",
        outlineOffset: active && !reduceMotion ? ["0px", "2px", "0px"] : "0px",
        boxShadow: active
          ? "0 0 0 1px rgba(229, 62, 62, 0.15)"
          : "0 0 0 0px transparent",
      }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: 0.25,
              delay: active ? index * 0.025 : 0,
              outlineOffset: active
                ? { duration: 0.4, delay: index * 0.025 + 0.1 }
                : { duration: 0.15 },
            }
      }
      {...boxProps}
    >
      {children}
    </MotionBox>
  );
}

function MockPage({ active, reduceMotion }: { active: boolean; reduceMotion: boolean | null }) {
  let index = 0;
  const next = () => index++;

  return (
    <MotionBox
      bg="white"
      p={4}
      minH="280px"
      fontSize="xs"
      animate={reduceMotion || !active ? undefined : { opacity: [1, 0.97, 1] }}
      transition={{ duration: 0.3 }}
    >
      <DemoBlock
        active={active}
        index={next()}
        reduceMotion={reduceMotion}
        bg="gray.800"
        color="white"
        px={3}
        py={2}
        borderRadius="md"
        mb={3}
      >
        <Text fontWeight="bold">Site Header</Text>
      </DemoBlock>

      <Grid templateColumns="1fr 120px" gap={3}>
        <GridItem>
          <DemoBlock
            active={active}
            index={next()}
            reduceMotion={reduceMotion}
            bg="red.50"
            p={3}
            borderRadius="md"
            mb={3}
          >
            <Text fontWeight="semibold" color="gray.800" mb={1}>
              Hero section
            </Text>
            <DemoBlock
              active={active}
              index={next()}
              reduceMotion={reduceMotion}
              bg="white"
              p={2}
              borderRadius="sm"
              border="1px solid"
              borderColor="gray.200"
            >
              <Text color="gray.600">Call to action block</Text>
            </DemoBlock>
          </DemoBlock>

          <Grid templateColumns="1fr 1fr" gap={2}>
            {["Card A", "Card B"].map((label) => (
              <DemoBlock
                key={label}
                active={active}
                index={next()}
                reduceMotion={reduceMotion}
                bg="gray.50"
                p={3}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.100"
              >
                <Text fontWeight="medium" color="gray.700">
                  {label}
                </Text>
                <DemoBlock
                  active={active}
                  index={next()}
                  reduceMotion={reduceMotion}
                  mt={2}
                  h={2}
                  bg="gray.200"
                  borderRadius="full"
                />
              </DemoBlock>
            ))}
          </Grid>
        </GridItem>

        <GridItem>
          <DemoBlock
            active={active}
            index={next()}
            reduceMotion={reduceMotion}
            bg="gray.100"
            p={3}
            borderRadius="md"
            h="full"
          >
            <Text fontWeight="medium" color="gray.600">
              Sidebar
            </Text>
            <DemoBlock
              active={active}
              index={next()}
              reduceMotion={reduceMotion}
              mt={2}
              bg="white"
              p={2}
              borderRadius="sm"
            >
              <Text color="gray.500">Nav item</Text>
            </DemoBlock>
            <DemoBlock
              active={active}
              index={next()}
              reduceMotion={reduceMotion}
              mt={2}
              bg="white"
              p={2}
              borderRadius="sm"
            >
              <Text color="gray.500">Nav item</Text>
            </DemoBlock>
          </DemoBlock>
        </GridItem>
      </Grid>
    </MotionBox>
  );
}

export function DemoPreview() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const userInteracted = useRef(false);

  const toggle = useCallback(() => {
    userInteracted.current = true;
    setActive((prev) => !prev);
  }, []);

  useEffect(() => {
    if (reduceMotion || userInteracted.current) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const loop = (turnOn: boolean) => {
      if (cancelled || userInteracted.current) return;
      setActive(turnOn);
      timeoutId = setTimeout(() => loop(!turnOn), turnOn ? 2500 : 1500);
    };

    timeoutId = setTimeout(() => loop(true), 1200);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [reduceMotion]);

  return (
    <Box as="section" pb={{ base: 8, md: 12 }}>
      <Container maxW="container.lg">
        <SectionReveal variant="blur">
          <VStack spacing={6} align="stretch">
            <VStack spacing={2} textAlign="center">
              <Heading as="h2" size="lg" letterSpacing="-0.02em">
                See it in action
              </Heading>
              <Text color="gray.600">
                Click Run Redline to preview the 1px red outline on every element.
              </Text>
            </VStack>

            <MotionBox
              borderRadius="xl"
              overflow="hidden"
              border="1px solid"
              borderColor="gray.200"
              boxShadow="0 20px 50px rgba(0, 0, 0, 0.08)"
              bg="gray.100"
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-60px" }}
              variants={reduceMotion ? undefined : scaleIn}
              whileHover={
                reduceMotion ? undefined : { y: -4, boxShadow: "0 28px 60px rgba(0, 0, 0, 0.12)" }
              }
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Flex
                align="center"
                gap={3}
                px={4}
                py={3}
                bg="gray.200"
                borderBottom="1px solid"
                borderColor="gray.300"
              >
                <Flex gap={1.5}>
                  {["#ff5f57", "#febc2e", "#28c840"].map((color, i) => (
                    <MotionBox
                      key={color}
                      w={3}
                      h={3}
                      borderRadius="full"
                      bg={color}
                      whileHover={reduceMotion ? undefined : { scale: 1.25 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20, delay: i * 0.02 }}
                    />
                  ))}
                </Flex>
                <Box
                  flex={1}
                  bg="white"
                  px={3}
                  py={1}
                  borderRadius="md"
                  fontSize="xs"
                  color="gray.500"
                  fontFamily="mono"
                  overflow="hidden"
                >
                  <MotionBox
                    animate={reduceMotion ? undefined : { x: ["0%", "-5%", "0%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    whiteSpace="nowrap"
                  >
                    https://example.com
                  </MotionBox>
                </Box>
                <MotionButton
                  size="sm"
                  colorScheme="red"
                  onClick={toggle}
                  flexShrink={0}
                  animate={
                    reduceMotion || active
                      ? undefined
                      : {
                          scale: [1, 1.05, 1],
                          boxShadow: [
                            "0 0 0 0 rgba(229, 62, 62, 0)",
                            "0 0 0 8px rgba(229, 62, 62, 0.2)",
                            "0 0 0 0 rgba(229, 62, 62, 0)",
                          ],
                        }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }
                  whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={active ? "off" : "on"}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                    >
                      {active ? "Turn off" : "Run Redline"}
                    </motion.span>
                  </AnimatePresence>
                </MotionButton>
              </Flex>

              <MockPage active={active} reduceMotion={reduceMotion} />
            </MotionBox>
          </VStack>
        </SectionReveal>
      </Container>
    </Box>
  );
}
