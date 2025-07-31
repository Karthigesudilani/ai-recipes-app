"use client";

import { forwardRef, TextareaHTMLAttributes } from "react";
import { motion } from "framer-motion";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "default" | "outlined" | "filled";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  rows?: number;
  maxLength?: number;
  showCharacterCount?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      variant = "default",
      size = "md",
      fullWidth = false,
      rows = 4,
      maxLength,
      showCharacterCount = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = "transition-all duration-200 focus:outline-none resize-none";
    
    const variantClasses = {
      default: "border-2 border-gray-200 focus:border-orange-500 bg-white",
      outlined: "border-2 border-gray-300 focus:border-orange-500 bg-transparent",
      filled: "border-2 border-transparent focus:border-orange-500 bg-gray-50 focus:bg-white"
    };

    const sizeClasses = {
      sm: "px-3 py-2 text-sm rounded-lg",
      md: "px-4 py-3 text-base rounded-xl",
      lg: "px-5 py-4 text-lg rounded-2xl"
    };

    const textareaClasses = `
      ${baseClasses}
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${fullWidth ? "w-full" : ""}
      ${error ? "border-red-500 focus:border-red-500" : ""}
      ${className}
    `.trim();

    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
        )}
        
        <motion.div
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <textarea
            ref={ref}
            className={textareaClasses}
            rows={rows}
            maxLength={maxLength}
            {...props}
          />
        </motion.div>
        
        {(error || helperText || (showCharacterCount && maxLength)) && (
          <div className="mt-2 flex items-center justify-between">
            <div>
              {error && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {error}
                </p>
              )}
              {helperText && !error && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {helperText}
                </p>
              )}
            </div>
            
            {showCharacterCount && maxLength && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {props.value?.toString().length || 0}/{maxLength}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea; 