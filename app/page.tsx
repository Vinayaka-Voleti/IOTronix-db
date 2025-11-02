"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ParticleBackground from "@/components/particle-background"
import TeamCard from "@/components/team-card"
import ParticipantsPage from "@/components/participants-page"
import AllTeamsDashboard from "@/components/all-teams-dashboard"
import Image from "next/image"

export default function LeaderboardPage() {
  const [teams, setTeams] = useState([])
  const [participants, setParticipants] = useState([])
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/get-teams/")
      .then((res) => res.json())
      .then((data) => setTeams(data.teams || []))

    fetch("http://127.0.0.1:8000/get-participants/")
      .then((res) => res.json())
      .then((data) => setParticipants(data.participants || []))
  }, [])

  // 0 = participants page, 1-10 = teams 1-10, 11 = all teams dashboard
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "ArrowRight") {
        setDirection(1)
        setCurrentPageIndex((prev) => {
          const maxIndex = teams.length + 1 // 0 (participants) + 1-10 (teams) + 11 (dashboard)
          return (prev + 1) % (maxIndex + 1)
        })
      } else if (e.key === "ArrowLeft") {
        setDirection(-1)
        setCurrentPageIndex((prev) => {
          const maxIndex = teams.length + 1
          return (prev - 1 + (maxIndex + 1)) % (maxIndex + 1)
        })
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [teams])

  const getPageContent = () => {
    if (currentPageIndex === 0) {
      return <ParticipantsPage participants={participants} />
    } else if (currentPageIndex <= teams.length) {
      return <TeamCard team={teams[currentPageIndex - 1]} />
    } else {
      return <AllTeamsDashboard teams={teams} />
    }
  }

  const showNavbar = currentPageIndex <= teams.length

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <ParticleBackground />

      {showNavbar && (
        <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-20 py-10">
          <div className="flex items-center gap-4">
            <Image
              src="/Elab.png"
              alt="ELabs"
              width={64}
              height={64}
              className="drop-shadow-[0_0_20px_rgba(255,140,0,0.7)]"
            />
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
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-orange-500">
                  – Dashboard
                </span>
              </h1>
            </div>
          </div>
          <div className="w-16 h-16" />
        </header>
      )}

      <main className={`relative w-full h-full flex items-center justify-center ${showNavbar ? "mt-16" : ""}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPageIndex}
            initial={{ opacity: 0, x: 100 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 * direction }}
            transition={{ duration: 0.6 }}
          >
            {getPageContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
      </div>
    </div>
  )
}
