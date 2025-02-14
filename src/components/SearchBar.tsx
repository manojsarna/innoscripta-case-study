import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNewsStore } from "../store";

const placeholders = ["news...", "technology...", "sports...", "health..."];
const TYPING_SPEED = 150;
const BACKSPACE_SPEED = 100;
const DEBOUNCE_DELAY = 500; // Prevents unnecessary API calls

export function SearchBar() {
  const { setQuery } = useNewsStore();
  const [input, setInput] = useState("");
  const [typingState, setTypingState] = useState({
    index: 0,
    subIndex: 0,
    deleting: false,
  });

  const timeoutRef = useRef<number | null>(null); // Prevents re-renders

  const currentText = useMemo(
    () => placeholders[typingState.index],
    [typingState.index]
  );

  // Typing animation effect
  useEffect(() => {
    if (input) return; // Stop animation if user is typing

    const updateTyping = () => {
      setTypingState((prev) => {
        if (prev.deleting) {
          return prev.subIndex === 0
            ? {
                index: (prev.index + 1) % placeholders.length,
                subIndex: 0,
                deleting: false,
              }
            : { ...prev, subIndex: prev.subIndex - 1 };
        } else {
          return prev.subIndex === currentText.length
            ? { ...prev, deleting: true }
            : { ...prev, subIndex: prev.subIndex + 1 };
        }
      });
    };

    const delay = typingState.deleting ? BACKSPACE_SPEED : TYPING_SPEED;
    timeoutRef.current = setTimeout(updateTyping, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [typingState, currentText, input]); // Restart animation when input is cleared

  // Debounce effect for search query (Only updates when necessary)
  useEffect(() => {
    if (!input.trim()) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setQuery(input);
    }, DEBOUNCE_DELAY);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [input, setQuery]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (input.trim()) setQuery(input);
    },
    [input, setQuery]
  );

  return (
    <form
      onSubmit={handleSearch}
      className="w-full p-4 mx-auto lg:max-w-screen-xl sm:max-w-xl md:max-w-full"
    >
      <input
        type="text"
        placeholder={`Search ${currentText.substring(0, typingState.subIndex)}`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white transition-all"
      />
    </form>
  );
}
