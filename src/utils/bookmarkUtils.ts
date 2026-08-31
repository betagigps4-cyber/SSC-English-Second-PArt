import { SavedExerciseBookmark } from '../types';

const STORAGE_KEY = 'ssc_saved_exercises_bookmarks';
const EVENT_NAME = 'ssc_bookmarks_changed';

/**
 * Retrieves all saved bookmarks from localStorage.
 */
export function getBookmarks(): SavedExerciseBookmark[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to load bookmarks from localStorage:', err);
    return [];
  }
}

/**
 * Checks if a specific exercise is bookmarked.
 */
export function isBookmarked(id: string): boolean {
  if (!id) return false;
  const list = getBookmarks();
  return list.some((b) => b.id === id);
}

/**
 * Saves or updates a bookmark in localStorage and notifies subscribers.
 */
export function saveBookmark(bookmark: SavedExerciseBookmark): void {
  try {
    const list = getBookmarks();
    const existingIndex = list.findIndex((b) => b.id === bookmark.id);
    let updated: SavedExerciseBookmark[];

    if (existingIndex >= 0) {
      updated = [...list];
      updated[existingIndex] = { ...bookmark, savedAt: new Date().toISOString() };
    } else {
      updated = [{ ...bookmark, savedAt: new Date().toISOString() }, ...list];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    dispatchBookmarkEvent(updated);
  } catch (err) {
    console.error('Failed to save bookmark:', err);
  }
}

/**
 * Removes a bookmark by its ID and notifies subscribers.
 */
export function removeBookmark(id: string): void {
  try {
    const list = getBookmarks();
    const updated = list.filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    dispatchBookmarkEvent(updated);
  } catch (err) {
    console.error('Failed to remove bookmark:', err);
  }
}

/**
 * Toggles a bookmark: adds if not present, removes if already present.
 * Returns true if now bookmarked, false if removed.
 */
export function toggleBookmark(bookmark: SavedExerciseBookmark): boolean {
  if (isBookmarked(bookmark.id)) {
    removeBookmark(bookmark.id);
    return false;
  } else {
    saveBookmark(bookmark);
    return true;
  }
}

/**
 * Clears all bookmarks.
 */
export function clearAllBookmarks(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    dispatchBookmarkEvent([]);
  } catch (err) {
    console.error('Failed to clear bookmarks:', err);
  }
}

/**
 * Dispatches custom event so all reactive components update instantly.
 */
function dispatchBookmarkEvent(bookmarks: SavedExerciseBookmark[]): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(EVENT_NAME, { detail: { bookmarks } })
    );
  }
}

/**
 * Subscribes to bookmark updates.
 */
export function subscribeToBookmarks(
  callback: (bookmarks: SavedExerciseBookmark[]) => void
): () => void {
  if (typeof window === 'undefined') return () => {};

  const handler = (e: Event) => {
    const custom = e as CustomEvent<{ bookmarks: SavedExerciseBookmark[] }>;
    if (custom.detail && custom.detail.bookmarks) {
      callback(custom.detail.bookmarks);
    } else {
      callback(getBookmarks());
    }
  };

  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', handler);

  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener('storage', handler);
  };
}
