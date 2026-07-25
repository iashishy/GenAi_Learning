import { motion } from "framer-motion";
import {
    CpuChipIcon,
    DocumentTextIcon,
    MagnifyingGlassIcon,
    ChartBarIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";

const steps = [
    {
        icon: DocumentTextIcon,
        title: "Reading uploaded resumes",
    },
    {
        icon: MagnifyingGlassIcon,
        title: "Extracting skills & experience",
    },
    {
        icon: CpuChipIcon,
        title: "Matching against job description",
    },
    {
        icon: ChartBarIcon,
        title: "Calculating ATS scores",
    },
    {
        icon: SparklesIcon,
        title: "Generating AI recommendations",
    },
];

export default function LoadingOverlay() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-xl rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl"
            >
                {/* Logo */}

                <div className="flex flex-col items-center">

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "linear",
                        }}
                        className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-5 shadow-xl"
                    >
                        <CpuChipIcon className="h-10 w-10 text-white" />
                    </motion.div>

                    <h2 className="mt-6 text-3xl font-bold text-white">
                        TalentIQ AI
                    </h2>

                    <p className="mt-2 text-slate-400">
                        Our AI is analyzing every resume...
                    </p>

                </div>

                {/* Steps */}

                <div className="mt-10 space-y-4">

                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, x: -25 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                transition={{
                                    delay: index * 0.35,
                                }}
                                className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-4"
                            >
                                <Icon className="h-6 w-6 text-blue-400" />

                                <span className="font-medium text-slate-200">
                                    {step.title}
                                </span>

                                <motion.div
                                    animate={{
                                        opacity: [0.2, 1, 0.2],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.5,
                                    }}
                                    className="ml-auto h-3 w-3 rounded-full bg-green-500"
                                />
                            </motion.div>
                        );
                    })}

                </div>

                {/* Progress */}

                <div className="mt-8">

                    <div className="h-3 overflow-hidden rounded-full bg-slate-700">

                        <motion.div
                            animate={{
                                x: ["-100%", "100%"],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 1.6,
                                ease: "linear",
                            }}
                            className="h-full w-1/2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                        />

                    </div>

                </div>

            </motion.div>
        </motion.div>
    );
}