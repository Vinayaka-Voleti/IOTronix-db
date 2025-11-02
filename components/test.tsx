"use client"

import { motion } from "framer-motion"
import { useState, useMemo, useEffect } from "react"

interface Team {
  id: number
  name: string
  rank: number
  members: string[]
}

interface TeamsPageProps {
  teams: Team[]
}

export default function TeamsPage({ teams }: TeamsPageProps) {
  const [page, setPage] = useState(0)

  const teamsPerPage = 5
  const totalPages = Math.ceil(teams.length / teamsPerPage)

  const groupedTeams = useMemo(() => {
    const sorted = [...teams].sort((a, b) => a.rank - b.rank)
    const groups = []
    for (let i = 0; i < sorted.length; i += teamsPerPage) {
      groups.push(sorted.slice(i, i + teamsPerPage))
    }
    return groups
  }, [teams])

  // Handle "Enter" key to go to next page
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setPage((prev) => (prev + 1) % totalPages)
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [totalPages])

  return (
    <motion.div
      className="relative w-full max-w-6xl mx-auto px-6 md:px-10 py-10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative rounded-3xl backdrop-blur-2xl border border-primary/40 bg-card/30 shadow-2xl p-10">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />

        {/* Header */}
        <motion.div
          className="relative z-10 mb-10 text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2
            className="text-5xl md:text-6xl font-bold text-foreground"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Leaderboard
          </h2>
          <div className="h-1 w-2/3 mx-auto bg-gradient-to-r from-primary via-secondary to-primary rounded-full" />
          <p className="text-muted-foreground text-base md:text-lg">
            Page {page + 1} of {totalPages} • {teams.length} Teams Total
          </p>
        </motion.div>

        {/* Team Section */}
        <motion.div
          key={page} // Trigger re-animation when page changes
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 relative z-10"
        >
          {groupedTeams[page].map((team) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary via-secondary to-primary rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300" />

              <div className="pl-6 pr-4 py-6 rounded-xl border border-primary/30 bg-card/40 backdrop-blur-md hover:bg-card/60 transition-all duration-300 hover:scale-[1.01] shadow-sm hover:shadow-md">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Rank + Info */}
                  <div className="flex items-center gap-6">
                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center border-2 border-card shadow-md">
                      <span className="text-xl font-bold text-primary-foreground font-mono">
                        #{team.rank}
                      </span>
                    </div>

                    <div>
                      <h4
                        className="text-2xl font-bold text-foreground"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                      >
                        {team.name}
                      </h4>
                      <p className="text-xs text-muted-foreground font-mono mt-1">
                        Team ID: {team.id}
                      </p>
                    </div>
                  </div>

                  {/* Members */}
                  <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                    {team.members.map((member, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-lg bg-primary/10 border border-primary/20 text-foreground/90 hover:bg-primary/20 transition-colors duration-200"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination Controls */}
        <motion.div
          className="text-center pt-10 mt-10 border-t border-primary/20 space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={() => setPage((prev) => (prev - 1 + totalPages) % totalPages)}
            className="px-4 py-2 rounded-lg border border-primary/40 hover:bg-primary/20 text-foreground text-sm font-mono transition-all"
          >
            ← Prev
          </button>
          <button
            onClick={() => setPage((prev) => (prev + 1) % totalPages)}
            className="px-4 py-2 rounded-lg border border-primary/40 hover:bg-primary/20 text-foreground text-sm font-mono transition-all"
          >
            Next →
          </button>

          <p className="text-xs text-muted-foreground mt-3">
            Press <span className="text-primary font-mono font-bold">Enter</span> to view next batch
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
