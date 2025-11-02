"use client"

import { motion } from "framer-motion"
import { useState, useMemo } from "react"

interface ParticipantsPageProps {
  participants: string[]
}

export default function ParticipantsPage({ participants }: ParticipantsPageProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const groupedParticipants = useMemo(() => {
    const cols = 6 // More columns for better space utilization
    const groups = []
    for (let i = 0; i < participants.length; i += cols) {
      groups.push(participants.slice(i, i + cols))
    }
    return groups
  }, [participants])

  return (
    <motion.div
      className="relative w-full h-full px-4 py-8 flex items-center justify-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.0 }}
    >
      <div className="relative w-full max-w-6xl p-8 rounded-2xl backdrop-blur-xl border-2 border-primary/50 bg-card/40 animate-glow max-h-[90vh] overflow-y-auto">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Title */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2
              className="text-4xl md:text-5xl font-bold text-foreground text-center mb-2"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >

              Congratulations!! Selected Participants
            </h2>
            <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full" />
            {/* <p className="text-center text-muted-foreground mt-3 text-base md:text-lg">
              Total: Participants

            </p> */}
          </motion.div>

          {/* Participants Grid */}
          <motion.div
            className="grid gap-3 md:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, staggerChildren: 0.02 }}
          >
            {groupedParticipants.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3"
              >
                {row.map((participant, colIdx) => {
                  const globalIdx = rowIdx * 6 + colIdx
                  return (
                    <motion.div
                      key={globalIdx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + globalIdx * 0.01 }}
                      onMouseEnter={() => setSelectedIndex(globalIdx)}
                      onMouseLeave={() => setSelectedIndex(null)}
                      className="group cursor-pointer"
                    >
                      <div className="relative">
                        <div
                          className={`p-2 md:p-3 rounded-lg border-2 transition-all duration-300 ${
                            selectedIndex === globalIdx
                              ? "bg-primary/30 border-primary scale-105"
                              : "bg-primary/10 border-primary/30 hover:border-primary/60"
                          }`}
                        >
                          {/* Serial Number */}
                          <div className="text-xs text-muted-foreground font-mono mb-1">#{globalIdx + 1}</div>

                          {/* Participant Name */}
                          <p className="text-xs md:text-sm font-semibold text-foreground break-words line-clamp-2">
                            {participant}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ))}
          </motion.div>

          {/* <motion.div
            className="text-center pt-4 border-t border-primary/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <p className="text-xs md:text-sm text-muted-foreground">
              Press <span className="text-primary font-mono font-bold">→</span> to view Team 1
            </p>
          </motion.div> */}
        </div>
      </div>
    </motion.div>
  )
}
