"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { motion } from "framer-motion";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "outlined" | "filled";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = "default",
      size = "md",
      fullWidth = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = "transition-all duration-200 focus:outline-none";
    
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

    const inputClasses = `
      ${baseClasses}
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${fullWidth ? "w-full" : ""}
      ${leftIcon ? "pl-12" : ""}
      ${rightIcon ? "pr-12" : ""}
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
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <motion.div
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <input
              ref={ref}
              className={inputClasses}
              {...props}
            />
          </motion.div>
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <div className="mt-2">
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
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input; 