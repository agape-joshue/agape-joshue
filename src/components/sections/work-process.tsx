import { motion } from "framer-motion"
import GridBackground from "@/components/grid-background"
import {
    CalendarRange,
    ChartSpline,
    CodeXml,
    Server,
    type LucideIcon,
} from "lucide-react"

interface WorkStep {
    title: string
    description: string
    icon: LucideIcon
}

export default function WorkProcess() {
    const workStepData: WorkStep[] = [
        {
            title: "Cadrage & Analyse des Besoins",
            description:
                "Compréhension fine des objectifs, utilisateurs et données.",
            icon: CalendarRange,
        },
        {
            title: "Analyse & Architecture",
            description:
                "Modélisation du système et conception d’architectures scalables.",
            icon: ChartSpline,
        },
        {
            title: "Développement & Traitement",
            description:
                "Construction des applications, des API et pipelines de données.",
            icon: CodeXml,
        },
        {
            title: "Tests & Déploiement",
            description:
                "Validation, optimisation et mise en production sécurisée.",
            icon: Server,
        },
    ]

    return (
        <section id="work-process" className="relative py-28">
            <GridBackground className="opacity-25" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-16 xl:grid-cols-2 xl:gap-32">
                    {/* LEFT */}
                    <div className="space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="justify-center text-emerald-400 lg:justify-start"
                        >
                            Méthodologie
                        </motion.h2>

                        <motion.h3
                            initial={{ opacity: 0, x: -25 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-center text-3xl font-bold text-gray-300 md:text-4xl lg:text-start"
                        >
                            Comment je bâtis{" "}
                            <span className="text-emerald-400">
                                mes systèmes
                            </span>
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-center text-sm leading-relaxed text-gray-400 md:text-base lg:text-start"
                        >
                            Suivant une démarche d'ingénierie structurée, je
                            mets l'accent sur la scalabilité, la performance et
                            la maintenabilité. Chaque phase est pensée pour
                            réduire les incertitudes et maximiser la qualité
                            finale du produit.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-center text-sm leading-relaxed text-gray-400 md:text-base lg:text-start"
                        >
                            De l'idéation à la mise en production, je m'assure
                            que chaque système soit fiable, observable et
                            optimisé pour des conditions d'utilisation réelles.
                        </motion.p>
                    </div>

                    {/* RIGHT */}
                    <div className="grid grid-cols-2 gap-x-6">
                        {workStepData.map((step, i) => {
                            const Icon = step.icon

                            return (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 25, scale: 0.97 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.08,
                                        ease: "easeOut",
                                    }}
                                    className={`group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/40 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${i % 2 === 1 ? "mt-8" : "mb-8"}`}
                                >
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 transition group-hover:bg-emerald-500/15">
                                        <Icon
                                            size={20}
                                            className="text-emerald-400 transition group-hover:scale-110"
                                        />
                                    </div>

                                    <div className="mb-2 font-mono text-xs text-gray-500 opacity-60">
                                        0{i + 1}
                                    </div>

                                    <h3 className="mb-2 text-base font-semibold text-gray-300">
                                        {step.title}
                                    </h3>

                                    <p className="text-sm leading-relaxed text-gray-400">
                                        {step.description}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
