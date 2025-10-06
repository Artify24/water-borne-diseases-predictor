"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { WaterDropIcon, SunIcon, MapPinIcon } from "@/components/icons"
import { motion } from "framer-motion"

export default function CitizenSplashPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  const languages = [
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇮🇳" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-accent/10 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8 text-center"
      >
        {/* Logo and Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative"
        >
          <div className="flex justify-center items-center gap-4 mb-6">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
            >
              <WaterDropIcon className="w-16 h-16 text-primary" />
            </motion.div>
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
            >
              <SunIcon className="w-12 h-12 text-warning" />
            </motion.div>
          </div>

          <h1 className="text-4xl font-bold text-primary mb-2 text-balance">Arogya Dristi</h1>
          <p className="text-lg text-muted-foreground text-balance">स्वस्थ गांव, सुरक्षित पानी</p>
          <p className="text-sm text-muted-foreground">Healthy Village, Safe Water</p>
        </motion.div>

        {/* Village Illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative h-32 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent rounded-3xl" />
          <div className="relative flex items-end justify-center gap-4">
            <div className="w-16 h-20 bg-primary/20 rounded-t-lg border-2 border-primary/40" />
            <div className="w-20 h-24 bg-primary/30 rounded-t-lg border-2 border-primary/50" />
            <div className="w-16 h-20 bg-primary/20 rounded-t-lg border-2 border-primary/40" />
          </div>
          <MapPinIcon className="absolute top-2 right-8 w-8 h-8 text-danger animate-bounce" />
        </motion.div>

        {/* Language Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-4"
        >
          <p className="text-sm font-medium text-foreground">Select Language / भाषा चुनें</p>
          <div className="grid grid-cols-2 gap-3">
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedLanguage === lang.code
                    ? "border-primary bg-primary/10 shadow-lg"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="text-2xl mb-1">{lang.flag}</div>
                <div className="text-sm font-medium">{lang.name}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button
            size="lg"
            className="w-full text-lg h-14 rounded-xl shadow-lg hover:shadow-xl transition-all"
            disabled={!selectedLanguage}
            onClick={() => (window.location.href = "/citizen/login")}
          >
            <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
              Start / शुरू करें
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
