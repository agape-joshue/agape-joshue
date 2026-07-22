import "@/styles/index.css"

import App from "@/pages/App"
import { StrictMode } from "react"
import NotFoundPage from "@/pages/NotFound"
import { createRoot } from "react-dom/client"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "*", element: <NotFoundPage /> },
])

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    </StrictMode>
)
