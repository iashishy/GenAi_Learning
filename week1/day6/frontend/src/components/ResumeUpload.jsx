import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import {
    CloudArrowUpIcon,
    DocumentTextIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

export default function ResumeUpload({ files, setFiles }) {
    const onDrop = (acceptedFiles) => {
        setFiles((prev) => [...prev, ...acceptedFiles]);
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
        accept: {
            "application/pdf": [".pdf"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
                ".docx",
            ],
        },
    });

    return (
        <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-900/80"
        >
            <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-white">
                Upload Resumes
            </h2>

            <div
                {...getRootProps()}
                className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300

${isDragActive
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 scale-[1.02]"
                        : "border-slate-300 hover:border-blue-500 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800/50"
                    }`}
            >
                <input {...getInputProps()} />

                <CloudArrowUpIcon className="mx-auto mb-4 h-14 w-14 text-blue-600 dark:text-blue-400" />

                <h3 className="text-lg font-semibold text-slate-700 dark:text-white">
                    {isDragActive
                        ? "Drop your resumes here..."
                        : "Drag & Drop Resume Files"}
                </h3>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    PDF • DOC • DOCX
                </p>

                <button
                    type="button"
                    className="mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl"
                >
                    Browse Files
                </button>
            </div>

            {files.length > 0 && (
                <div className="mt-6">

                    <h3 className="mb-4 font-semibold text-slate-700 dark:text-white">
                        Uploaded Files ({files.length})
                    </h3>

                    <div className="space-y-3">

                        {files.map((file, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3 transition-colors dark:bg-slate-800"
                            >
                                <div className="flex items-center gap-3 overflow-hidden">

                                    <DocumentTextIcon className="h-6 w-6 flex-shrink-0 text-blue-600 dark:text-blue-400" />

                                    <div className="overflow-hidden">

                                        <p className="truncate font-medium text-slate-800 dark:text-white">
                                            {file.name}
                                        </p>

                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {(file.size / 1024).toFixed(1)} KB
                                        </p>

                                    </div>

                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile(index);
                                    }}
                                    className="rounded-full p-2 transition hover:bg-red-100 dark:hover:bg-red-900/30"
                                >
                                    <XMarkIcon className="h-5 w-5 text-red-500" />
                                </button>

                            </motion.div>
                        ))}

                    </div>

                </div>
            )}
        </motion.div>
    );
}