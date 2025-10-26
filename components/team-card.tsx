"use client"

import { motion } from "framer-motion"

interface TeamCardProps {
  team: {
    id: number
    name: string
    rank: number
    // score: number
    members: string[]
  }
}

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <motion.div
      className="relative w-full max-w-2xl"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.0 }}
    >
      <div className="relative p-12 rounded-2xl backdrop-blur-xl border-2 border-primary/50 bg-card/40 animate-glow">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-8">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-lg opacity-50" />
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary-foreground font-mono">#{team.rank}</span>
                </div>
              </div>
              {/* <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Rank</p>
                <p className="text-sm text-muted-foreground">Position</p>
              </div> */}
            </motion.div>

            <motion.div
              className="text-right"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Team ID</p>
              <p className="text-4xl font-bold text-primary font-mono">{team.id}</p>
            </motion.div>
          </div>

          {/* Team Name */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <h2 className="text-5xl font-bold text-foreground" style={{ fontFamily: "Orbitron, sans-serif" }}>
              {team.name}
            </h2>
            <div className="h-1 w-150 bg-gradient-to-r from-primary to-secondary rounded-full mt-4" />
          </motion.div>

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Team Members</p>
            <div className="grid grid-cols-2 gap-3">
              {team.members.map((member, idx) => (
                <motion.div
                  key={idx}
                  className="px-4 py-3 rounded-lg bg-primary/10 border border-primary/30 hover:border-primary/60 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                >
                  <p className="text-sm font-medium text-foreground">{member}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
