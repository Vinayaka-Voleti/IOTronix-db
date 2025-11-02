"use client"

import { motion } from "framer-motion"

interface Team {
  id: number
  name: string
  rank: number
  members: string[]
}

interface AllTeamsDashboardProps {
  teams: Team[]
}

export default function AllTeamsDashboard({ teams }: AllTeamsDashboardProps) {
  // Sort teams by rank for display
  const sortedTeams = [...teams].sort((a, b) => a.rank - b.rank)

  // Group teams into 2 rows of 5
  const teamRows = [sortedTeams.slice(0, 5), sortedTeams.slice(5, 10)]

  return (
    <motion.div
      className="relative w-full max-w-7xl px-8"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.0 }}
    >
      <div className="relative p-10 rounded-2xl backdrop-blur-xl border-2 border-primary/50 bg-card/40 animate-glow">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-10">
          {/* Title */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2
              className="text-6xl font-bold text-foreground text-center mb-2"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              All Teams Summary
            </h2>
            <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full" />
            <p className="text-center text-muted-foreground mt-4 text-lg">
              Total: {teams.length} Teams • {teams.length * 5} Members
            </p>
          </motion.div>

          {/* Teams Grid - 2 rows x 5 columns */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {teamRows.map((row, rowIdx) => (
              <div key={rowIdx} className="grid grid-cols-5 gap-4">
                {row.map((team, colIdx) => {
                  const globalIdx = rowIdx * 5 + colIdx
                  return (
                    <motion.div
                      key={team.id}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.5 + globalIdx * 0.08 }}
                      className="group"
                    >
                      <div className="relative h-full p-5 rounded-xl backdrop-blur-md border-2 border-primary/40 bg-card/30 hover:bg-card/50 hover:border-primary/70 transition-all duration-300 hover:scale-105">
                        {/* Rank Badge */}
                        <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center border-2 border-card">
                          <span className="text-lg font-bold text-primary-foreground font-mono">#{team.rank}</span>
                        </div>

                        {/* Team ID */}
                        <div className="mb-3">
                          <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">Team ID</p>
                          <p className="text-2xl font-bold text-primary font-mono">{team.id}</p>
                        </div>

                        {/* Team Name */}
                        <h3
                          className="text-lg font-bold text-foreground mb-3 truncate"
                          style={{ fontFamily: "Orbitron, sans-serif" }}
                          title={team.name}
                        >
                          {team.name}
                        </h3>

                        {/* Members List */}
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Members</p>
                          <div className="space-y-1">
                            {team.members.map((member, idx) => (
                              <p
                                key={idx}
                                className="text-xs text-foreground/80 truncate px-2 py-1 rounded bg-primary/5 border border-primary/20"
                                title={member}
                              >
                                {member}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.div
            className="text-center pt-6 border-t border-primary/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <p className="text-sm text-muted-foreground">
              Press <span className="text-primary font-mono font-bold">←</span> to go back or{" "}
              <span className="text-primary font-mono font-bold">→</span> to cycle
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
