"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import notesData from "@/libs/data";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  const performSearch = (searchQuery) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const results = notesData.filter((note) => {
      const titleMatch = note.judul
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const contentMatch = note.notes
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const categoryMatch = note.kategori
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return titleMatch || contentMatch || categoryMatch;
    });

    setSearchResults(results);
    setShowResults(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (note) => {
    setShowResults(false);
    setQuery(note.judul);
    router.push(`/notes/${note.id}`);
  };

  return (
    <div className="relative w-full lg:w-96 search-container">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowResults(true)}
          placeholder="Cari judul catatan..."
          className="w-full px-5 py-3 pl-12 pr-4 rounded-2xl border-0 bg-white/95 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-500 text-sm font-medium"
        />

        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <svg
            className="w-5 h-5 text-emerald-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </div>

        {query && (
          <button
            onClick={() => {
              setQuery("");
              setShowResults(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 text-gray-400 hover:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-80 overflow-y-auto">
          {searchResults.length > 0 ? (
            <>
              <div className="p-3 text-sm text-gray-500 border-b bg-gray-50 rounded-t-xl">
                Ditemukan {searchResults.length} hasil untuk "{query}"
              </div>
              <div className="p-2">
                {searchResults.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => handleResultClick(note)}
                    className="px-3 py-3 hover:bg-emerald-50 rounded-lg cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-800 hover:text-emerald-700 transition-colors">
                          {note.judul}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {note.notes}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="inline-block px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full font-medium">
                            {note.kategori}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-4 text-center">
              <div className="text-gray-400 mb-2">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33C5.175 12.025 4.8 11.36 4.8 10.667V6.333c0-.693.375-1.358 1.12-2.003C7.533 3.881 9.66 3 12 3s4.467.881 6.08 2.33c.745.645 1.12 1.31 1.12 2.003v4.334c0 .693-.375 1.358-1.12 2.003A7.962 7.962 0 0112 15z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-500">
                Tidak ada catatan yang ditemukan untuk "{query}"
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Coba gunakan kata kunci yang berbeda
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
