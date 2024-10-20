import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import mmkvJsonStorage from './mmkvJsonStorage';

const useBookmarksStore = create(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: bookmark =>
        set(state => ({
          bookmarks: [bookmark, ...state.bookmarks],
        })),
      removeBookmark: seed =>
        set(state => ({
          bookmarks: state.bookmarks.filter(b => b.seed !== seed),
        })),
      removeAll: () =>
        set(state => ({
          bookmarks: [],
        })),
      isBookmarked: seed => {
        const {bookmarks} = get();
        return bookmarks.some(b => b.seed === seed);
      },
    }),
    {
      name: 'bookmarks-storage',
      storage: createJSONStorage(() => mmkvJsonStorage),
    },
  ),
);

export default useBookmarksStore;
