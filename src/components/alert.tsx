import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react"

export interface Alert {
    show: boolean
    title: string
    message: string
    type: "success" | "info" | "warning" | "error"
}

interface AlertComponentProps {
    alertMessage: Alert
}

const ALERT_STYLES = {
    success: {
        container:
            "border-emerald-500/20 bg-emerald-50/60 dark:bg-emerald-950/20",
        iconContainer:
            "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
        title: "text-emerald-900 dark:text-emerald-300",
        message: "text-emerald-700/90 dark:text-emerald-400/80",
        Icon: CheckCircle2,
    },
    info: {
        container: "border-sky-500/20 bg-sky-50/60 dark:bg-sky-950/20",
        iconContainer:
            "bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400",
        title: "text-sky-900 dark:text-sky-300",
        message: "text-sky-700/90 dark:text-sky-400/80",
        Icon: Info,
    },
    warning: {
        container: "border-amber-500/20 bg-amber-50/60 dark:bg-amber-950/20",
        iconContainer:
            "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
        title: "text-amber-900 dark:text-amber-300",
        message: "text-amber-700/90 dark:text-amber-400/80",
        Icon: AlertTriangle,
    },
    error: {
        container: "border-rose-500/20 bg-rose-50/60 dark:bg-rose-950/20",
        iconContainer:
            "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400",
        title: "text-rose-900 dark:text-rose-300",
        message: "text-rose-700/90 dark:text-rose-400/80",
        Icon: XCircle,
    },
}

export const AlertComponent = ({ alertMessage }: AlertComponentProps) => {
    if (!alertMessage.show) return null

    const styles = ALERT_STYLES[alertMessage.type] || ALERT_STYLES.info
    const { Icon } = styles

    return (
        <div
            className={`mb-8 grid grid-cols-[3rem_auto] items-center gap-4 rounded-xl border p-4 transition-all duration-300 ${styles.container}`}
        >
            <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${styles.iconContainer}`}
            >
                <Icon size={20} />
            </div>

            <div className="flex flex-col gap-0.5">
                <h4
                    className={`text-sm font-semibold tracking-wide ${styles.title}`}
                >
                    {alertMessage.title}
                </h4>
                <p className={`text-sm leading-relaxed ${styles.message}`}>
                    {alertMessage.message}
                </p>
            </div>
        </div>
    )
}
