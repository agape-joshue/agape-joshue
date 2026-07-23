import { cn } from "@/lib/utils"

export default function GridBackground({ className }: { className: string }) {
    return (
        <div
            className={cn(
                "pointer-events-none absolute inset-0 overflow-hidden"
            )}
        >
            <div
                className={cn(
                    "absolute inset-0 bg-size-[40px_40px]",
                    "bg-[radial-gradient(circle,#94a3b8_1px,transparent_1px)]",
                    className
                )}
            />
        </div>
    )
}
