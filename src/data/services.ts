import { Service, ServiceFeature } from '@/types/service';

const services: Service[] = [
  {
    id: 'hardware-support',
    slug: {
      current: 'hardware-support',
      _type: 'slug'
    },
    title: 'Hardware Support & Maintenance',
    description: 'Comprehensive computer and network equipment maintenance, upgrades, and repairs to keep your infrastructure running at peak performance.',
    features: [
      'System health checks',
      'Hardware upgrades',
      'Network equipment setup',
      'Preventive maintenance'
    ],
    detailedDescription: `
      Our Hardware Support & Maintenance services provide comprehensive care for your entire IT infrastructure. 
      We understand that hardware failures can lead to costly downtime, data loss, and productivity issues. 
      Our team of certified technicians delivers prompt, reliable support for all your hardware needs, from routine maintenance to emergency repairs.
      
      We take a proactive approach to hardware management, implementing regular maintenance schedules and system health checks to identify and resolve potential issues before they affect your operations. 
      Our services are designed to maximize the lifespan of your equipment, optimize performance, and reduce the total cost of ownership.
    `,
    benefits: [
      'Minimize costly downtime with rapid response support',
      'Extend equipment lifespan through preventive maintenance',
      'Reduce total cost of ownership with optimized hardware performance',
      'Ensure business continuity with reliable IT infrastructure',
      'Access certified technicians with expertise across multiple hardware platforms'
    ],
    caseStudyTitle: 'Regional Bank Network Upgrade',
    caseStudyDescription: 'When a growing regional bank needed to upgrade their entire network infrastructure across 12 branches, our team planned and executed a phased implementation with zero customer-facing downtime. The project included replacing core switches, upgrading all workstations, and implementing new security hardware, resulting in a 40% performance improvement and significant reduction in IT-related incidents.',
    keyFeatures: [
      {
        title: 'Comprehensive Maintenance Programs',
        description: 'Scheduled maintenance routines tailored to your equipment needs, including cleaning, updates, and performance optimization.'
      },
      {
        title: 'Network Equipment Management',
        description: 'Expert configuration, monitoring, and maintenance of routers, switches, firewalls, and wireless infrastructure.'
      },
      {
        title: 'Hardware Lifecycle Management',
        description: 'Strategic planning for hardware upgrades, replacements, and expansions aligned with your business growth.'
      },
      {
        title: '24/7 Emergency Support',
        description: 'Around-the-clock availability for critical hardware failures with guaranteed response times.'
      }
    ],
    faqs: [
      {
        question: 'How often should preventive maintenance be performed?',
        answer: 'We typically recommend quarterly preventive maintenance for most business environments, but this can be adjusted based on your specific equipment usage patterns, environment, and criticality of systems.'
      },
      {
        question: 'Do you support all hardware brands?',
        answer: 'Yes, our technicians are trained to support equipment from all major manufacturers including Dell, HP, Lenovo, Cisco, Apple, and many others. We can work with both warranty and post-warranty equipment.'
      },
      {
        question: 'How quickly can you respond to hardware failures?',
        answer: 'Our standard response time for critical hardware issues is within 4 hours. For clients with premium support agreements, we offer response times as quick as 2 hours. Remote diagnostics often begin within minutes of issue reporting.'
      },
      {
        question: 'Can you help with hardware procurement?',
        answer: 'Absolutely! We offer comprehensive IT procurement services and can help you select the right equipment for your needs, often at better prices than retail due to our vendor relationships.'
      }
    ]
  },
  {
    id: 'software-solutions',
    slug: {
      current: 'software-solutions',
      _type: 'slug'
    },
    title: 'Software Solutions',
    description: 'End-to-end software support including installation, updates, security solutions, and data backup to protect your digital assets.',
    features: [
      'Software licensing',
      'System updates',
      'Security solutions',
      'Data backup'
    ],
    detailedDescription: `
      Our Software Solutions services provide comprehensive management of your organization's software ecosystem. 
      From ensuring license compliance to implementing robust security measures, we handle all aspects of your software needs.
      
      We believe that properly managed software is key to operational efficiency and security. Our team stays current with the latest software developments, 
      security threats, and industry best practices to ensure your systems remain secure, compliant, and optimized for performance.
      
      Whether you need assistance with cloud migrations, software deployments, or developing custom software solutions tailored to your specific business requirements, 
      our experts are ready to help you leverage technology to achieve your business goals.
    `,
    benefits: [
      'Ensure compliance with proper licensing management',
      'Protect your data with robust backup and recovery solutions',
      'Defend against cyber threats with comprehensive security measures',
      'Improve productivity with optimized software configuration',
      'Reduce costs through strategic software selection and management'
    ],
    keyFeatures: [
      {
        title: 'Software Asset Management',
        description: 'Comprehensive tracking and management of software licenses, ensuring compliance and cost optimization.'
      },
      {
        title: 'Data Protection & Recovery',
        description: 'Multi-layered backup solutions with regular testing and rapid recovery capabilities for business continuity.'
      },
      {
        title: 'Security Implementation',
        description: 'Deployment and management of antivirus, anti-malware, encryption, and other security measures to protect your digital assets.'
      },
      {
        title: 'Cloud Service Management',
        description: 'Expert setup, migration, and ongoing management of cloud-based software services and infrastructure.'
      }
    ],
    faqs: [
      {
        question: 'How do you ensure our data backups are reliable?',
        answer: 'We implement the 3-2-1 backup strategy: three copies of your data, on two different media types, with one copy stored off-site. We also conduct regular test restores to verify backup integrity and maintain detailed backup logs and reports.'
      },
      {
        question: 'Can you help us migrate to cloud-based software?',
        answer: 'Yes, we specialize in cloud migrations. Our process includes thorough planning, data migration testing, user training, and post-migration support to ensure a smooth transition with minimal disruption to your operations.'
      },
      {
        question: 'How do you handle software updates and patches?',
        answer: 'We follow a structured approach to updates that includes testing in a non-production environment first, scheduling updates during off-hours when possible, and having rollback plans in place. Critical security patches may be expedited based on risk assessment.'
      },
      {
        question: 'What security measures do you recommend for small businesses?',
        answer: 'Even for small businesses, we recommend a multi-layered approach including business-grade antivirus/anti-malware, properly configured firewalls, regular security updates, data encryption, multi-factor authentication, and employee security awareness training.'
      }
    ]
  },
  {
    id: 'it-procurement',
    slug: {
      current: 'it-procurement',
      _type: 'slug'
    },
    title: 'IT Procurement',
    description: 'Strategic IT equipment sourcing with competitive pricing through our established supplier networks.',
    features: [
      'Equipment sourcing',
      'Vendor management',
      'Bulk purchasing',
      'Warranty handling'
    ],
    detailedDescription: `
      Our IT Procurement services streamline the acquisition process for technology assets while ensuring you get the right equipment at competitive prices. 
      We leverage our established relationships with leading vendors and distributors to provide cost-effective procurement solutions tailored to your business needs.
      
      The technology procurement process can be complex and time-consuming. Our team handles the entire process, from needs assessment and vendor research to negotiation, 
      purchasing, delivery coordination, and asset management. We ensure that all equipment meets your technical specifications, business requirements, and budget constraints.
      
      Beyond just purchasing, we provide strategic guidance on technology investments, helping you make informed decisions that align with your long-term business objectives and technology roadmap.
    `,
    benefits: [
      'Reduce procurement costs through volume discounts and vendor relationships',
      'Save time with streamlined purchasing processes',
      'Ensure compatibility with existing systems',
      'Avoid costly mistakes with expert guidance',
      'Simplify warranty and asset management'
    ],
    keyFeatures: [
      {
        title: 'Vendor Relationship Management',
        description: 'Established partnerships with top technology providers enabling preferential pricing and priority support.'
      },
      {
        title: 'Strategic Technology Planning',
        description: 'Guidance on technology investments aligned with business goals and technology roadmaps.'
      },
      {
        title: 'Comprehensive Sourcing',
        description: 'Procurement of hardware, software, peripherals, and accessories from a wide range of manufacturers.'
      },
      {
        title: 'Asset Lifecycle Management',
        description: 'Tracking of warranties, service contracts, and maintenance schedules for all technology assets.'
      }
    ],
    faqs: [
      {
        question: 'How much can we typically save through your procurement services?',
        answer: 'Clients typically see cost savings of 10-20% compared to retail pricing, depending on the volume and type of equipment. Beyond direct cost savings, our service also reduces the time your staff spends researching and procuring equipment.'
      },
      {
        question: 'How do you ensure we are getting the right equipment for our needs?',
        answer: 'We begin with a thorough assessment of your current environment, business requirements, and future growth plans. We then recommend solutions that align with these needs, considering factors like performance requirements, compatibility, scalability, and total cost of ownership.'
      },
      {
        question: 'Can you help with equipment disposal when we upgrade?',
        answer: 'Yes, we offer secure and environmentally responsible disposal services for outdated equipment. This includes data wiping to Department of Defense standards, recycling through certified e-waste partners, and providing documentation for compliance purposes.'
      },
      {
        question: 'Do you handle international procurement?',
        answer: 'Yes, we can manage international procurement, including navigating customs requirements, managing shipping logistics, and ensuring compliance with regional regulations. We have established relationships with global vendors and distributors.'
      }
    ]
  },
  {
    id: 'technical-support',
    slug: {
      current: 'technical-support',
      _type: 'slug'
    },
    title: 'Technical Support',
    description: 'Reliable on-site and remote support with quick response times to minimize business disruptions.',
    features: [
      'Remote support',
      'Network troubleshooting',
      'User training',
      'Email configuration'
    ],
    detailedDescription: `
      Our Technical Support services provide responsive, expert assistance for all your IT challenges. We understand that technical issues can severely impact productivity, 
      which is why we offer comprehensive support through multiple channels to resolve problems quickly and effectively.
      
      Our team of certified technicians can address a wide range of technical issues, from simple workstation problems to complex network troubleshooting. 
      We offer both remote support for immediate assistance and on-site support when hands-on intervention is required.
      
      Beyond just fixing problems, we take a proactive approach to support by identifying recurring issues, providing user education, and implementing preventive measures 
      to reduce future incidents. Our goal is to minimize disruptions to your business operations and ensure your technology consistently supports your productivity.
    `,
    benefits: [
      'Minimize downtime with rapid response support',
      'Improve staff productivity with efficient issue resolution',
      'Reduce recurring problems through root cause analysis',
      'Enhance user confidence with reliable technical assistance',
      'Focus on your core business while we handle IT challenges'
    ],
    keyFeatures: [
      {
        title: 'Multi-Channel Support',
        description: 'Assistance available via phone, email, ticketing system, and remote sessions for convenient issue reporting and resolution.'
      },
      {
        title: 'Proactive Monitoring',
        description: 'Continuous system monitoring to identify and address potential issues before they impact your operations.'
      },
      {
        title: 'User Training',
        description: 'Educational resources and sessions to help your team efficiently use technology and avoid common problems.'
      },
      {
        title: 'Detailed Documentation',
        description: 'Thorough recording of all support activities, creating a knowledge base for faster resolution of similar future issues.'
      }
    ],
    faqs: [
      {
        question: 'What are your support hours?',
        answer: 'Our standard support is available Monday through Friday, 8:00 AM to 6:00 PM. For clients with premium support agreements, we offer extended hours and weekend support. Emergency support for critical issues is available 24/7 for all clients.'
      },
      {
        question: 'How quickly do you typically resolve technical issues?',
        answer: 'Our first-contact resolution rate is approximately 70%, meaning many issues are resolved during the initial support interaction. For more complex issues, our average resolution time is under 4 hours. Critical system outages receive immediate priority attention.'
      },
      {
        question: 'Do you provide support for remote workers?',
        answer: 'Yes, we provide comprehensive support for remote and hybrid work environments. This includes VPN setup and troubleshooting, home office technology guidance, secure access configuration, and assistance with collaboration tools.'
      },
      {
        question: 'Can you help train our staff on new software?',
        answer: 'Absolutely. We offer customized training sessions for new software implementations, covering both basic functions and advanced features. Training can be delivered in person or virtually, and we can develop custom documentation tailored to your specific workflows.'
      }
    ]
  },
  {
    id: 'custom-ai-agents',
    slug: {
      current: 'custom-ai-agents',
      _type: 'slug'
    },
    title: 'Custom AI Agents',
    description: 'Tailored artificial intelligence agents designed to automate specific business processes and enhance operational efficiency.',
    features: [
      'Process automation',
      'Custom workflow integration',
      'Natural language interface',
      'Continuous learning capabilities'
    ],
    detailedDescription: `
      Our Custom AI Agents service helps businesses leverage the power of artificial intelligence to automate repetitive tasks, streamline workflows, and make data-driven decisions. We design, develop, and deploy custom AI agents tailored to your specific business needs.
      
      These intelligent agents can handle a wide range of tasks - from automated customer service and sales support to data analysis and predictive maintenance alerts. By combining machine learning, natural language processing, and domain-specific knowledge, our AI agents deliver significant operational efficiencies and cost savings.
      
      Unlike off-the-shelf solutions, our custom AI agents are built with your specific business processes and requirements in mind, ensuring seamless integration with your existing systems and maximum value from day one.
    `,
    benefits: [
      'Automate repetitive tasks to free up human resources for higher-value work',
      'Increase operational efficiency with 24/7 availability',
      'Improve consistency and reduce human error in process execution',
      'Gain valuable business insights through intelligent data analysis',
      'Enhance customer experience with responsive, always-available service'
    ],
    keyFeatures: [
      {
        title: 'Natural Language Understanding',
        description: 'Advanced NLP capabilities allowing agents to understand context, intent, and nuance in human communications.'
      },
      {
        title: 'Process Automation',
        description: 'Ability to execute complex, multi-step workflows across different systems and applications.'
      },
      {
        title: 'Continuous Learning',
        description: 'Self-improvement mechanisms that allow agents to become more effective over time through feedback and new data.'
      },
      {
        title: 'Integration Capabilities',
        description: 'Seamless connections with existing business systems, databases, and third-party services through modern APIs.'
      }
    ],
    faqs: [
      {
        question: 'How long does it take to develop a custom AI agent?',
        answer: 'Development timelines typically range from 6-12 weeks depending on complexity. This includes requirements analysis, training data preparation, model development, integration testing, and deployment. We follow an agile approach with regular demos and feedback cycles.'
      },
      {
        question: 'What kind of tasks can AI agents handle?',
        answer: 'Our AI agents can handle a wide range of tasks including customer support inquiries, appointment scheduling, data entry and verification, inventory management, predictive maintenance alerts, personalized recommendations, and routine report generation, among many others.'
      },
      {
        question: 'How do custom AI agents learn and improve?',
        answer: 'Our agents employ machine learning techniques to improve over time. They learn from user interactions, feedback loops, and new data. We also provide regular model updates and fine-tuning services as part of our maintenance packages.'
      },
      {
        question: 'What kind of return on investment can we expect?',
        answer: 'Most clients see ROI within 6-12 months. Typical benefits include 40-60% reduction in process handling time, 70% decrease in human errors, 24/7 availability without increased staffing costs, and improved customer satisfaction through faster response times. We work with you to establish key performance indicators and track improvement over time.'
      }
    ]
  }
];

export default services;