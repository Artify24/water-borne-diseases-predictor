"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PhoneIcon } from "@/components/icons"
import { motion } from "framer-motion"

export default function CitizenLoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])

  const handleSendOTP = () => {
    if (phoneNumber.length === 10) {
      setShowOTP(true)
    }
  }

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleVerifyOTP = () => {
    if (otp.every((digit) => digit !== "")) {
      window.location.href = "/citizen/village-select"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-accent/10 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
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
                <PhoneIcon className="w-8 h-8 text-primary" />
              </div>
            </motion.div>
            <CardTitle className="text-2xl">Login / लॉगिन</CardTitle>
            <CardDescription className="text-base">
              {showOTP ? "Enter OTP sent to your phone" : "Enter your mobile number"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {!showOTP ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mobile Number / मोबाइल नंबर</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">+91</span>
                    <Input
                      type="tel"
                      placeholder="9876543210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="pl-12 h-12 text-lg rounded-xl"
                      maxLength={10}
                    />
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full h-12 rounded-xl text-base"
                  onClick={handleSendOTP}
                  disabled={phoneNumber.length !== 10}
                >
                  Send OTP / OTP भेजें
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <label className="text-sm font-medium">Enter 6-digit OTP / 6 अंकों का OTP दर्ज करें</label>
                  <div className="flex gap-2 justify-between">
                    {otp.map((digit, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Input
                          id={`otp-${index}`}
                          type="text"
                          inputMode="numeric"
                          value={digit}
                          onChange={(e) => handleOTPChange(index, e.target.value)}
                          className={`w-12 h-14 text-center text-xl font-bold rounded-xl ${
                            digit ? "border-primary bg-primary/5" : ""
                          }`}
                          maxLength={1}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    size="lg"
                    className="w-full h-12 rounded-xl text-base"
                    onClick={handleVerifyOTP}
                    disabled={otp.some((digit) => digit === "")}
                  >
                    Verify & Continue / सत्यापित करें
                  </Button>

                  <button
                    onClick={() => setShowOTP(false)}
                    className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Change Number / नंबर बदलें
                  </button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          By continuing, you agree to our Terms & Privacy Policy
        </motion.p>
      </motion.div>
    </div>
  )
}
