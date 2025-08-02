import React, { useState, useRef, useEffect } from "react";

type Category = {
  id: number;
  name: string;
  color: string;
};

interface CategoryDropdownProps {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categories,
  selectedId,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCategory =
    categories.find((cat) => cat.id.toString() === selectedId) || null;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-center border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        {selectedCategory ? (
          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full border"
              style={{ backgroundColor: selectedCategory.color }}
            ></span>
            {selectedCategory.name}
          </div>
        ) : (
          <span className="text-gray-400">Sem categoria</span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow z-10 max-h-60 overflow-y-auto">
          <div
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
            onClick={() => {
              onSelect("");
              setOpen(false);
            }}
          >
            Sem categoria
          </div>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex items-center gap-2"
              onClick={() => {
                onSelect(cat.id.toString());
                setOpen(false);
              }}
            >
              <span
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: cat.color }}
              ></span>
              {cat.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};