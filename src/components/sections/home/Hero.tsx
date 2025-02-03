'use client';

import { motion } from 'framer-motion';

export default function Hero() {
 return (
   <section className="relative min-h-screen flex items-center px-6">
     <div className="w-full max-w-screen-xl mx-auto pt-[15vh]">
       <motion.h1 
         initial={{ opacity: 0, y: 40 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
         className="text-[clamp(3rem,10vw,8rem)] font-light leading-[0.9] tracking-[-0.02em] mb-16"
       >
         Illuminating Africa's<br />
         Digital Future<br />
         Through Technology
       </motion.h1>

       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, delay: 0.2 }}
         className="flex flex-col md:flex-row gap-8 items-start md:items-center"
       >
         <p className="text-xl md:text-2xl text-neutral-600 max-w-xl font-light">
           Kenya's leading IT solutions provider, specializing in comprehensive support and innovative consultancy services.
         </p>
         <motion.button
           whileHover={{ scale: 1.02 }}
           whileTap={{ scale: 0.98 }}
           className="px-8 py-4 bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-neutral-900 transition-colors"
         >
           Start a Project
         </motion.button>
       </motion.div>
     </div>

     <motion.div 
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       transition={{ delay: 1 }}
       className="absolute bottom-12 left-6"
     >
       <div className="flex items-center gap-3">
         <div className="w-12 h-px bg-neutral-400" />
         <span className="text-sm text-neutral-400 uppercase tracking-[0.2em]">Scroll</span>
       </div>
     </motion.div>

     <div className="absolute inset-0 -z-10">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(247,247,247,1)_0%,rgba(255,255,255,1)_100%)]" />
     </div>
   </section>
 );
}