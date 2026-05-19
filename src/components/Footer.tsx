import { Box, Container, Link, Text } from "@chakra-ui/react";
import { SectionReveal } from "./SectionReveal";

export function Footer() {
  return (
    <Box as="footer" py={10} borderTop="1px solid" borderColor="border.default">
      <Container maxW="container.lg">
        <SectionReveal delay={0.1}>
          <Text fontSize="sm" color="text.subtle" textAlign="center">
            Powered by{" "}
            <Link
              href="https://hagersew.com"
              color="text.muted"
              isExternal
              _hover={{ color: "red.500" }}
              transition="color 0.2s"
            >
              Hagersew
            </Link>
          </Text>
        </SectionReveal>
      </Container>
    </Box>
  );
}
