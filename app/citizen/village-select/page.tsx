"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPinIcon, HomeIcon } from "@/components/icons"
import { motion } from "framer-motion"

export default function VillageSelectPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVillage, setSelectedVillage] = useState<string | null>(null)

  const villages = [
    { id: "1", name: "Rampur", district: "Pune", state: "Maharashtra" },
    { id: "2", name: "Shivgaon", district: "Pune", state: "Maharashtra" },
    { id: "3", name: "Ganeshpur", district: "Satara", state: "Maharashtra" },
    { id: "4", name: "Laxminagar", district: "Pune", state: "Maharashtra" },
    { id: "5", name: "Krishnapur", district: "Solapur", state: "Maharashtra" },
  ]

  const filteredVillages = villages.filter((village) => village.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleContinue = () => {
    if (selectedVillage) {
      window.location.href = "/citizen/dashboard"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-accent/10 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto pt-8"
      >
        <Card className="shadow-xl border-2">
          <CardHeader className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex justify-center mb-4"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPinIcon className="w-8 h-8 text-primary" />
              </div>
            </motion.div>
            <CardTitle className="text-2xl">Select Your Village</CardTitle>
            <CardDescription className="text-base">अपना गांव चुनें</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Village / गांव खोजें</label>
              <Input
                type="text"
                placeholder="Type village name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 text-base rounded-xl"
              />
            </div>

            {/* Village List */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {filteredVillages.map((village, index) => (
                <motion.button
                  key={village.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedVillage(village.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedVillage === village.id
                      ? "border-primary bg-primary/10 shadow-md"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <HomeIcon
                      className={`w-5 h-5 mt-0.5 ${selectedVillage === village.id ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-base">{village.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {village.district}, {village.state}
                      </div>
                    </div>
                    {selectedVillage === village.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Add New Village Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 rounded-xl border-2 border-dashed border-primary/50 bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              <div className="flex items-center justify-center gap-2 text-primary font-medium">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Village / नया गांव जोड़ें
              </div>
            </motion.button>

            {/* Continue Button */}
            <Button
              size="lg"
              className="w-full h-12 rounded-xl text-base"
              onClick={handleContinue}
              disabled={!selectedVillage}
            >
              Continue / जारी रखें
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
