"use client";

import { motion } from "framer-motion";
import CreativeCompanion from "@/components/CreativeCompanion";

export default function HomePage() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-violet-50 via-background to-blue-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
            CompanioX
          </h1>
          <p className="text-lg text-muted-foreground">
            Your Intelligent AI Companion
          </p>
        </div>
        <CreativeCompanion />
      </motion.div>
    </main>
  );
}
