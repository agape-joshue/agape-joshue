import { useEffect, useRef, useState } from "react"

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const [clicking, setClicking] = useState(false)
    const [hovering, setHovering] = useState(false)
    const [ripples, setRipples] = useState<
        { id: number; x: number; y: number }[]
    >([])
    const posRef = useRef({ x: 0, y: 0 })
    const ringPosRef = useRef({ x: 0, y: 0 })
    const rafRef = useRef<number>(0)
    const isTouchDevice = window.matchMedia("(hover: none)").matches

    useEffect(() => {
        if (isTouchDevice) return

        const onMove = (e: MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY }
            if (dotRef.current) {
                dotRef.current.style.left = `${e.clientX}px`
                dotRef.current.style.top = `${e.clientY}px`
            }
        }

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t

        const animateRing = () => {
            ringPosRef.current.x = lerp(
                ringPosRef.current.x,
                posRef.current.x,
                0.12
            )
            ringPosRef.current.y = lerp(
                ringPosRef.current.y,
                posRef.current.y,
                0.12
            )
            if (ringRef.current) {
                ringRef.current.style.left = `${ringPosRef.current.x}px`
                ringRef.current.style.top = `${ringPosRef.current.y}px`
            }
            rafRef.current = requestAnimationFrame(animateRing)
        }

        rafRef.current = requestAnimationFrame(animateRing)

        const onMouseDown = (e: MouseEvent) => {
            setClicking(true)
            const id = Date.now()
            setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }])
            setTimeout(() => {
                setRipples((prev) => prev.filter((r) => r.id !== id))
            }, 700)
        }

        const onMouseUp = () => setClicking(false)

        const checkHover = (e: MouseEvent) => {
            const el = document.elementFromPoint(e.clientX, e.clientY)
            const isInteractive = el?.closest(
                "a, button, [role='button'], input, textarea, select, label, .cursor-pointer"
            )
            setHovering(!!isInteractive)
        }

        document.addEventListener("mousemove", onMove)
        document.addEventListener("mousemove", checkHover)
        document.addEventListener("mousedown", onMouseDown)
        document.addEventListener("mouseup", onMouseUp)

        return () => {
            cancelAnimationFrame(rafRef.current)
            document.removeEventListener("mousemove", onMove)
            document.removeEventListener("mousemove", checkHover)
            document.removeEventListener("mousedown", onMouseDown)
            document.removeEventListener("mouseup", onMouseUp)
        }
    }, [isTouchDevice])

    if (isTouchDevice) return null

    return (
        <>
            <style>{`body { cursor: none !important; } a, button, [role='button'], input, textarea, select, label { cursor: none !important; }`}</style>
            <div
                ref={dotRef}
                className={`cursor-dot ${clicking ? "clicking" : ""}`}
            />
            <div
                ref={ringRef}
                className={`cursor-ring ${hovering ? "hovering" : ""}`}
            />
            <div className="ripple-container">
                {ripples.map((r) => (
                    <div
                        key={r.id}
                        className="ripple"
                        style={{ left: r.x, top: r.y }}
                    />
                ))}
            </div>
        </>
    )
}
