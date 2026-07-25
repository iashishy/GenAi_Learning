import { motion } from "framer-motion";
import {
    SparklesIcon,
    CpuChipIcon,
    ShieldCheckIcon,
    SunIcon,
    MoonIcon,
} from "@heroicons/react/24/solid";

import { useTheme } from "../context/ThemeContext";

export default function Header() {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 border-b border-white/30 bg-white/70 backdrop-blur-xl shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-900/70">

            <div className="mx-auto max-w-7xl px-8 py-5">

                <div className="flex items-center justify-between">

                    {/* Logo */}

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-4"
                    >

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 shadow-xl">

                            <CpuChipIcon className="h-8 w-8 text-white" />

                        </div>

                        <div>

                            <h1 className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
                                TalentIQ AI
                            </h1>

                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Intelligent Resume Intelligence Platform
                            </p>

                        </div>

                    </motion.div>

                    {/* Right */}

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-4"
                    >

                        <div className="hidden md:flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 dark:bg-green-900/30">

                            <ShieldCheckIcon className="h-5 w-5 text-green-600 dark:text-green-400" />

                            <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                                Recruiter Portal
                            </span>

                        </div>

                        <div className="hidden md:flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 dark:bg-blue-900/30">

                            <SparklesIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />

                            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                                AI Powered
                            </span>

                        </div>

                        {/* Theme Button */}

                        <motion.button
                            whileHover={{
                                scale: 1.08,
                                rotate: 10,
                            }}
                            whileTap={{
                                scale: 0.95,
                            }}
                            onClick={toggleTheme}
                            className="rounded-2xl bg-slate-100 p-3 shadow-md transition-all hover:shadow-xl dark:bg-slate-800"
                        >
                            {darkMode ? (
                                <SunIcon className="h-6 w-6 text-yellow-400" />
                            ) : (
                                <MoonIcon className="h-6 w-6 text-slate-700" />
                            )}
                        </motion.button>

                    </motion.div>

                </div>

            </div>

        </header>
    );
}