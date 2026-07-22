import CustomCursor from "@/components/custom-cursor"
import AboutMe from "@/components/sections/about-me"
import Contact from "@/components/sections/contact"
import Experiences from "@/components/sections/experiences"
import Footer from "@/components/sections/Footer"
import Header from "@/components/sections/Header"
import Hero from "@/components/sections/hero"
import Services from "@/components/sections/services"
import Skills from "@/components/sections/skills"
import ToolBox from "@/components/sections/ToolBox"
import WorkProcess from "@/components/sections/work-process"

export function App() {
    return (
        <main className="relative min-h-screen w-full bg-gray-950">
            <CustomCursor />

            <Header />
            <Hero />
            <AboutMe />
            <Experiences />
            <Skills />
            <Services />
            <WorkProcess />
            <ToolBox />
            <Contact />
            <Footer />
        </main>
    )
}

export default App
