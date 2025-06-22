import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const FastLoader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [revealedColumns, setRevealedColumns] = useState<number[]>([]);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        // First show the black background
        const blackBackgroundTimer = setTimeout(() => {
            setShowLoading(true);

            // Then start the column reveal
            const revealTimers = [0, 1, 2, 3].map((index) =>
                setTimeout(() => {
                    setRevealedColumns((prev) => [...prev, index]);
                }, 200 + index * 200)
            );

            const completeTimer = setTimeout(() => {
                setIsLoading(false);
            }, 1300);

            return () => {
                revealTimers.forEach((timer) => clearTimeout(timer));
                clearTimeout(completeTimer);
            };
        }, 500); // Initial delay before showing loading animation

        return () => {
            clearTimeout(blackBackgroundTimer);
        };
    }, []);

    const columnVariants = {
        hidden: { height: "100vh", y: 0 },
        visible: (i: number) => ({
            height: 0 * i,
            y: "-100vh",
            transition: {
                duration: 1.5,
                ease: [0.65, 0, 0.35, 1] as const,
                delay: 0,
            },
        }),
    };

    return (
        <AnimatePresence>
            {isLoading && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    {/* Black background that fades out */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: showLoading ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-black"
                    />

                    {/* Loading animation */}
                    {showLoading && (
                        <>
                            <div className="flex h-full w-full">
                                {[0, 1, 2, 3].map((index) => (
                                    <motion.div
                                        key={index}
                                        custom={index}
                                        initial="hidden"
                                        animate={revealedColumns.includes(index) ? "visible" : "hidden"}
                                        variants={columnVariants}
                                        className={`h-full w-1/4 border-gray-600 ${
                                            index % 2 === 0 ? "bg-yellow-300" : "bg-yellow-300"
                                        }`}
                                    />
                                ))}
                            </div>

                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: 0 }}
                                    transition={{ delay: 1, duration: 0.3 }}
                                    className="text-center"
                                >
                                    <h1 className="text-9xl font-bold text-red-800 font-stretch-100% cur">Fastoos</h1>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: 0 }}
                                    transition={{ delay: 1, duration: 0.3 }}
                                    className="mt-5"
                                >
                                    <motion.div
                                        style={{
                                            width: 30,
                                            height: 30,
                                            borderRadius: "50%",
                                            border: "5px solid rgba(0, 0, 0, 0.1)",
                                            borderTopColor: "red",
                                        }}
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                </motion.div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </AnimatePresence>
    );
};

export default FastLoader;