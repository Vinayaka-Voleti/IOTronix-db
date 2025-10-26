"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ParticleBackground from "@/components/particle-background"
import TeamCard from "@/components/team-card"
import Image from "next/image"
import { teams } from "@/data/teams";

export default function LeaderboardPage() {
  const [teams, setTeams] = useState([])
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/get-teams/")
      .then((res) => res.json())
      .then((data) => setTeams(data.teams || []))
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "ArrowRight") {
        setDirection(1)
        setCurrentTeamIndex((prev) => (prev + 1) % teams.length)
      } else if (e.key === "ArrowLeft") {
        setDirection(-1)
        setCurrentTeamIndex((prev) => (prev - 1 + teams.length) % teams.length)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [teams])

  const currentTeam = teams[currentTeamIndex]

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <ParticleBackground />

     <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-20 py-10">
        <div className="flex items-center gap-4">
          <Image
            src="/Elab.png"
            alt="ELabs"
            width={64}
            height={64}
            className="drop-shadow-[0_0_20px_rgba(255,140,0,0.7)]"
          />

          <h2
            className="text-5xl font-extrabold flex items-center tracking-wider"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
          </h2>
        </div>
        <div className="flex items-end gap-6">
          <div className="flex items-center gap-3">
           <Image
            src="/head.png"
            alt="IoTronix"
            width={288}
            height={100}
            className="drop-shadow-[0_0_25px_rgba(0,255,255,0.6)] animate-glow-slow"
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
          {currentTeam && (
            <motion.div
              key={currentTeam.id}
              initial={{ opacity: 0, x: 100 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 * direction }}
              transition={{ duration: 0.6 }}
            >
              <TeamCard team={currentTeam} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
