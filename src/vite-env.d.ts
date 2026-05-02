/// <reference types="vite/client" />

/** Old Firefox sidebar bookmark API; rarely present today. */
interface Window {
  sidebar?: {
    addPanel?: (title: string, url: string, sidebarUrl: string) => void;
  };
}
