"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  WaterDropIcon,
  ThermometerIcon,
  AlertTriangleIcon,
  PhoneIcon,
  ShareIcon,
  MapPinIcon,
  BellIcon,
  ActivityIcon,
} from "@/components/icons";
import { motion, AnimatePresence } from "framer-motion";

export default function VillageDetailPage() {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"timeline" | "actions" | "info">(
    "timeline"
  );

  type RiskLevel = "low" | "medium" | "high";

  // Mock data
  const village: {
    id: string;
    name: string;
    district: string;
    state: string;
    population: number;
    riskLevel: RiskLevel;
    activeReports: number;
    lastUpdated: string;
  } = {
    id: "1",
    name: "Rampur",
    district: "Pune",
    state: "Maharashtra",
    population: 2500,
    riskLevel: "medium" as const,
    activeReports: 12,
    lastUpdated: "2 hours ago",
  };

  const submissions = [
    {
      id: "1",
      date: "2 hours ago",
      reporter: "Anonymous",
      waterSource: "Well",
      weather: "Rainy",
      symptoms: ["Fever", "Diarrhea"],
      riskLevel: "high" as const,
    },
    {
      id: "2",
      date: "5 hours ago",
      reporter: "Villager #234",
      waterSource: "River",
      weather: "Cloudy",
      symptoms: ["Vomiting"],
      riskLevel: "medium" as const,
    },
    {
      id: "3",
      date: "1 day ago",
      reporter: "Anonymous",
      waterSource: "Tap",
      weather: "Sunny",
      symptoms: ["Fever"],
      riskLevel: "low" as const,
    },
    {
      id: "4",
      date: "1 day ago",
      reporter: "Villager #156",
      waterSource: "Well",
      weather: "Rainy",
      symptoms: ["Diarrhea", "Vomiting"],
      riskLevel: "high" as const,
    },
    {
      id: "5",
      date: "2 days ago",
      reporter: "Anonymous",
      waterSource: "Tap",
      weather: "Sunny",
      symptoms: ["None"],
      riskLevel: "low" as const,
    },
  ];

  const handleSendAlert = () => {
    console.log("Sending alert:", alertMessage);
    setShowAlertDialog(false);
    setAlertMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-accent/10 pb-20 md:pb-6">
      <div className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-md md:max-w-4xl lg:max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg -ml-2"
                onClick={() => (window.location.href = "/admin/dashboard")}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-primary">
                  {village.name}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {village.district}, {village.state}
                </p>
              </div>
            </div>
            <Badge
              className={`${
                village.riskLevel === "high"
                  ? "bg-danger/10 text-danger"
                  : village.riskLevel === "medium"
                  ? "bg-warning/10 text-warning"
                  : "bg-safe/10 text-safe"
              } border-0`}
            >
              {village.riskLevel === "high"
                ? "High Risk"
                : village.riskLevel === "medium"
                ? "Moderate"
                : "Low Risk"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-md md:max-w-4xl lg:max-w-7xl mx-auto px-6 py-6">
        <AnimatePresence mode="wait">
          {activeTab === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 md:grid md:grid-cols-3 md:gap-6 md:space-y-0"
            >
              {village.riskLevel !== "low" && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`p-5 rounded-xl border-2 md:col-span-3 ${
                    village.riskLevel === "high"
                      ? "bg-danger/10 border-danger animate-pulse"
                      : "bg-warning/10 border-warning"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <AlertTriangleIcon
                      className={`w-6 h-6 ${
                        village.riskLevel === "high"
                          ? "text-danger"
                          : "text-warning"
                      }`}
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">
                        {village.riskLevel === "high"
                          ? "High Risk Alert!"
                          : "Moderate Risk"}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {village.activeReports} health reports in last 24 hours
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 rounded-lg bg-danger hover:bg-danger/90"
                      onClick={() => setShowAlertDialog(true)}
                    >
                      <PhoneIcon className="w-4 h-4 mr-2" />
                      Send SMS
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 rounded-lg bg-transparent"
                    >
                      <ShareIcon className="w-4 h-4 mr-2" />
                      Notify Workers
                    </Button>
                  </div>
                </motion.div>
              )}

              <Card className="border-2 md:col-span-3">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">
                    Health Reports Timeline
                  </CardTitle>
                  <CardDescription>स्वास्थ्य रिपोर्ट समयरेखा</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0">
                  {submissions.map((submission, index) => (
                    <SubmissionCard
                      key={submission.id}
                      submission={submission}
                      index={index}
                    />
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "actions" && (
            <motion.div
              key="actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0"
            >
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                  <CardDescription>त्वरित कार्रवाई</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full h-14 rounded-xl text-base justify-start gap-3"
                    onClick={() => setShowAlertDialog(true)}
                  >
                    <PhoneIcon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-semibold">Send SMS Alert</div>
                      <div className="text-xs opacity-80">
                        Broadcast to all villagers
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full h-14 rounded-xl text-base justify-start gap-3 bg-transparent"
                  >
                    <PhoneIcon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-semibold">Call Health Workers</div>
                      <div className="text-xs opacity-80">
                        Contact nearby medical staff
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full h-14 rounded-xl text-base justify-start gap-3 bg-transparent"
                  >
                    <ShareIcon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-semibold">Share Instructions</div>
                      <div className="text-xs opacity-80">
                        Water treatment guidelines
                      </div>
                    </div>
                  </Button>
                </CardContent>
              </Card>

              {/* Notification Log */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Notification Log</CardTitle>
                  <CardDescription>सूचना लॉग</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-4 rounded-xl bg-muted/50 border">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-safe mt-2" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">SMS Alert Sent</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          2500 recipients • 1 hour ago
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 border">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-safe mt-2" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Health Worker Notified
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          3 workers • 3 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "info" && (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Village Information</CardTitle>
                  <CardDescription>गांव की जानकारी</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">
                      Population
                    </span>
                    <span className="font-semibold">
                      {village.population.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">
                      Active Reports
                    </span>
                    <span className="font-semibold">
                      {village.activeReports}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">
                      District
                    </span>
                    <span className="font-semibold">{village.district}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">State</span>
                    <span className="font-semibold">{village.state}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-muted-foreground">
                      Last Updated
                    </span>
                    <span className="font-semibold text-sm">
                      {village.lastUpdated}
                    </span>
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
              icon={<ActivityIcon className="w-6 h-6" />}
              label="Timeline"
              active={activeTab === "timeline"}
              onClick={() => setActiveTab("timeline")}
            />
            <NavButton
              icon={<BellIcon className="w-6 h-6" />}
              label="Actions"
              active={activeTab === "actions"}
              onClick={() => setActiveTab("actions")}
            />
            <NavButton
              icon={<MapPinIcon className="w-6 h-6" />}
              label="Info"
              active={activeTab === "info"}
              onClick={() => setActiveTab("info")}
            />
          </div>
        </div>
      </div>

      <div className="hidden md:block fixed left-0 top-0 h-full w-20 lg:w-64 bg-card border-r shadow-lg z-20">
        <div className="p-6">
          <button
            onClick={() => (window.location.href = "/admin/dashboard")}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-4"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="hidden lg:block text-sm">Back to Dashboard</span>
          </button>
          <h1 className="text-xl lg:text-2xl font-bold text-primary mb-2">
            {village.name}
          </h1>
          <p className="text-sm text-muted-foreground hidden lg:block">
            {village.district}, {village.state}
          </p>
        </div>
        <nav className="px-3 space-y-2">
          <button
            onClick={() => setActiveTab("timeline")}
            className={`w-full flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl transition-colors ${
              activeTab === "timeline"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <ActivityIcon className="w-6 h-6 flex-shrink-0" />
            <span className="hidden lg:block font-medium">Timeline</span>
          </button>
          <button
            onClick={() => setActiveTab("actions")}
            className={`w-full flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl transition-colors ${
              activeTab === "actions"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <BellIcon className="w-6 h-6 flex-shrink-0" />
            <span className="hidden lg:block font-medium">Actions</span>
          </button>
          <button
            onClick={() => setActiveTab("info")}
            className={`w-full flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl transition-colors ${
              activeTab === "info"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <MapPinIcon className="w-6 h-6 flex-shrink-0" />
            <span className="hidden lg:block font-medium">Info</span>
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

      <AnimatePresence>
        {showAlertDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
            onClick={() => setShowAlertDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full"
            >
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Send Alert to Village</CardTitle>
                  <CardDescription>गांव को अलर्ट भेजें</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Alert Message</label>
                    <Textarea
                      placeholder="Type your alert message..."
                      value={alertMessage}
                      onChange={(e) => setAlertMessage(e.target.value)}
                      className="rounded-xl"
                      rows={4}
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-warning/10 border border-warning/30">
                    <p className="text-sm">
                      This will send SMS to approximately {village.population}{" "}
                      people
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-xl bg-transparent"
                      onClick={() => setShowAlertDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 rounded-xl bg-danger hover:bg-danger/90"
                      onClick={handleSendAlert}
                    >
                      Send Alert
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SubmissionCard({
  submission,
  index,
}: {
  submission: {
    id: string;
    date: string;
    reporter: string;
    waterSource: string;
    weather: string;
    symptoms: string[];
    riskLevel: "low" | "medium" | "high";
  };
  index: number;
}) {
  const riskConfig = {
    low: {
      color: "safe",
      bgClass: "bg-safe/10",
      borderClass: "border-safe/30",
    },
    medium: {
      color: "warning",
      bgClass: "bg-warning/10",
      borderClass: "border-warning/30",
    },
    high: {
      color: "danger",
      bgClass: "bg-danger/10",
      borderClass: "border-danger/30",
    },
  };

  const { color, bgClass, borderClass } = riskConfig[submission.riskLevel];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`p-4 rounded-xl border ${bgClass} ${borderClass}`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-2 h-2 rounded-full mt-2 bg-${color}`} />
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {submission.date}
            </span>
            <Badge className={`${bgClass} text-${color} border-0 text-xs`}>
              {submission.riskLevel === "high"
                ? "High"
                : submission.riskLevel === "medium"
                ? "Medium"
                : "Low"}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <WaterDropIcon className="w-4 h-4 text-primary" />
              <span>{submission.waterSource}</span>
            </div>
            <div className="flex items-center gap-2">
              {submission.weather === "Sunny" ? (
                <svg
                  className="w-4 h-4 text-warning"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="5" strokeWidth="2" />
                  <path
                    strokeWidth="2"
                    d="M12 1v6m0 6v6M23 12h-6m-6 0H1m17.66-5.66l-4.24 4.24m-4.24 4.24L5.34 19.66m0-15.32l4.24 4.24m4.24 4.24l4.24 4.24"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
                  />
                </svg>
              )}
              <span>{submission.weather}</span>
            </div>
          </div>

          {submission.symptoms.length > 0 &&
            submission.symptoms[0] !== "None" && (
              <div className="flex items-center gap-2 text-sm">
                <ThermometerIcon className="w-4 h-4 text-danger" />
                <span className="text-muted-foreground">Symptoms:</span>
                <span>{submission.symptoms.join(", ")}</span>
              </div>
            )}

          <div className="text-xs text-muted-foreground">
            Reporter: {submission.reporter}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function NavButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
        active ? "text-primary" : "text-muted-foreground"
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
      {active && (
        <motion.div
          layoutId="activeTabVillage"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full"
        />
      )}
    </motion.button>
  );
}
