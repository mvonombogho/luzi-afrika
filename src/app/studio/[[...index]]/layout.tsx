export const metadata = {
  title: 'Luzi Afrika CMS Studio',
  description: 'Content management system for Luzi Afrika website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}