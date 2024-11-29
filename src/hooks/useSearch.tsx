import { useRef, useState } from "react";

export function useSearchHooks() {
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    setOpenSearch(!openSearch);
    if (!openSearch) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    } else {
      setDebouncedSearch("");
    }
  };

  return {
    debouncedSearch,
    setDebouncedSearch,
    openSearch,
    setOpenSearch,
    searchRef,
    inputRef,
    toggleSearch,
  };
}
