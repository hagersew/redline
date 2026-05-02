# Redline

Landing page for **Redline**, a bookmarklet that toggles a **1px solid red outline** on every element on the current page. Use it to inspect layout, nesting, padding, and alignment without devtools.

The bookmarklet turns on once, then turns off when you run it again.

## Stack

- [Vite](https://vitejs.dev/) + React 18 + TypeScript
- [Chakra UI](https://chakra-ui.com/) v2

## Development

Requires Node.js (LTS recommended).

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173/`).

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start dev server with hot reload     |
| `npm run build`   | Typecheck and produce production build in `dist/` |
| `npm run preview` | Serve the production build locally   |
| `npm run lint`    | Run ESLint                           |

## Bookmarklet source

The script body and `javascript:` URL helper live in [`src/bookmarklet/redline.ts`](src/bookmarklet/redline.ts). The UI uses the same source for the drag link, copy button, “Try on this page,” and “Add to bookmarks” fallback.

## Installing the bookmarklet

1. Open the deployed or local Redline page.
2. **Drag** the red “Redline” control to your bookmarks bar (preferred on modern browsers).
3. Or use **Copy bookmarklet URL** and create a new bookmark whose location is that URL.

Many browsers block clicking `javascript:` links directly; dragging or pasting into a bookmark is the reliable approach.

## Credits

Powered by [Hagersew](https://hagersew.com).
