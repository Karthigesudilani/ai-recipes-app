"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Search } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  label,
  error,
  helperText,
  disabled = false,
  searchable = false,
  multiple = false,
  size = "md",
  fullWidth = false,
  className = ""
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value ? [value] : []);
  const selectRef = useRef<HTMLDivElement>(null);

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-4 py-4 text-lg"
  };

  // Filter options based on search query
  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // Get selected option(s)
  const selectedOption = options.find(option => option.value === value);
  const selectedMultipleOptions = options.filter(option => selectedOptions.includes(option.value));

  // Handle option selection
  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      const newSelectedOptions = selectedOptions.includes(optionValue)
        ? selectedOptions.filter(v => v !== optionValue)
        : [...selectedOptions, optionValue];
      setSelectedOptions(newSelectedOptions);
      onChange(newSelectedOptions.join(","));
    } else {
      onChange(optionValue);
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update selected options when value changes
  useEffect(() => {
    if (multiple && value) {
      setSelectedOptions(value.split(",").filter(v => v.trim()));
    }
  }, [value, multiple]);

  return (
    <div className={`relative ${fullWidth ? "w-full" : ""} ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}

      {/* Select Button */}
      <div
        ref={selectRef}
        className={`relative ${fullWidth ? "w-full" : ""}`}
      >
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`
            w-full flex items-center justify-between border rounded-lg transition-all duration-200
            ${sizeClasses[size]}
            ${disabled 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200" 
              : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-400 focus:border-orange-500 dark:focus:border-orange-500"
            }
            ${error 
              ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500" 
              : ""
            }
            ${isOpen && !disabled 
              ? "ring-2 ring-orange-500 border-orange-500 dark:border-orange-500" 
              : ""
            }
          `}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {multiple ? (
              <div className="flex flex-wrap gap-1">
                {selectedMultipleOptions.length > 0 ? (
                  selectedMultipleOptions.map(option => (
                    <span
                      key={option.value}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-xs rounded-md"
                    >
                      {option.icon && <span className="w-3 h-3">{option.icon}</span>}
                      {option.label}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOptionClick(option.value);
                        }}
                        className="ml-1 hover:text-orange-600"
                      >
                        ×
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">{placeholder}</span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 min-w-0">
                {selectedOption?.icon && (
                  <span className="flex-shrink-0 w-4 h-4">{selectedOption.icon}</span>
                )}
                <span className={selectedOption ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}>
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
              </div>
            )}
          </div>
          
          <ChevronDown 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
          />
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && !disabled && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl z-50 max-h-60 overflow-hidden"
            >
              {/* Search Input */}
              {searchable && (
                <div className="p-3 border-b border-gray-200 dark:border-gray-600">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search options..."
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              {/* Options List */}
              <div className="max-h-48 overflow-y-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => {
                    const isSelected = multiple 
                      ? selectedOptions.includes(option.value)
                      : value === option.value;
                    
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleOptionClick(option.value)}
                        className={`
                          w-full px-4 py-3 text-left transition-all duration-150 flex items-center gap-3
                          ${isSelected
                            ? "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-200"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                          }
                        `}
                      >
                        {multiple && (
                          <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${isSelected ? "border-orange-500 bg-orange-500" : "border-gray-300"}`}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                        )}
                        
                        {option.icon && (
                          <span className="flex-shrink-0 w-4 h-4">{option.icon}</span>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{option.label}</div>
                          {option.description && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              {option.description}
                            </div>
                          )}
                        </div>
                        
                        {!multiple && isSelected && (
                          <Check className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                    {searchable && searchQuery ? "No options found" : "No options available"}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
} 