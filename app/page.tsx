"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ParticleBackground from "@/components/particle-background"
import TeamCard from "@/components/team-card"

import { teams } from "@/data/teams";

export default function LeaderboardPage() {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setDirection(1)
  //     setCurrentTeamIndex((prev) => (prev + 1) % teams.length)
  //   }, 5000) // Change team every 5 seconds

  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setDirection(1)
        setCurrentTeamIndex((prev) => (prev + 1) % teams.length)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  const currentTeam = teams[currentTeamIndex]

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <ParticleBackground />

     <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-20 py-10">
        <div className="flex items-center gap-4">
          <img
            src="/Elab.png"
            alt="ELabs"
            className="w-16 h-16 drop-shadow-[0_0_20px_rgba(255,140,0,0.7)]"
          />
          <h2
            className="text-5xl font-extrabold flex items-center tracking-wider"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            {/* <span className="text-orange-500">E</span>
            <span className="text-white">Labs</span>
            <span className="text-orange-500">.</span> */}
          </h2>
        </div>
        <div className="flex items-end gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/head.png"
              alt="IoTronix"
              className="w-72 h-auto drop-shadow-[0_0_25px_rgba(0,255,255,0.6)] animate-glow-slow"
            />
            <h1
              className="text-5xl font-bold tracking-widest text-white"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-orange-500">
                – Dashboard
              </span>
            </h1>
          </div>
        </div>

        <div className="w-16 h-16" />
      </header>

      <main className="relative w-full h-full flex items-center justify-center mt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTeam.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
          >
            <TeamCard team={currentTeam} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
