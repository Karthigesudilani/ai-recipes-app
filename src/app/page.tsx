"use client";

import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  HeroSection,
  ProblemSolutionSection,
  HowItWorksSection,
  BenefitsSection,
  CTASection
} from "../components/Home";

export default function Home() {
  return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Navigation */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Header />
      </motion.div>

      {/* Hero Section */}
      <HeroSection />

      {/* Problem & Solution */}
      <ProblemSolutionSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Benefits */}
      <BenefitsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}