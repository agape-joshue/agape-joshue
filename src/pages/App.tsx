import CustomCursor from "@/components/custom-cursor"
import AboutMe from "@/components/sections/about-me"
import Header from "@/components/sections/Header"
import Hero from "@/components/sections/hero"

export function App() {
    return (
        <main className="relative min-h-screen w-full bg-gray-950">
            <CustomCursor />

            <Header />
            <Hero />
            <AboutMe />
        </main>
    )
}

export default App
