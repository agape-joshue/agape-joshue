import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { ASK_IA, useApi } from "@/hooks/use-api"
import { cn } from "@/lib/utils"

interface Message {
    id: string
    role: "user" | "bot"
    text: string
    timestamp: Date
}

function renderMarkdown(text: string) {
    const lines = text.split("\n")
    return lines.map((line, i) => {
        line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        line = line.replace(
            /`(.*?)`/g,
            '<code style="font-family:var(--font-mono);font-size:0.8em;background:rgba(0,0,0,0.15);padding:1px 4px;border-radius:3px;">$1</code>'
        )

        if (line.startsWith("**") && line.endsWith("**")) {
            return (
                <div
                    key={i}
                    className="mt-2 font-bold"
                    dangerouslySetInnerHTML={{ __html: line }}
                />
            )
        }
        if (line.trim() === "") return <div key={i} className="h-2" />
        if (line.startsWith("- ") || line.startsWith("• ")) {
            return (
                <div key={i} className="flex items-start gap-2">
                    <span className="mt-1 text-xs text-cyan-500">▸</span>
                    <span dangerouslySetInnerHTML={{ __html: line.slice(2) }} />
                </div>
            )
        }
        return <div key={i} dangerouslySetInnerHTML={{ __html: line }} />
    })
}
const default_response = `
Bonjour ! Je suis l'assistant de Joshué Agapé 👋

Je peux vous renseigner sur :
- 📚 Son **parcours** et ses expériences
- 💻 Ses **compétences** techniques
- 🚀 Ses **projets** réalisés
- 🛠️ Ses **services** proposés
- 📬 Comment le **contacter**

Que souhaitez-vous savoir ?
`
const quickReplies = [
    "Quel est ton parcours ?",
    "Quelles sont tes compétences ?",
    "Montre moi tes projets",
    "Quels services proposes-tu ?",
    "Comment te contacter ?",
]

export default function AIChat() {
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "0",
            role: "bot",
            text: default_response,
            timestamp: new Date(),
        },
    ])
    const [input, setInput] = useState("")
    const [typing, setTyping] = useState(false)
    const [hasUnread, setHasUnread] = useState(true)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, typing])

    useEffect(() => {
        if (open) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
            setTimeout(() => inputRef.current?.focus(), 200)
        }
    }, [open])

    const handleOpen = () => {
        setOpen(true)
        setHasUnread(false)
    }

    const { request } = useApi<string>()

    const sendMessage = async (text: string) => {
        if (!text.trim()) return

        const userMsg: Message = {
            id: uuidv4(),
            role: "user",
            text,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMsg])
        setInput("")
        setTyping(true)

        const response = await request(ASK_IA, {
            method: "POST",
            body: { question: text },
        })

        setTyping(false)
        setMessages((prev) => [
            ...prev,
            {
                id: uuidv4(),
                role: "bot",
                text:
                    response?.data ??
                    "Une erreur interne est survenue lors de la communication avec l'IA.",
                timestamp: new Date(),
            },
        ])
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        sendMessage(input)
    }

    return (
        <>
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 1000 }}
                onClick={handleOpen}
                className={cn(
                    "fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300",
                    "bg-cyan-700",
                    open ? "pointer-events-none opacity-0" : "opacity-100"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <MessageCircle size={22} color="#fff" />
                {hasUnread && (
                    <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className={cn(
                            "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border text-xs text-[9px]",
                            "border-white bg-amber-600 text-white"
                        )}
                    >
                        1
                    </motion.div>
                )}
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.85,
                            y: 20,
                            originX: 1,
                            originY: 1,
                        }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 20 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                        }}
                        className={cn(
                            "fixed right-4.5 bottom-4 z-60 flex h-full max-h-[calc(100vh-6rem)] w-120 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border shadow-xl backdrop-blur-[100px] sm:right-6 sm:bottom-3",
                            "border-gray-800 bg-gray-900/50"
                        )}
                    >
                        <div
                            className={cn(
                                "flex items-center justify-between border-b px-5 py-4",
                                "border-gray-700 bg-gray-800/50"
                            )}
                        >
                            <div className={cn("flex items-center gap-3")}>
                                <div
                                    className={cn(
                                        "flex h-9 w-9 animate-pulse items-center justify-center rounded-xl",
                                        "bg-[rgba(255,255,255,0.2)]"
                                    )}
                                >
                                    <Sparkles
                                        size={18}
                                        className={cn("text-cyan-400")}
                                    />
                                </div>
                                <div>
                                    <div
                                        className={cn(
                                            "text-sm font-bold",
                                            "text-white"
                                        )}
                                    >
                                        Assistant IA
                                    </div>
                                    <div
                                        className={cn(
                                            "flex items-center gap-1.5"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "h-1.5 w-1.5 animate-pulse rounded-full",
                                                "bg-green-300"
                                            )}
                                        />
                                        <span
                                            className={cn(
                                                "text-[10px]",
                                                "text-white/70"
                                            )}
                                        >
                                            En ligne
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <motion.button
                                onClick={() => setOpen(false)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={cn(
                                    "flex h-7 w-7 items-center justify-center rounded-lg",
                                    "bg-gray-700 text-white"
                                )}
                            >
                                <X size={14} />
                            </motion.button>
                        </div>

                        <div
                            className={cn(
                                "chat-scroll flex-1 space-y-4 overflow-y-auto p-4"
                            )}
                        >
                            <AnimatePresence>
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{
                                            opacity: 0,
                                            y: 12,
                                            scale: 0.95,
                                        }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                        }}
                                        className={cn(
                                            "relative flex items-end gap-2.5",
                                            msg.role === "user"
                                                ? "justify-end"
                                                : "justify-start"
                                        )}
                                    >
                                        {msg.role === "bot" && (
                                            <div
                                                className={cn(
                                                    "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                                                    "bg-gray-600"
                                                )}
                                            >
                                                <Bot
                                                    size={20}
                                                    className={cn("text-white")}
                                                />
                                            </div>
                                        )}
                                        <div
                                            className={cn(
                                                "relative max-w-[80%] space-y-0.5 px-4 py-3 text-sm leading-relaxed",
                                                msg.role === "user"
                                                    ? "chat-message-user"
                                                    : "chat-message-bot"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "absolute bottom-1.75 h-2.5 w-2.5 rotate-45",
                                                    msg.role === "user"
                                                        ? "-right-1.25 bg-cyan-600"
                                                        : "-left-1.25 border-b border-l border-[#30363d] bg-gray-800"
                                                )}
                                            />
                                            {renderMarkdown(msg.text)}
                                            <div
                                                className={cn(
                                                    "mt-2 text-xs opacity-50"
                                                )}
                                            >
                                                {msg.timestamp.toLocaleTimeString(
                                                    "fr-FR",
                                                    {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    }
                                                )}
                                            </div>
                                        </div>
                                        {msg.role === "user" && (
                                            <div
                                                className={cn(
                                                    "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
                                                    "border-cyan-600 bg-cyan-600 text-gray-200"
                                                )}
                                            >
                                                <User size={16} />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            <AnimatePresence>
                                {typing && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className={cn(
                                            "flex items-center gap-2.5"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                                                "bg-gray-600 text-white"
                                            )}
                                        >
                                            <Bot size={16} />
                                        </div>

                                        <div
                                            className={cn(
                                                "chat-message-bot relative flex items-center gap-1 px-4 py-3"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "absolute bottom-1.75 -left-1.25 h-2.5 w-2.5 rotate-45 border-b border-l",
                                                    "border-[#30363d] bg-gray-800"
                                                )}
                                            />
                                            {[0, 1, 2].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    className={cn(
                                                        "h-1.5 w-1.5 rounded-full",
                                                        "bg-gray-400"
                                                    )}
                                                    animate={{ y: [0, -6, 0] }}
                                                    transition={{
                                                        duration: 0.6,
                                                        repeat: Infinity,
                                                        delay: i * 0.15,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </div>

                        {messages.length <= 1 && (
                            <div className={cn("px-4 pb-2")}>
                                <p
                                    className={cn(
                                        "mb-2 font-mono text-xs",
                                        "text-gray-400"
                                    )}
                                >
                                    Questions rapides :
                                </p>
                                <div className={cn("flex flex-wrap gap-1.5")}>
                                    {quickReplies.map((q) => (
                                        <motion.button
                                            key={q}
                                            onClick={() => sendMessage(q)}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className={cn(
                                                "rounded-full border px-3 py-1.5 text-xs transition-colors",
                                                "border-gray-700 bg-gray-800/50 text-gray-400"
                                            )}
                                        >
                                            {q}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <form
                            onSubmit={handleSubmit}
                            className={cn(
                                "flex w-full items-center gap-2 border-t px-4 py-3",
                                "border-gray-700 bg-gray-800/50"
                            )}
                        >
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Posez votre question..."
                                className={cn(
                                    "flex-1 rounded-xl border px-4 py-2.5 text-sm outline-none",
                                    "border-gray-800 bg-gray-800/50 text-gray-300"
                                )}
                                onFocus={(e) =>
                                    (e.target.style.borderColor =
                                        "var(--color-cyan-400)")
                                }
                                onBlur={(e) =>
                                    (e.target.style.borderColor =
                                        "var(--color-gray-700)")
                                }
                            />
                            <motion.button
                                type="submit"
                                disabled={!input.trim() || typing}
                                whileHover={input.trim() ? { scale: 1.1 } : {}}
                                whileTap={input.trim() ? { scale: 0.9 } : {}}
                                className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-xl border transition-all",
                                    "border-cyan-600 bg-cyan-500"
                                )}
                            >
                                <Send size={15} />
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
