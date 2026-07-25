import { motion } from "framer-motion";
import {
    SparklesIcon,
    CpuChipIcon,
} from "@heroicons/react/24/outline";
import api from "../services/api";
import toast from "react-hot-toast";

export default function JobDescription({
    files,
    jobDescription,
    setJobDescription,
    setCandidates,
    setSelectedCandidate,
    loading,
    setLoading,
}) {
    async function analyze() {
        if (files.length === 0) {
            toast.error("Please upload at least one resume.");
            return;
        }

        if (!jobDescription.trim()) {
            toast.error("Please enter the Job Description.");
            return;
        }

        const formData = new FormData();

        formData.append("job_description", jobDescription);

        files.forEach((file) => {
            formData.append("files", file);
        });

        let loadingToast;

        try {
            setLoading(true);

            loadingToast = toast.loading(
                "🤖 TalentIQ AI is analyzing resumes..."
            );

            const response = await api.post("/analyze", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setCandidates(response.data.candidates);

            if (response.data.candidates.length > 0) {
                setSelectedCandidate(response.data.candidates[0]);
            } else {
                setSelectedCandidate(null);
            }

            toast.dismiss(loadingToast);

            toast.success(
                `${response.data.candidates.length} candidate${response.data.candidates.length !== 1 ? "s" : ""
                } analyzed successfully!`
            );
        } catch (error) {
            console.error(error);

            toast.dismiss(loadingToast);

            toast.error("Analysis failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-900/80"
        >
            {/* Header */}

            <div className="mb-5 flex items-center gap-3">

                <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-3">

                    <SparklesIcon className="h-6 w-6 text-white" />

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                        AI Job Description
                    </h2>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Describe your ideal candidate
                    </p>

                </div>

            </div>

            {/* Textarea */}

            <textarea
                rows={12}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder={`Example:

Looking for a Python Backend Developer with Django, REST APIs, PostgreSQL, AWS, Docker and Kubernetes experience.

Must have strong problem-solving skills and cloud deployment experience.`}
                className="w-full resize-none rounded-2xl border border-slate-300 bg-white p-5 text-slate-800 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-blue-900/30"
            />

            {/* Footer */}

            <div className="mt-3 flex items-center justify-between">

                <p className="text-sm text-slate-500 dark:text-slate-400">
                    {jobDescription.length} characters
                </p>

                <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    AI Ready
                </div>

            </div>

            {/* Button */}

            <motion.button
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                disabled={loading}
                onClick={analyze}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70"
            >
                <CpuChipIcon
                    className={`h-6 w-6 ${loading ? "animate-spin" : ""
                        }`}
                />

                {loading
                    ? "Analyzing Resumes..."
                    : "Analyze with TalentIQ AI"}

            </motion.button>

        </motion.div>
    );
}