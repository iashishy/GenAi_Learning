import { useState } from "react";
import { motion } from "framer-motion";
import {
    UserGroupIcon,
    TrophyIcon,
    DocumentTextIcon,
    CpuChipIcon,
} from "@heroicons/react/24/outline";

import Header from "../components/Header";
import ResumeUpload from "../components/ResumeUpload";
import JobDescription from "../components/JobDescription";
import Leaderboard from "../components/Leaderboard";
import CandidateDetails from "../components/CandidateDetails";
import LoadingOverlay from "../components/LoadingOverlay";

export default function Home() {
    const [files, setFiles] = useState([]);
    const [jobDescription, setJobDescription] = useState("");
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [loading, setLoading] = useState(false);

    const bestScore =
        candidates.length > 0
            ? Math.max(
                ...candidates.map(
                    (c) =>
                        c.overall_score ??
                        c.ats_score ??
                        c.score ??
                        0
                )
            )
            : "--";

    const stats = [
        {
            title: "Candidates",
            value: candidates.length,
            icon: UserGroupIcon,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-100 dark:bg-blue-900/30",
        },
        {
            title: "Best Score",
            value: bestScore === "--" ? "--" : `${bestScore}%`,
            icon: TrophyIcon,
            color: "text-yellow-600 dark:text-yellow-400",
            bg: "bg-yellow-100 dark:bg-yellow-900/30",
        },
        {
            title: "Uploaded",
            value: files.length,
            icon: DocumentTextIcon,
            color: "text-purple-600 dark:text-purple-400",
            bg: "bg-purple-100 dark:bg-purple-900/30",
        },
        {
            title: "AI Status",
            value: loading ? "Analyzing..." : "Ready",
            icon: CpuChipIcon,
            color: loading
                ? "text-orange-600 dark:text-orange-400"
                : "text-green-600 dark:text-green-400",
            bg: loading
                ? "bg-orange-100 dark:bg-orange-900/30"
                : "bg-green-100 dark:bg-green-900/30",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 transition-colors duration-500 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

            <Header />

            {loading && <LoadingOverlay />}

            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-7xl px-6 py-8"
            >
                {/* Dashboard */}

                <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                    {stats.map((item, index) => {

                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="rounded-3xl border border-white/40 bg-white/80 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-900/80"
                            >
                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {item.title}
                                        </p>

                                        <h2 className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">
                                            {item.value}
                                        </h2>

                                    </div>

                                    <div
                                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
                                    >
                                        <Icon className={`h-7 w-7 ${item.color}`} />
                                    </div>

                                </div>

                            </motion.div>
                        );
                    })}
                </div>

                <div className="grid gap-8 lg:grid-cols-[420px_1fr]">

                    <div className="space-y-8">

                        <ResumeUpload
                            files={files}
                            setFiles={setFiles}
                        />

                        <JobDescription
                            files={files}
                            jobDescription={jobDescription}
                            setJobDescription={setJobDescription}
                            setCandidates={setCandidates}
                            setSelectedCandidate={setSelectedCandidate}
                            loading={loading}
                            setLoading={setLoading}
                        />

                    </div>

                    <div className="space-y-8">

                        <Leaderboard
                            candidates={candidates}
                            onSelect={setSelectedCandidate}
                        />

                        <CandidateDetails
                            candidate={selectedCandidate}
                        />

                    </div>

                </div>

            </motion.div>

        </div>
    );
}