import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { toolbox } from "@/data/projects"
import { staggerContainer, staggerItem } from "@/lib/animations"
import GridBackground from "@/components/grid-background"
import { Terminal } from "lucide-react"

const GithubIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
)

export default function ToolBox() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

    return (
        <section id="services" className="relative overflow-hidden py-28">
            <GridBackground className="opacity-14" />

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-[10%] left-[5%] h-130 w-130 rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="absolute right-[5%] bottom-[10%] h-130 w-130 rounded-full bg-emerald-500/10 blur-[120px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.07)_1px,transparent_0)] bg-size-[32px_32px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-20 text-center"
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 backdrop-blur-sm">
                        <Terminal size={14} className="text-cyan-400" />
                        <span className="font-mono text-xs font-semibold tracking-wider text-slate-400 uppercase">
                            System.Dev_Toolbox
                        </span>
                    </div>
                    <h2 className="mb-4 text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
                        Ce que{" "}
                        <span className="text-cyan-400">j'utilise & crée</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg font-light text-slate-400">
                        Une boîte à outils personnelle contenant des commandes,
                        alias et scripts pour Git, PowerShell et d'autres outils
                        de développement afin de booster l'efficacité et
                        l'automatisation.
                    </p>
                </motion.div>

                {/* Tool Box grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                >
                    {toolbox.map((item) => (
                        <motion.div
                            key={item.title}
                            variants={staggerItem}
                            whileHover={{ y: -10, scale: 1.04 }}
                            className="group relative cursor-default overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/40 p-6 shadow-sm"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="rounded-md border border-cyan-900 bg-cyan-500/10 px-2 py-1 font-mono text-[11px] text-cyan-500">
                                    {item.type}
                                </span>

                                <span className="font-mono text-[11px] text-gray-400 opacity-70">
                                    TOOL
                                </span>
                            </div>

                            <h3 className="mb-2 text-lg font-bold tracking-tight text-gray-300">
                                {item.title}
                            </h3>

                            <p className="mb-5 text-sm leading-relaxed text-gray-400">
                                {item.description}
                            </p>

                            <motion.a
                                href={item.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex w-29 items-center gap-1.5 rounded-lg border border-emerald-700 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition-colors"
                            >
                                <GithubIcon />
                                Source code
                            </motion.a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
