import {
  Box,
  Button,
  Container,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { useBookmarkletHref } from "../hooks/useBookmarkletActions";
import { fadeUp, staggerContainer, springSnappy } from "../lib/motion";

const MotionVStack = motion(VStack);
const MotionBox = motion(Box);

const floatingBoxes = [
  { top: "12%", right: "8%", w: 48, h: 32, rotate: 6, delay: 0 },
  { top: "55%", right: "15%", w: 36, h: 24, rotate: -4, delay: 0.5 },
  { bottom: "20%", left: "5%", w: 56, h: 40, rotate: 3, delay: 1 },
];

export function Hero() {
  const bookmarkletHref = useBookmarkletHref();
  const reduceMotion = useReducedMotion();

  return (
    <Box
      as="section"
      pt={{ base: 8, md: 12 }}
      pb={{ base: 12, md: 16 }}
      position="relative"
      overflow="hidden"
    >
      {!reduceMotion &&
        floatingBoxes.map((box, i) => (
          <MotionBox
            key={i}
            position="absolute"
            top={box.top}
            right={box.right}
            bottom={box.bottom}
            left={box.left}
            w={box.w}
            h={box.h}
            border="2px solid"
            borderColor="red.200"
            borderRadius="md"
            opacity={0.5}
            display={{ base: "none", lg: "block" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.3, 0.55, 0.3],
              y: [0, -8, 0],
              rotate: box.rotate,
            }}
            transition={{
              opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: box.delay },
              y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: box.delay },
              scale: { duration: 0.6, delay: 0.2 + i * 0.1 },
            }}
          />
        ))}

      <Container maxW="container.lg" position="relative" zIndex={1}>
        <MotionVStack
          spacing={6}
          align={{ base: "stretch", md: "flex-start" }}
          textAlign={{ base: "center", md: "left" }}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
          variants={reduceMotion ? undefined : staggerContainer}
        >
          <MotionBox variants={reduceMotion ? undefined : fadeUp}>
            <Heading
              as="h1"
              size={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="bold"
              letterSpacing="-0.03em"
              lineHeight="1.1"
            >
              See every{" "}
              <Box
                as="span"
                position="relative"
                display="inline-block"
                color="red.500"
              >
                box
                {!reduceMotion && (
                  <MotionBox
                    position="absolute"
                    left={0}
                    right={0}
                    bottom="-4px"
                    h="3px"
                    bg="red.400"
                    borderRadius="full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ originX: 0 }}
                  />
                )}
              </Box>{" "}
              on any page
            </Heading>
          </MotionBox>

          <MotionBox variants={reduceMotion ? undefined : fadeUp}>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.600"
              maxW="2xl"
              lineHeight="tall"
            >
              Redline is a bookmarklet that draws a 1px red outline on every
              element—perfect for spotting layout, nesting, and alignment issues
              without opening devtools.
            </Text>
          </MotionBox>

          <MotionBox
            variants={reduceMotion ? undefined : fadeUp}
            w={{ base: "full", md: "auto" }}
          >
            <VStack spacing={3} align={{ base: "stretch", md: "flex-start" }}>
              <MotionBox
                display="inline-block"
                w={{ base: "full", md: "auto" }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { scale: 1.03, y: -2 }
                }
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        filter: [
                          "drop-shadow(0 4px 14px rgba(229, 62, 62, 0.35))",
                          "drop-shadow(0 6px 22px rgba(229, 62, 62, 0.5))",
                          "drop-shadow(0 4px 14px rgba(229, 62, 62, 0.35))",
                        ],
                      }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        filter: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                        default: springSnappy,
                      }
                }
              >
                <Button
                  as={Link}
                  href={bookmarkletHref}
                  size="lg"
                  px={10}
                  h={14}
                  fontSize="md"
                  w={{ base: "full", md: "auto" }}
                  boxShadow="0 4px 14px rgba(229, 62, 62, 0.35)"
                  _hover={{ textDecoration: "none" }}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/uri-list", bookmarkletHref);
                    e.dataTransfer.setData("text/plain", bookmarkletHref);
                  }}
                >
                  Drag Redline to bookmarks bar
                </Button>
              </MotionBox>
              <Text fontSize="sm" color="gray.500" maxW="md">
                Drag to install—don&apos;t left-click. Most browsers block{" "}
                <Text as="span" fontFamily="mono" fontSize="xs">
                  javascript:
                </Text>{" "}
                links.
              </Text>
            </VStack>
          </MotionBox>
        </MotionVStack>
      </Container>
    </Box>
  );
}
