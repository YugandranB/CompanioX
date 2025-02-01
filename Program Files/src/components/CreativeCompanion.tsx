"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, PenTool, Music, Camera, Code } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Feature {
  icon: React.ElementType;
  label: string;
  prompt: string;
}

const features: Feature[] = [
  { icon: PenTool, label: "Writing Assistant", prompt: "Help me write a creative story about..." },
  { icon: Music, label: "Song Inspiration", prompt: "Generate lyrics about..." },
  { icon: Camera, label: "Visual Ideas", prompt: "Describe a scene where..." },
  { icon: Code, label: "Creative Coding", prompt: "Help me create an algorithm for..." },
] as const;

export default function CreativeCompanion() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature>(features[0]!);

  const generateResponse = async () => {
    if (typeof window === "undefined") return;
    
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI("XXXXXXXXXXXXXXXXXX");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const result = await model.generateContent([
        `You are a creative assistant specialized in ${selectedFeature.label.toLowerCase()}.`,
        prompt
      ]);

      const response = await result.response;
      setResponse(response.text());
    } catch (error) {
      console.error(error);
      setResponse("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-4 gap-6">
        {features.map((feature) => (
          <motion.button
            key={feature.label}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedFeature(feature);
              setPrompt(feature.prompt);
            }}
            className={`p-6 rounded-xl border backdrop-blur-sm ${
              selectedFeature.label === feature.label
                ? "border-violet-500 bg-violet-50/50"
                : "border-gray-200 hover:border-violet-300 bg-white/50"
            } transition-all duration-200 shadow-sm hover:shadow-md`}
          >
            <feature.icon className="w-6 h-6 mb-2 mx-auto" />
            <p className="text-sm font-medium">{feature.label}</p>
          </motion.button>
        ))}
      </div>

      <div className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What would you like to create today?"
          className="w-full h-32 p-4 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 resize-none shadow-sm"
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={generateResponse}
          disabled={loading || !prompt}
          className="w-full py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate
            </>
          )}
        </motion.button>
      </div>

      {response && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md"
        >
          <pre className="whitespace-pre-wrap font-sans">{response}</pre>
        </motion.div>
      )}
    </div>
  );
}
