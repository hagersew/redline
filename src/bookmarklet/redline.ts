/** IIFE body only (no javascript: prefix). ES5-ish for bookmark bar compatibility. */
export const REDLINE_BOOKMARKLET_BODY =
  "(function(){var w=window,k='__redline_active';if(w[k]){document.querySelectorAll('*').forEach(function(e){e.style.outline='';});delete w[k];}else{w[k]=1;document.querySelectorAll('*').forEach(function(e){e.style.outline='1px solid red';});}})();";

export function getBookmarkletHref(): string {
  return `javascript:${encodeURIComponent(REDLINE_BOOKMARKLET_BODY)}`;
}

/** Run the same toggle as the bookmarklet (for “Try on this page”). */
export function runRedlineToggle(): void {
  new Function(REDLINE_BOOKMARKLET_BODY)();
}
