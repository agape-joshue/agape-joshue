export default function GridBackground({ className }: { className: string }) {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
                className={`absolute inset-0 bg-[radial-gradient(circle,#94a3b8_1px,transparent_1px)] bg-size-[40px_40px] ${className}`}
            />
        </div>
    )
}
