import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "react-hot-toast";
import ClientLayout from "@/components/layouts/ClientLayout"
import { NavBar } from "@/components/layouts/NavBar";

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>
        <NavBar />
        <ClientLayout>{children}</ClientLayout>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              fontSize: '14px',
              borderRadius: '8px',
              background: '#333',
              color: '#fff'
            },
          }} />
      </body>

    </html>
  )
}
