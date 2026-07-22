import {
    Globe2,
    Palette,
    PencilRuler,
    Server,
    Smartphone,
    Webhook,
    type LucideIcon,
} from "lucide-react"

export type Service = {
    icon: LucideIcon
    title: string
    description: string
    features: string[]
    color: string
}

export const services: Service[] = [
    {
        icon: Globe2,
        title: "Développement Web Front-End",
        description:
            "Création d’interfaces web modernes, fluides et performantes, optimisées pour garantir une expérience utilisateur idéale sur tous les types d’écrans et navigateurs.",
        features: [
            "Tech : React, Next.js, Vue, Angular",
            "Styling : Tailwind CSS, Bootstrap",
            "Bibliothèques UI : MUI, Shadcn UI, PrimeVue",
        ],
        color: "accent",
    },
    {
        icon: Smartphone,
        title: "Développement Mobile",
        description:
            "Conception d’applications mobiles intuitives et évolutives, offrant des performances natives optimales et une navigation fluide sur l’ensemble des plateformes iOS et Android.",
        features: [
            "Tech : Flutter (Dart), React Native",
            "Développement cross-platform",
            "Optimisation des performances",
        ],
        color: "green",
    },
    {
        icon: Palette,
        title: "Design UI/UX",
        description:
            "Création d’interfaces graphiques captivantes et ergonomiques, entièrement centrées sur l’utilisateur final, en mettant l’accent sur l’accessibilité, la clarté et la fluidité visuelle.",
        features: [
            "Outils : Figma, Lunacy",
            "Wireframing & prototypage",
            "Design systems & cohérence UI",
        ],
        color: "purple",
    },
    {
        icon: Server,
        title: "Développement Back-End",
        description:
            "Construction d’architectures serveurs robustes, sécurisées et hautement scalables, incluant la conception d’API performantes et une gestion optimisée de vos bases de données.",
        features: [
            "Langages : TypeScript, Python, PHP, Java",
            "Intégration API & Cloud",
            "Bases de données : PostgreSQL, MySQL, MongoDB",
        ],
        color: "purple",
    },
    {
        icon: Webhook,
        title: "DevOps / CI-CD",
        description:
            "Automatisation complète des processus de déploiement et gestion des infrastructures Cloud pour assurer des pipelines de livraison de code rapides, fiables et continus.",
        features: [
            "Conteneurisation : Docker",
            "CI/CD : GitHub Actions, Jenkins",
            "Automatisation d’infrastructure",
        ],
        color: "green",
    },
    {
        icon: PencilRuler,
        title: "Méthodologie",
        description:
            "Application de frameworks de travail structurés pour garantir une collaboration d’équipe transparente, un suivi rigoureux et la réussite globale de vos projets techniques.",
        features: [
            "Pratiques Agiles & Scrum",
            "Méthodes Merise & 2TUP",
            "Planification & suivi de projet",
        ],
        color: "accent",
    },
]
