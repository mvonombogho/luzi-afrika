export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  client: string;
  duration: string;
  technologies: string[];
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const projects: Record<string, Project> = {
  'financial-technology': {
    slug: 'financial-technology',
    title: "Financial Technology",
    category: "Banking & Finance",
    description: "Modernizing banking infrastructure and security systems for enhanced digital transactions.",
    fullDescription: `Our comprehensive banking infrastructure modernization project delivered secure, scalable solutions that transformed the client's digital banking capabilities. The implementation included real-time transaction processing, enhanced security protocols, and seamless integration with existing systems.

    Working closely with the client's team, we developed a robust architecture that not only met current needs but also provided a foundation for future growth. The solution encompassed mobile banking capabilities, fraud detection systems, and automated compliance reporting.`,
    image: "https://picsum.photos/1200/800?random=1",
    gallery: [
      "https://picsum.photos/800/600?random=1",
      "https://picsum.photos/800/600?random=2",
      "https://picsum.photos/800/600?random=3"
    ],
    client: "Major Regional Bank",
    duration: "8 months",
    technologies: [
      "Cloud Infrastructure",
      "Cybersecurity",
      "API Integration",
      "Real-time Processing",
      "Data Analytics"
    ],
    challenges: [
      "Legacy system integration",
      "Real-time data synchronization",
      "Regulatory compliance",
      "Zero-downtime deployment"
    ],
    solutions: [
      "Microservices architecture",
      "Automated testing pipeline",
      "Phased deployment strategy",
      "24/7 monitoring system"
    ],
    outcomes: [
      "40% reduction in transaction processing time",
      "99.99% system uptime",
      "Enhanced security protocols",
      "Improved customer satisfaction"
    ],
    testimonial: {
      quote: "The transformation of our digital infrastructure has positioned us at the forefront of modern banking. The team's expertise and dedication were crucial to this success.",
      author: "John Doe",
      role: "CTO, Regional Bank"
    }
  },
  'healthcare-systems': {
    slug: 'healthcare-systems',
    title: "Healthcare Systems",
    category: "Healthcare",
    description: "Digital transformation of medical record management and patient care systems.",
    fullDescription: `We implemented a comprehensive electronic medical record system that revolutionized patient data management and care coordination. The solution included secure patient portals, integrated scheduling systems, and robust data analytics capabilities.

    The system was designed with a focus on user experience, ensuring that medical staff could efficiently access and update patient information while maintaining strict privacy standards.`,
    image: "https://picsum.photos/1200/800?random=2",
    gallery: [
      "https://picsum.photos/800/600?random=4",
      "https://picsum.photos/800/600?random=5",
      "https://picsum.photos/800/600?random=6"
    ],
    client: "Private Hospital Network",
    duration: "12 months",
    technologies: [
      "EMR Systems",
      "Data Security",
      "Cloud Storage",
      "Mobile Integration",
      "AI Diagnostics"
    ],
    challenges: [
      "Data migration complexity",
      "Healthcare compliance",
      "User training",
      "System interoperability"
    ],
    solutions: [
      "Custom migration tools",
      "Compliance automation",
      "Interactive training modules",
      "API standardization"
    ],
    outcomes: [
      "60% reduction in paperwork",
      "Improved patient data accuracy",
      "Faster care coordination",
      "Enhanced reporting capabilities"
    ],
    testimonial: {
      quote: "This digital transformation has significantly improved our ability to provide quality patient care. The new system has exceeded our expectations.",
      author: "Jane Smith",
      role: "Medical Director"
    }
  },
  'education-platform': {
    slug: 'education-platform',
    title: "Education Platform",
    category: "EdTech",
    description: "Comprehensive learning management system enabling digital education.",
    fullDescription: `Developed a cutting-edge learning management system that transformed the educational experience for both students and educators. The platform features interactive virtual classrooms, automated assessment tools, and comprehensive progress tracking.

    We incorporated advanced learning analytics to provide insights into student performance and engagement, enabling personalized learning paths and early intervention strategies.`,
    image: "https://picsum.photos/1200/800?random=3",
    gallery: [
      "https://picsum.photos/800/600?random=7",
      "https://picsum.photos/800/600?random=8",
      "https://picsum.photos/800/600?random=9"
    ],
    client: "International School Chain",
    duration: "6 months",
    technologies: [
      "React",
      "Node.js",
      "WebRTC",
      "MongoDB",
      "Learning Analytics"
    ],
    challenges: [
      "Scalable video streaming",
      "Offline access",
      "Multi-device support",
      "Content management"
    ],
    solutions: [
      "Progressive web app",
      "WebRTC optimization",
      "Responsive design",
      "Content delivery network"
    ],
    outcomes: [
      "Successful remote learning implementation",
      "Increased student engagement",
      "Streamlined assessment process",
      "Enhanced parent communication"
    ],
    testimonial: {
      quote: "The platform has revolutionized how we deliver education. It's intuitive, engaging, and has made remote learning truly effective.",
      author: "Robert Johnson",
      role: "Principal"
    }
  }
};