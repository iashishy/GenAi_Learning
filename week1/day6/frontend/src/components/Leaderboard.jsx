import { TrophyIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import CandidateCard from "./CandidateCard";

export default function Leaderboard({
    candidates,
    onSelect,
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                x: 25,
            }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-900/80"
        >
            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="rounded-2xl bg-yellow-100 p-3 dark:bg-yellow-900/30">

                        <TrophyIcon className="h-7 w-7 text-yellow-600 dark:text-yellow-400" />

                    </div>

                    <div>

                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                            AI Leaderboard
                        </h2>

                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Ranked by ATS Match Score
                        </p>

                    </div>

                </div>

                <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">

                    {candidates.length} Candidates

                </div>

            </div>

            {candidates.length === 0 ? (

                <div className="rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center transition-colors dark:border-slate-600">

                    <div className="mb-3 text-6xl">
                        🏆
                    </div>

                    <h3 className="text-xl font-semibold text-slate-700 dark:text-white">
                        No Analysis Yet
                    </h3>

                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                        Upload resumes and run TalentIQ AI to see rankings.
                    </p>

                </div>

            ) : (

                <div className="space-y-5">

                    {candidates.map((candidate, index) => (

                        <CandidateCard
                            key={candidate.candidate_id}
                            rank={index + 1}
                            candidate={candidate}
                            onClick={() => onSelect(candidate)}
                        />

                    ))}

                </div>

            )}

        </motion.div>
    );
}