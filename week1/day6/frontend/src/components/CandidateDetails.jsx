import { motion } from "framer-motion";
import {
    UserCircleIcon,
    TrophyIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    SparklesIcon,
} from "@heroicons/react/24/solid";

export default function CandidateDetails({ candidate }) {
    if (!candidate) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-3xl border border-white/40 bg-white/80 p-12 text-center shadow-xl backdrop-blur-xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-900/80"
            >
                <UserCircleIcon className="mx-auto h-20 w-20 text-slate-300 dark:text-slate-600" />

                <h2 className="mt-5 text-2xl font-bold text-slate-700 dark:text-white">
                    No Candidate Selected
                </h2>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Click any candidate from the leaderboard to view the AI
                    evaluation.
                </p>
            </motion.div>
        );
    }

    const score = candidate.overall_score;

    const scoreColor =
        score >= 90
            ? "from-green-500 to-emerald-500"
            : score >= 75
                ? "from-blue-500 to-indigo-500"
                : "from-orange-500 to-red-500";

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/40 bg-white/80 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-900/80"
        >
            {/* Header */}

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-5">

                    <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-4 shadow-lg">

                        <UserCircleIcon className="h-14 w-14 text-white" />

                    </div>

                    <div>

                        <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
                            {candidate.candidate_name}
                        </h2>

                        <p className="text-slate-500 dark:text-slate-400">
                            AI Candidate Evaluation
                        </p>

                    </div>

                </div>

                <div
                    className={`rounded-3xl bg-gradient-to-r ${scoreColor} px-7 py-5 text-center text-white shadow-lg`}
                >
                    <div className="flex items-center justify-center gap-2">

                        <TrophyIcon className="h-6 w-6" />

                        <span className="text-4xl font-bold">
                            {score}%
                        </span>

                    </div>

                    <p className="mt-1 text-sm opacity-90">
                        ATS Match Score
                    </p>

                </div>

            </div>

            {/* Recommendation */}

            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-800 dark:bg-blue-950/30">

                <div className="flex items-center gap-3">

                    <SparklesIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />

                    <div>

                        <h3 className="font-bold text-blue-700 dark:text-blue-300">
                            AI Recommendation
                        </h3>

                        <p className="mt-1 text-slate-700 dark:text-slate-300">
                            {candidate.recommendation}
                        </p>

                    </div>

                </div>

            </div>

            {/* Skills */}

            <div className="mt-8 grid gap-6 lg:grid-cols-2">

                {/* Strengths */}

                <div className="rounded-2xl border border-green-100 bg-green-50 p-5 dark:border-green-800 dark:bg-green-950/20">

                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-green-700 dark:text-green-300">

                        <CheckCircleIcon className="h-6 w-6" />

                        Strengths

                    </h3>

                    <div className="flex flex-wrap gap-2">

                        {candidate.strengths.map((skill) => (

                            <span
                                key={skill}
                                className="rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white"
                            >
                                {skill}
                            </span>

                        ))}

                    </div>

                </div>

                {/* Missing Skills */}

                <div className="rounded-2xl border border-red-100 bg-red-50 p-5 dark:border-red-800 dark:bg-red-950/20">

                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-red-700 dark:text-red-300">

                        <ExclamationTriangleIcon className="h-6 w-6" />

                        Missing Skills

                    </h3>

                    <div className="flex flex-wrap gap-2">

                        {candidate.missing_skills.map((skill) => (

                            <span
                                key={skill}
                                className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white"
                            >
                                {skill}
                            </span>

                        ))}

                    </div>

                </div>

            </div>

            {/* Summary */}

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-colors dark:border-slate-700 dark:bg-slate-800">

                <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-white">
                    AI Summary
                </h3>

                <p className="leading-8 text-slate-600 dark:text-slate-300">
                    {candidate.summary}
                </p>

            </div>

        </motion.div>
    );
}