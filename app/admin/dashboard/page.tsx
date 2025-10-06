"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, AlertTriangleIcon, CheckCircleIcon, BellIcon, HomeIcon } from "@/components/icons"
import { motion, AnimatePresence } from "framer-motion"

type Village = {
  id: string
  name: string
  district: string
  population: number
  riskLevel: "low" | "medium" | "high"
  activeReports: number
  lastUpdated: string
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"home" | "villages" | "alerts">("home")

  const villages: Village[] = [
    {
      id: "1",
      name: "Rampur",
      district: "Pune",
      population: 2500,
      riskLevel: "medium",
      activeReports: 12,
      lastUpdated: "2 hours ago",
    },
    {
      id: "2",
      name: "Shivgaon",
      district: "Pune",
      population: 1800,
      riskLevel: "low",
      activeReports: 3,
      lastUpdated: "1 hour ago",
    },
    {
      id: "3",
      name: "Ganeshpur",
      district: "Satara",
      population: 3200,
      riskLevel: "high",
      activeReports: 28,
      lastUpdated: "30 mins ago",
    },
    {
      id: "4",
      name: "Laxminagar",
      district: "Pune",
      population: 1500,
      riskLevel: "low",
      activeReports: 5,
      lastUpdated: "3 hours ago",
    },
  ]

  const stats = {
    totalVillages: villages.length,
    highRisk: villages.filter((v) => v.riskLevel === "high").length,
    mediumRisk: villages.filter((v) => v.riskLevel === "medium").length,
    lowRisk: villages.filter((v) => v.riskLevel === "low").length,
    totalReports: villages.reduce((sum, v) => sum + v.activeReports, 0),
  }

  const recentAlerts = [
    { id: "1", village: "Ganeshpur", type: "high", message: "Multiple cases reported", time: "30 mins ago" },
    { id: "2", village: "Rampur", type: "medium", message: "Heavy rainfall expected", time: "2 hours ago" },
    { id: "3", village: "Shivgaon", type: "low", message: "Water quality good", time: "1 day ago" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-accent/10 pb-20 md:pb-6">
      <div className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-md md:max-w-4xl lg:max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-primary">Arogya Dristi</h1>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground hidden lg:block">Village Head Mode</p>
                <Badge className="bg-primary/10 text-primary border-0 text-xs px-2 py-0 hidden lg:inline-flex">
                  Admin
                </Badge>
              </div>
            </div>
            <div className="relative">
              <BellIcon className="w-5 h-5 text-muted-foreground" />
              {stats.highRisk > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger rounded-full animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md md:max-w-4xl lg:max-w-7xl mx-auto px-6 py-6">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <Card className="border-2">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Villages</p>
                        <p className="text-2xl font-bold mt-1">{stats.totalVillages}</p>
                      </div>
                      <MapPinIcon className="w-8 h-8 text-primary opacity-20" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-danger/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">High Risk</p>
                        <p className="text-2xl font-bold mt-1 text-danger">{stats.highRisk}</p>
                      </div>
                      <AlertTriangleIcon className="w-8 h-8 text-danger opacity-20" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-warning/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Medium</p>
                        <p className="text-2xl font-bold mt-1 text-warning">{stats.mediumRisk}</p>
                      </div>
                      <AlertTriangleIcon className="w-8 h-8 text-warning opacity-20" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-safe/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Low Risk</p>
                        <p className="text-2xl font-bold mt-1 text-safe">{stats.lowRisk}</p>
                      </div>
                      <CheckCircleIcon className="w-8 h-8 text-safe opacity-20" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
                    <CardDescription>त्वरित कार्रवाई</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-24 flex-col gap-2 rounded-xl bg-transparent"
                      onClick={() => setActiveTab("villages")}
                    >
                      <MapPinIcon className="w-6 h-6 text-primary" />
                      <span className="text-sm">View Villages</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-24 flex-col gap-2 rounded-xl bg-transparent"
                      onClick={() => setActiveTab("alerts")}
                    >
                      <BellIcon className="w-6 h-6 text-danger" />
                      <span className="text-sm">Send Alert</span>
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Alerts */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl">Recent Alerts</CardTitle>
                    <CardDescription>हाल की चेतावनियां</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentAlerts.map((alert, index) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-xl border ${
                          alert.type === "high"
                            ? "bg-danger/10 border-danger/30"
                            : alert.type === "medium"
                              ? "bg-warning/10 border-warning/30"
                              : "bg-safe/10 border-safe/30"
                        }`}
                      >
                        <div className="flex gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              alert.type === "high" ? "bg-danger" : alert.type === "medium" ? "bg-warning" : "bg-safe"
                            } ${alert.type === "high" ? "animate-pulse" : ""}`}
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{alert.village}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === "villages" && (
            <motion.div
              key="villages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">All Villages</CardTitle>
                  <CardDescription>सभी गांव</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0">
                  {villages.map((village, index) => (
                    <VillageCard key={village.id} village={village} index={index} />
                  ))}
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
                  <CardTitle className="text-lg">Notification Log</CardTitle>
                  <CardDescription>सूचना लॉग</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-4 rounded-xl bg-muted/50 border">
                    <div className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-safe mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">SMS Alert Sent - Ganeshpur</p>
                        <p className="text-xs text-muted-foreground mt-1">3200 recipients • 30 mins ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 border">
                    <div className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-safe mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Health Worker Notified - Rampur</p>
                        <p className="text-xs text-muted-foreground mt-1">5 workers • 2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 border">
                    <div className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-safe mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Water Safety Alert - All Villages</p>
                        <p className="text-xs text-muted-foreground mt-1">8000 recipients • 1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
              icon={<MapPinIcon className="w-6 h-6" />}
              label="Villages"
              active={activeTab === "villages"}
              onClick={() => setActiveTab("villages")}
            />
            <NavButton
              icon={<BellIcon className="w-6 h-6" />}
              label="Alerts"
              active={activeTab === "alerts"}
              onClick={() => setActiveTab("alerts")}
              badge={stats.highRisk > 0}
            />
          </div>
        </div>
      </div>

      <div className="hidden md:block fixed left-0 top-0 h-full w-20 lg:w-64 bg-card border-r shadow-lg z-20">
        <div className="p-6">
          <h1 className="text-xl lg:text-2xl font-bold text-primary mb-2">Arogya Dristi</h1>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground hidden lg:block">Village Head Mode</p>
            <Badge className="bg-primary/10 text-primary border-0 text-xs px-2 py-0 hidden lg:inline-flex">Admin</Badge>
          </div>
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
            onClick={() => setActiveTab("villages")}
            className={`w-full flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl transition-colors ${
              activeTab === "villages" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            <MapPinIcon className="w-6 h-6 flex-shrink-0" />
            <span className="hidden lg:block font-medium">Villages</span>
          </button>
          <button
            onClick={() => setActiveTab("alerts")}
            className={`w-full flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl transition-colors relative ${
              activeTab === "alerts" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            <div className="relative">
              <BellIcon className="w-6 h-6 flex-shrink-0" />
              {stats.highRisk > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger rounded-full animate-pulse" />
              )}
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

function VillageCard({ village, index }: { village: Village; index: number }) {
  const riskConfig = {
    low: { color: "safe", label: "Low Risk", bgClass: "bg-safe/10", borderClass: "border-safe/30" },
    medium: { color: "warning", label: "Moderate", bgClass: "bg-warning/10", borderClass: "border-warning/30" },
    high: { color: "danger", label: "High Risk", bgClass: "bg-danger/10", borderClass: "border-danger/30" },
  }

  const { label, bgClass, borderClass } = riskConfig[village.riskLevel]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => (window.location.href = `/admin/village/${village.id}`)}
      className={`p-4 rounded-xl border-2 ${bgClass} ${borderClass} cursor-pointer hover:shadow-md transition-all`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-semibold">{village.name}</h3>
            <p className="text-xs text-muted-foreground">{village.district}</p>
          </div>
        </div>
        <Badge className={`${bgClass} text-${riskConfig[village.riskLevel].color} border-0 text-xs`}>{label}</Badge>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
        <span>Pop: {village.population.toLocaleString()}</span>
        <span>Reports: {village.activeReports}</span>
        <span>{village.lastUpdated}</span>
      </div>

      {village.riskLevel !== "low" && (
        <Button
          size="sm"
          className="w-full rounded-lg bg-danger hover:bg-danger/90 h-9"
          onClick={(e) => {
            e.stopPropagation()
            // Handle send alert
          }}
        >
          <AlertTriangleIcon className="w-4 h-4 mr-2" />
          Send Alert
        </Button>
      )}
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
        {badge && <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full animate-pulse" />}
      </div>
      <span className="text-xs font-medium">{label}</span>
      {active && (
        <motion.div
          layoutId="activeTabAdmin"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full"
        />
      )}
    </motion.button>
  )
}
