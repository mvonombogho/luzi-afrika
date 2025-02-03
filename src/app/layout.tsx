import type { Metadata } from 'next';
import { neue } from '@/lib/fonts';
import '@/app/styles/globals.css';

export const metadata: Metadata = {
 title: 'Luzi Afrika | IT Solutions & Consultancy',
 description: 'Leading provider of comprehensive IT support and consultancy services in Kenya',
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode
}) {
 return (
   <html lang="en" className={neue.variable}>
     <body className={`${neue.className} antialiased`}>
       <div className="fixed inset-0 z-0">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(247,247,247,1)_0%,rgba(255,255,255,1)_100%)]" />
         <div 
           className="absolute inset-0 opacity-50 pointer-events-none"
           style={{
             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
             backgroundSize: '200px 200px'
           }}
         />
       </div>
       <main className="relative z-10">
         {children}
       </main>
     </body>
   </html>
 );
}