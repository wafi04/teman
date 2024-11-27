import { useEffect } from "react";
import { Search } from "lucide-react";
import { useSearchHooks } from "../../../hooks/useSearch";
import { Input } from "../input";
import { OpenSearch } from "./OpenSearch";
import { useGetProducts } from "../../../api/products/products.query";

export default function SearchInput() {
  const {
    debouncedSearch,
    handleKeyDown,
    inputRef,
    openSearch,
    searchRef,
    setDebouncedSearch,
    setOpenSearch,
    toggleSearch,
  } = useSearchHooks();
  const { data, isFetching, status } = useGetProducts(debouncedSearch);
  const product = data?.pages.flatMap((p) => p.data || []);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setOpenSearch(false);
        setDebouncedSearch("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (openSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openSearch]);

  return (
    <div ref={searchRef} className="relative">
      {!openSearch && (
        <div
          className="relative max-w-md flex cursor-pointer"
          onClick={toggleSearch}>
          <Search className="absolute right-0 rounded-full p-2 bg-gray-300 top-0 size-10 text-gray-100" />
          <Input
            readOnly
            placeholder="Search"
            className="w-full bg-gray-100 cursor-pointer rounded-full pr-10 focus:outline-none"
          />
        </div>
      )}
      {openSearch && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <OpenSearch
            data={product}
            status={status}
            inputRef={inputRef}
            handleKeyDown={handleKeyDown}
            toogleSearch={toggleSearch}
            isLoading={isFetching}
            search={debouncedSearch}
            setSearch={setDebouncedSearch}
          />
        </div>
      )}
    </div>
  );
}
