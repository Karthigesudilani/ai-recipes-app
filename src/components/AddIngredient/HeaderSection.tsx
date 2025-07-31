"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HeaderSection() {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
      <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
        Step 1: Add Your Ingredients
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        What&apos;s in Your Kitchen?
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Let&apos;s turn your ingredients into delicious recipes!
      </p>
    </div>
  );
} 