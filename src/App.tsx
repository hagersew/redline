import {
  Box,
  Button,
  Container,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { getBookmarkletHref, runRedlineToggle } from "./bookmarklet/redline";

const bookmarkletHref = getBookmarkletHref();

export default function App() {
  const toast = useToast();

  async function addBookmarkToBrowser() {
    const title = "Redline";
    const url = bookmarkletHref;

    const ieExternal = window.external as
      | { AddFavorite?: (bookmarkUrl: string, title: string) => void }
      | undefined;
    if (typeof ieExternal?.AddFavorite === "function") {
      try {
        ieExternal.AddFavorite(url, title);
        toast({
          title: "Bookmark dialog opened",
          description: "Finish saving in the window your browser showed.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        return;
      } catch {
        /* fall through */
      }
    }

    if (typeof window.sidebar?.addPanel === "function") {
      try {
        window.sidebar.addPanel(title, url, "");
        toast({
          title: "Bookmark added",
          description: "Redline should appear in your bookmarks.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        return;
      } catch {
        /* fall through */
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Copied — add the bookmark yourself",
        description:
          "This browser does not allow sites to save bookmarks directly. Create a new bookmark, name it Redline, and paste the URL you just copied into the location field.",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Use drag or copy",
        description:
          "Automatic bookmarking is not available here. Drag the red Redline button to the bookmarks bar, or use Copy bookmarklet URL.",
        status: "warning",
        duration: 7000,
        isClosable: true,
      });
    }
  }

  async function copyBookmarklet() {
    try {
      await navigator.clipboard.writeText(bookmarkletHref);
      toast({
        title: "Copied",
        description: "Paste into a new bookmark’s URL field, or keep it for later.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Could not copy",
        description: "Select and copy the bookmarklet from your browser’s UI, or drag the red button instead.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  function tryOnPage() {
    runRedlineToggle();
    toast({
      title: "Toggled on this page",
      description: "Run again to turn outlines off.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <Box as="main" minH="100vh" py={{ base: 12, md: 16 }} px={4} bg="gray.50">
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          <VStack spacing={3} align="flex-start">
            <Heading as="h1" size="2xl">
              Redline
            </Heading>
            <Text fontSize="xl" color="gray.600">
              A one-click tool for curious developers or designers.
            </Text>
          </VStack>

          <Box>
            <Text mb={3} fontWeight="medium">
              Why it&apos;s useful
            </Text>
            <UnorderedList spacing={2} color="gray.700" pl={1}>
              <ListItem>
                Instantly reveals the skeleton of a page—how nested boxes stack.
              </ListItem>
              <ListItem>
                Spot padding quirks and misaligned elements faster.
              </ListItem>
              <ListItem>
                Click the bookmarklet again to toggle outlines off.
              </ListItem>
            </UnorderedList>
          </Box>

          <VStack spacing={4} align="stretch">
            <Text fontSize="sm" color="gray.600">
              <strong>Bookmarklet:</strong> drag the button below to your bookmarks bar.
              Do not rely on left-click—many browsers block{" "}
              <Text as="span" fontFamily="mono" fontSize="xs">
                javascript:
              </Text>{" "}
              links.
            </Text>
            <Button
              as={Link}
              href={bookmarkletHref}
              size="lg"
              colorScheme="red"
              _hover={{ textDecoration: "none" }}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/uri-list", bookmarkletHref);
                e.dataTransfer.setData("text/plain", bookmarkletHref);
              }}
            >
              Redline
            </Button>
            <VStack spacing={3} align="stretch">
              <Button colorScheme="gray" onClick={addBookmarkToBrowser}>
                Add to bookmarks
              </Button>
              <Button variant="outline" onClick={copyBookmarklet}>
                Copy bookmarklet URL
              </Button>
              <Button variant="ghost" onClick={tryOnPage}>
                Try on this page
              </Button>
            </VStack>
          </VStack>

          <Text fontSize="sm" color="gray.500">
            After saving, open any site and use the bookmark from your bar. Run it
            twice to turn red outlines off.
          </Text>

          <Text fontSize="xs" color="gray.400" textAlign="center" pt={4}>
            Powered by{" "}
            <Link href="https://hagersew.com" color="gray.500" isExternal>
              Hagersew
            </Link>
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
