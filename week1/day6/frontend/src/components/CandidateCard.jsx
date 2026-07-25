import { motion } from "framer-motion";
import {
    TrophyIcon,
    UserCircleIcon,
    CheckBadgeIcon,
} from "@heroicons/react/24/solid";

export default function CandidateCard({
    candidate,
    rank,
    onClick,
}) {
    const medal =
        rank === 1
            ? "🥇"
            : rank === 2
                ? "🥈"
                : rank === 3
                    ? "🥉"
                    : `#${rank}`;

    const badgeColor =
        candidate.overall_score >= 90
            ? "from-green-500 to-emerald-500"
            : candidate.overall_score >= 75
                ? "from-blue-500 to-indigo-500"
                : "from-orange-500 to-red-500";

    return (
        <motion.div
            whileHover={{
                y: -4,
                scale: 1.01,
            }}
            whileTap={{
                scale: 0.98,
            }}
            onClick={onClick}
            className="cursor-pointer rounded-3xl border border-white/40 bg-white/80 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800/80"
        >
            <div className="flex items-start justify-between">

                <div className="flex gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg">

                        <UserCircleIcon className="h-9 w-9" />

                    </div>

                    <div>

                        <div className="flex items-center gap-2">

                            <span className="text-xl">
                                {medal}
                            </span>

                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                                {candidate.candidate_name}
                            </h3>

                        </div>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {candidate.recommendation}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-2">

                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                Resume
                            </span>

                            <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">

                                <CheckBadgeIcon className="h-4 w-4" />

                                AI Verified

                            </span>

                        </div>

                    </div>

                </div>

                <div className="text-right">

                    <div
                        className={`rounded-2xl bg-gradient-to-r ${badgeColor} px-5 py-3 text-white shadow-lg`}
                    >

                        <p className="text-3xl font-bold">
                            {candidate.overall_score}%
                        </p>

                        <p className="text-xs opacity-90">
                            ATS Score
                        </p>

                    </div>

                </div>

            </div>
        </motion.div>
    );
}