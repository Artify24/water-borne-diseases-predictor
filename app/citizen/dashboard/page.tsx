"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  WaterDropIcon,
  SunIcon,
  CloudRainIcon,
  ThermometerIcon,
  ActivityIcon,
  HomeIcon,
  BellIcon,
  FileTextIcon,
  VolumeIcon,
} from "@/components/icons"
import { motion, AnimatePresence } from "framer-motion"

type WaterSource = "tap" | "well" | "river" | null
type Weather = "sunny" | "cloudy" | "rainy" | null
type Symptom = "fever" | "diarrhea" | "vomiting" | "none"

export default function CitizenDashboardPage() {
  const [activeTab, setActiveTab] = useState<"home" | "report" | "alerts">("home")
  const [waterSource, setWaterSource] = useState<WaterSource>(null)
  const [weather, setWeather] = useState<Weather>(null)
  const [symptoms, setSymptoms] = useState<Symptom[]>([])
  const [showResult, setShowResult] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleSymptom = (symptom: Symptom) => {
    if (symptom === "none") {
      setSymptoms(["none"])
    } else {
      const filtered = symptoms.filter((s) => s !== "none")
      if (symptoms.includes(symptom)) {
        setSymptoms(filtered.filter((s) => s !== symptom))
      } else {
        setSymptoms([...filtered, symptom])
      }
    }
  }

  const calculateRisk = () => {
    let riskScore = 0
    if (waterSource === "river") riskScore += 3
    if (waterSource === "well") riskScore += 2
    if (weather === "rainy") riskScore += 2
    if (symptoms.includes("fever")) riskScore += 2
    if (symptoms.includes("diarrhea")) riskScore += 3
    if (symptoms.includes("vomiting")) riskScore += 2

    if (riskScore >= 6) return "high"
    if (riskScore >= 3) return "medium"
    return "low"
  }

  const handleSubmit = () => {
    setShowResult(true)
    setActiveTab("home")
  }

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying)
    // In a real app, this would trigger audio playback
  }

  const canSubmit = waterSource && weather && symptoms.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-accent/10 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-primary">Arogya Dristi</h1>
              <p className="text-sm text-muted-foreground">Rampur Village</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={handlePlayAudio}>
                <VolumeIcon className={`w-5 h-5 ${isPlaying ? "text-primary animate-pulse" : ""}`} />
              </Button>
              <div className="relative">
                <BellIcon className="w-5 h-5 text-muted-foreground" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-6 py-6">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0"
            >
              {showResult && (
                <div className="md:col-span-2">
                  <RiskResultCard risk={calculateRisk()} />
                </div>
              )}

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
                  <CardDescription>त्वरित कार्रवाई</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2 rounded-xl bg-transparent"
                    onClick={() => setActiveTab("report")}
                  >
                    <FileTextIcon className="w-6 h-6 text-primary" />
                    <span className="text-sm">Report Health</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2 rounded-xl bg-transparent">
                    <WaterDropIcon className="w-6 h-6 text-primary" />
                    <span className="text-sm">Water Quality</span>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Recent Alerts</CardTitle>
                  <CardDescription>हाल की चेतावनियां</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <AlertItem
                    type="warning"
                    title="Moderate Risk Detected"
                    description="Heavy rainfall expected. Boil water before drinking."
                    time="2 hours ago"
                  />
                  <AlertItem
                    type="safe"
                    title="Water Quality Good"
                    description="Recent tests show safe water levels."
                    time="1 day ago"
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "report" && (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Health Report</CardTitle>
                  <CardDescription>स्वास्थ्य रिपोर्ट</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Water Source */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <WaterDropIcon className="w-4 h-4 text-primary" />
                      Water Source / पानी का स्रोत
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <OptionCard
                        icon={<WaterDropIcon className="w-8 h-8" />}
                        label="Tap"
                        sublabel="नल"
                        selected={waterSource === "tap"}
                        onClick={() => setWaterSource("tap")}
                        color="primary"
                      />
                      <OptionCard
                        icon={
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" strokeWidth="2" />
                            <path strokeWidth="2" d="M12 6v12M6 12h12" />
                          </svg>
                        }
                        label="Well"
                        sublabel="कुआं"
                        selected={waterSource === "well"}
                        onClick={() => setWaterSource("well")}
                        color="primary"
                      />
                      <OptionCard
                        icon={
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeWidth="2"
                              strokeLinecap="round"
                              d="M3 12c0-3 2-5 4-6s4-1 5 0 3 1 5 0 4 5 4 6-2 5-4 6-4 1-5 0-3-1-5 0-4-3-4-6z"
                            />
                          </svg>
                        }
                        label="River"
                        sublabel="नदी"
                        selected={waterSource === "river"}
                        onClick={() => setWaterSource("river")}
                        color="primary"
                      />
                    </div>
                  </div>

                  {/* Weather */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <SunIcon className="w-4 h-4 text-warning" />
                      Weather / मौसम
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <OptionCard
                        icon={<SunIcon className="w-8 h-8" />}
                        label="Sunny"
                        sublabel="धूप"
                        selected={weather === "sunny"}
                        onClick={() => setWeather("sunny")}
                        color="warning"
                      />
                      <OptionCard
                        icon={
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
                            />
                          </svg>
                        }
                        label="Cloudy"
                        sublabel="बादल"
                        selected={weather === "cloudy"}
                        onClick={() => setWeather("cloudy")}
                        color="muted"
                      />
                      <OptionCard
                        icon={<CloudRainIcon className="w-8 h-8" />}
                        label="Rainy"
                        sublabel="बारिश"
                        selected={weather === "rainy"}
                        onClick={() => setWeather("rainy")}
                        color="primary"
                      />
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <ThermometerIcon className="w-4 h-4 text-danger" />
                      Symptoms / लक्षण
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <SymptomCard
                        icon={<ThermometerIcon className="w-8 h-8" />}
                        label="Fever"
                        sublabel="बुखार"
                        selected={symptoms.includes("fever")}
                        onClick={() => toggleSymptom("fever")}
                      />
                      <SymptomCard
                        icon={<ActivityIcon className="w-8 h-8" />}
                        label="Diarrhea"
                        sublabel="दस्त"
                        selected={symptoms.includes("diarrhea")}
                        onClick={() => toggleSymptom("diarrhea")}
                      />
                      <SymptomCard
                        icon={
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        }
                        label="Vomiting"
                        sublabel="उल्टी"
                        selected={symptoms.includes("vomiting")}
                        onClick={() => toggleSymptom("vomiting")}
                      />
                      <SymptomCard
                        icon={
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        }
                        label="None"
                        sublabel="कोई नहीं"
                        selected={symptoms.includes("none")}
                        onClick={() => toggleSymptom("none")}
                      />
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full h-12 rounded-xl text-base"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                  >
                    Submit Report / रिपोर्ट जमा करें
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "alerts" && (
            <motion.div
              key="alerts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">All Notifications</CardTitle>
                  <CardDescription>सभी सूचनाएं</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <AlertItem
                    type="warning"
                    title="Moderate Risk Detected"
                    description="Heavy rainfall expected. Boil water before drinking."
                    time="2 hours ago"
                  />
                  <AlertItem
                    type="safe"
                    title="Water Quality Good"
                    description="Recent tests show safe water levels."
                    time="1 day ago"
                  />
                  <AlertItem
                    type="danger"
                    title="High Risk Alert"
                    description="Multiple cases reported. Avoid untreated water."
                    time="3 days ago"
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg md:hidden">
        <div className="max-w-md mx-auto px-6 py-3">
          <div className="flex items-center justify-around">
            <NavButton
              icon={<HomeIcon className="w-6 h-6" />}
              label="Home"
              active={activeTab === "home"}
              onClick={() => setActiveTab("home")}
            />
            <NavButton
              icon={<FileTextIcon className="w-6 h-6" />}
              label="Report"
              active={activeTab === "report"}
              onClick={() => setActiveTab("report")}
            />
            <NavButton
              icon={<BellIcon className="w-6 h-6" />}
              label="Alerts"
              active={activeTab === "alerts"}
              onClick={() => setActiveTab("alerts")}
              badge
            />
          </div>
        </div>
      </div>

      <div className="hidden md:block fixed left-0 top-0 h-full w-20 lg:w-64 bg-card border-r shadow-lg">
        <div className="p-6">
          <h1 className="text-xl lg:text-2xl font-bold text-primary mb-2">Arogya Dristi</h1>
          <p className="text-sm text-muted-foreground hidden lg:block">Rampur Village</p>
        </div>
        <nav className="px-3 space-y-2">
          <button
            onClick={() => setActiveTab("home")}
            className={`w-full flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl transition-colors ${
              activeTab === "home" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            <HomeIcon className="w-6 h-6 flex-shrink-0" />
            <span className="hidden lg:block font-medium">Home</span>
          </button>
          <button
            onClick={() => setActiveTab("report")}
            className={`w-full flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl transition-colors ${
              activeTab === "report" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            <FileTextIcon className="w-6 h-6 flex-shrink-0" />
            <span className="hidden lg:block font-medium">Report</span>
          </button>
          <button
            onClick={() => setActiveTab("alerts")}
            className={`w-full flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl transition-colors relative ${
              activeTab === "alerts" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            <div className="relative">
              <BellIcon className="w-6 h-6 flex-shrink-0" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger rounded-full" />
            </div>
            <span className="hidden lg:block font-medium">Alerts</span>
          </button>
        </nav>
      </div>

      <style jsx global>{`
        @media (min-width: 768px) {
          body {
            padding-left: 5rem;
          }
        }
        @media (min-width: 1024px) {
          body {
            padding-left: 16rem;
          }
        }
      `}</style>
    </div>
  )
}

function RiskResultCard({ risk }: { risk: "low" | "medium" | "high" }) {
  const config = {
    low: {
      color: "safe",
      bgClass: "bg-safe",
      textClass: "text-safe-foreground",
      borderClass: "border-safe",
      title: "Low Risk",
      titleHindi: "कम जोखिम",
      message: "Water is safe. Continue normal activities.",
      messageHindi: "पानी सुरक्षित है। सामान्य गतिविधियां जारी रखें।",
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    medium: {
      color: "warning",
      bgClass: "bg-warning",
      textClass: "text-warning-foreground",
      borderClass: "border-warning",
      title: "Moderate Risk",
      titleHindi: "मध्यम जोखिम",
      message: "Boil water before drinking. Monitor health.",
      messageHindi: "पीने से पहले पानी उबालें। स्वास्थ्य की निगरानी करें।",
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
    high: {
      color: "danger",
      bgClass: "bg-danger",
      textClass: "text-danger-foreground",
      borderClass: "border-danger",
      title: "High Risk",
      titleHindi: "उच्च जोखिम",
      message: "Urgent: Use only treated water. Contact health worker.",
      messageHindi: "तत्काल: केवल उपचारित पानी का उपयोग करें। स्वास्थ्य कार्यकर्ता से संपर्क करें।",
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
  }

  const { bgClass, textClass, borderClass, title, titleHindi, message, messageHindi, icon } = config[risk]

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <Card className={`border-4 ${borderClass} shadow-xl`}>
        <CardContent className={`${bgClass} ${textClass} p-6 rounded-lg`}>
          <div className="flex items-start gap-4">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {icon}
            </motion.div>
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-sm opacity-90">{titleHindi}</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">{message}</p>
                <p className="opacity-90">{messageHindi}</p>
              </div>
            </div>
          </div>

          {risk !== "low" && (
            <div className="mt-4 flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1 rounded-lg">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call Help
              </Button>
              <Button variant="secondary" size="sm" className="flex-1 rounded-lg">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

function OptionCard({
  icon,
  label,
  sublabel,
  selected,
  onClick,
  color,
}: {
  icon: React.ReactNode
  label: string
  sublabel: string
  selected: boolean
  onClick: () => void
  color: string
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`p-4 rounded-xl border-2 transition-all ${
        selected ? `border-${color} bg-${color}/10 shadow-md` : "border-border bg-card hover:border-primary/50"
      }`}
    >
      <div className={`mb-2 ${selected ? `text-${color}` : "text-muted-foreground"}`}>{icon}</div>
      <div className="text-xs font-medium">{label}</div>
      <div className="text-xs text-muted-foreground">{sublabel}</div>
    </motion.button>
  )
}

function SymptomCard({
  icon,
  label,
  sublabel,
  selected,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  sublabel: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`p-4 rounded-xl border-2 transition-all ${
        selected ? "border-danger bg-danger/10 shadow-md" : "border-border bg-card hover:border-danger/50"
      }`}
    >
      <div className={`mb-2 ${selected ? "text-danger" : "text-muted-foreground"}`}>{icon}</div>
      <div className="text-sm font-medium">{label}</div>
      <div className="text-xs text-muted-foreground">{sublabel}</div>
    </motion.button>
  )
}

function AlertItem({
  type,
  title,
  description,
  time,
}: {
  type: "safe" | "warning" | "danger"
  title: string
  description: string
  time: string
}) {
  const colorClass = type === "safe" ? "text-safe" : type === "warning" ? "text-warning" : "text-danger"
  const bgClass = type === "safe" ? "bg-safe/10" : type === "warning" ? "bg-warning/10" : "bg-danger/10"

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-4 rounded-xl border ${bgClass}`}
    >
      <div className="flex gap-3">
        <div className={`w-2 h-2 rounded-full mt-2 ${colorClass.replace("text-", "bg-")}`} />
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          <p className="text-xs text-muted-foreground mt-2">{time}</p>
        </div>
      </div>
    </motion.div>
  )
}

function NavButton({
  icon,
  label,
  active,
  onClick,
  badge,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
  badge?: boolean
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
        active ? "text-primary" : "text-muted-foreground"
      }`}
    >
      <div className="relative">
        {icon}
        {badge && <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full" />}
      </div>
      <span className="text-xs font-medium">{label}</span>
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full"
        />
      )}
    </motion.button>
  )
}
