import { useToast } from "@chakra-ui/react";
import { getBookmarkletHref, runRedlineToggle } from "../bookmarklet/redline";

const bookmarkletHref = getBookmarkletHref();

export function useBookmarkletHref() {
  return bookmarkletHref;
}

export function useBookmarkletActions() {
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
        description:
          "Select and copy the bookmarklet from your browser’s UI, or drag the red button instead.",
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

  return {
    bookmarkletHref,
    addBookmarkToBrowser,
    copyBookmarklet,
    tryOnPage,
  };
}
