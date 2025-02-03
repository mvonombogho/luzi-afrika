// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../app/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Luzi Afrika | IT Solutions & Consultancy',
  description: 'Leading provider of comprehensive IT support and consultancy services in Kenya',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}