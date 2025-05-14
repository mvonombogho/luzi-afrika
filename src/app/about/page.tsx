'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import PageHeader from '@/components/ui/PageHeader';

gsap.registerPlugin(ScrollTrigger);

// Team data is removed

// Company milestones
const milestones = [
  {
    year: '2025',
    title: 'LUZI AFRIKA Founded',
    description: 'Established in Nairobi to provide comprehensive IT support services to local businesses.'
  },
  {
    year: '2025',
    title: 'First Major Client Partnership',
    description: 'Secured our first enterprise client, providing full-service IT management for a regional bank.'
  },
  {
    year: '2025',
    title: 'Team Expansion',
    description: 'Grew our team of certified IT professionals to better serve our expanding client base.'
  }
];

// Company values
const values = [
  {
    title: 'Excellence',
    description: 'We are committed to delivering the highest quality of service in everything we do.'
  },
  {
    title: 'Integrity',
    description: 'We operate with honesty, transparency, and ethical standards in all our business dealings.'
  },
  {
    title: 'Innovation',
    description: 'We continuously seek new and better ways to solve problems and add value for our clients.'
  },
  {
    title: 'Client Focus',
    description: 'We prioritize our clients\' needs and build long-term relationships based on trust and mutual success.'
  }
];

const AboutPage = () => {
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mission animation
      gsap.from(missionRef.current, {
        scrollTrigger: {
          trigger: missionRef.current,
          start: 'top bottom',
          end: 'center center',
          scrub: 1
        },
        y: 50,
        opacity: 0
      });

      // Vision animation
      gsap.from(visionRef.current, {
        scrollTrigger: {
          trigger: visionRef.current,
          start: 'top bottom',
          end: 'center center',
          scrub: 1
        },
        y: 50,
        opacity: 0
      });

      // Values animation
      if (valuesRef.current) {
        const valueItems = valuesRef.current.querySelectorAll('.value-item');
        gsap.from(valueItems, {
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 1
          },
          y: 50,
          opacity: 0,
          stagger: 0.2
        });
      }

      // Timeline animation
      if (timelineRef.current) {
        const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
        gsap.from(timelineItems, {
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 1
          },
          x: -50,
          opacity: 0,
          stagger: 0.2
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen">
      <PageHeader 
        title="About Us"
        subtitle="Empowering Africa's digital transformation through reliable technology solutions"
      />

      <section className="py-20 px-6 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div ref={missionRef} className="flex flex-col justify-center">
              <h2 className="text-3xl font-light mb-6">Our Mission</h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                To illuminate Africa's technological landscape by providing superior IT support services 
                that enable businesses to thrive in the digital age through reliable technology solutions 
                and exceptional customer service.
              </p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-lg">
              <blockquote className="italic text-neutral-600 text-lg">
                "Our goal is to be the catalyst for digital transformation across Africa, helping businesses 
                harness the power of technology to achieve their full potential."
              </blockquote>
              <p className="mt-4 font-medium">— Israel Mvono, Founder & CEO</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="order-2 md:order-1 aspect-video bg-neutral-200 rounded-lg">
              {/* Placeholder for vision image or video */}
              <div className="w-full h-full flex items-center justify-center text-neutral-400">
                Vision Image/Video
              </div>
            </div>
            <div ref={visionRef} className="order-1 md:order-2 flex flex-col justify-center">
              <h2 className="text-3xl font-light mb-6">Our Vision</h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                To become Africa's most trusted IT support partner, recognized for excellence in service 
                delivery and technical expertise in driving digital transformation.
              </p>
              <ul className="space-y-4">
                {[
                  'Empowering businesses with technology that works reliably',
                  'Building long-term partnerships based on trust and value',
                  'Contributing to Africa\'s digital economy growth',
                  'Setting the standard for IT service excellence'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-blue-500 mt-1 flex-shrink-0" size={18} />
                    <p className="text-neutral-700">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-light mb-12 text-center">Our Values</h2>
          <div 
            ref={valuesRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value) => (
              <div 
                key={value.title}
                className="value-item bg-neutral-50 p-8 rounded-lg"
              >
                <h3 className="text-xl font-light mb-4">{value.title}</h3>
                <p className="text-neutral-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-neutral-900 text-white">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-light mb-12 text-center">Our Journey</h2>
          <div 
            ref={timelineRef}
            className="space-y-12"
          >
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className="timeline-item flex flex-col md:flex-row gap-6 md:gap-12"
              >
                <div className="md:w-1/4 flex flex-col items-start md:items-end">
                  <div className="text-3xl font-light text-blue-400">{milestone.year}</div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-light mb-3">{milestone.title}</h3>
                  <p className="text-neutral-400">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-blue-50">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-6">Ready to work with us?</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto mb-10">
            Contact our team today to discuss how we can support your business with reliable IT solutions.
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-blue-500 text-white rounded-lg text-sm font-medium"
            >
              Contact Us
            </motion.button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;