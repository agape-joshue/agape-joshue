import { ArrowLeft, ShieldAlert } from "lucide-react"
import GridBackground from "@/components/grid-background"
import CustomCursor from "@/components/custom-cursor"

export default function NotFoundPage() {
    return (
        <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-950 px-6 text-center antialiased">
            <CustomCursor />

            <div className="absolute inset-0 z-0">
                <GridBackground className="opacity-25" />
                <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="pointer-events-none absolute top-1/3 left-1/4 h-75 w-75 rounded-full bg-emerald-500/5 blur-[100px]" />
            </div>

            <div className="relative z-10 flex max-w-xl flex-col items-center">
                <div className="mb-6 flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-sm font-medium tracking-wide text-cyan-400 backdrop-blur-md">
                    <ShieldAlert size={16} className="text-cyan-400" />
                    <span>Erreur 404</span>
                </div>

                <h1 className="bg-linear-to-b from-white via-gray-300 to-gray-800 bg-clip-text text-8xl font-black tracking-tighter text-transparent sm:text-9xl">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    Page introuvable
                </h2>

                <p className="mt-4 text-base leading-7 text-gray-400">
                    Désolé, la page que vous recherchez semble avoir été
                    déplacée, supprimée ou n'a jamais existé. Vérifiez l'adresse
                    URL ou retournez à l'accueil.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <button
                        onClick={() => window.history.back()}
                        className="group flex items-center justify-center gap-2 rounded-xl border border-gray-800 bg-gray-900/50 px-5 py-3 text-sm font-medium text-gray-300 transition-all duration-200 hover:border-gray-700 hover:bg-gray-900 hover:text-white"
                    >
                        <ArrowLeft
                            size={16}
                            className="transition-transform group-hover:-translate-x-0.5"
                        />
                        <span>Retour en arrière</span>
                    </button>
                </div>
            </div>

            <div className="absolute bottom-6 z-10 text-xs text-gray-600">
                L'adresse URL est peut-être incorrecte.
            </div>
        </main>
    )
}
