import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  HStack,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Install", href: "#install" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <MotionBox
      as="header"
      position="sticky"
      top={0}
      zIndex={100}
      bg={scrolled ? "rgba(250, 250, 250, 0.85)" : "transparent"}
      backdropFilter={scrolled ? "blur(12px)" : "none"}
      borderBottom="1px solid"
      borderColor={scrolled ? "gray.200" : "transparent"}
      initial={reduceMotion ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container maxW="container.lg" py={4}>
        <Flex align="center" justify="space-between">
          <Link href="#" _hover={{ textDecoration: "none" }}>
            <MotionFlex
              align="center"
              gap={2}
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <MotionBox
                w={3}
                h={3}
                border="2px solid"
                borderColor="red.500"
                borderRadius="sm"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        boxShadow: [
                          "0 0 0 0 rgba(229, 62, 62, 0.4)",
                          "0 0 0 6px rgba(229, 62, 62, 0)",
                        ],
                      }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 2, repeat: Infinity, ease: "easeOut" }
                }
              />
              <Heading as="span" size="md" fontWeight="bold" letterSpacing="-0.02em">
                Redline
              </Heading>
            </MotionFlex>
          </Link>
          <HStack spacing={6} display={{ base: "none", sm: "flex" }}>
            {navLinks.map((link, i) => (
              <MotionBox
                key={link.href}
                initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.35 }}
              >
                <Link
                  href={link.href}
                  fontSize="sm"
                  fontWeight="medium"
                  color="gray.600"
                  position="relative"
                  _hover={{ color: "red.500", textDecoration: "none" }}
                  sx={{
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: "-2px",
                      w: "100%",
                      h: "2px",
                      bg: "red.500",
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.25s ease",
                    },
                    "&:hover::after": {
                      transform: "scaleX(1)",
                    },
                  }}
                >
                  {link.label}
                </Link>
              </MotionBox>
            ))}
          </HStack>
        </Flex>
      </Container>
    </MotionBox>
  );
}
