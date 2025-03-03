import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    slug: 'enterprise-infrastructure-upgrade',
    title: 'Enterprise Infrastructure Upgrade',
    category: 'Hardware Support',
    description: 'Complete IT infrastructure overhaul for a major financial institution, improving system performance by 200%.',
    image: '/images/projects/infrastructure.jpg',
    client: 'Leading East African Bank',
    duration: '6 months',
    completionDate: 'December 2024',
    services: [
      'Infrastructure Assessment',
      'Hardware Upgrade',
      'Network Optimization',
      'System Migration',
      'Staff Training'
    ],
    challenge: 'The client was facing significant performance issues with their legacy infrastructure, resulting in slow transaction processing and frequent system downtimes. Their aging hardware and fragmented network architecture were becoming major bottlenecks for their growing digital banking operations.',
    solution: 'We implemented a comprehensive infrastructure upgrade program that included modernizing their server architecture, optimizing network topology, and implementing robust redundancy systems. The solution involved deploying high-performance servers, upgrading network equipment, and implementing advanced monitoring systems.',
    results: [
      '200% improvement in system performance',
      'Reduced system downtime by 99.9%',
      'Increased transaction processing capacity by 300%',
      'Reduced operational costs by 40%',
      'Enhanced security compliance'
    ],
    technologies: [
      'Dell PowerEdge Servers',
      'Cisco Networking Equipment',
      'VMware Virtualization',
      'NetApp Storage Solutions',
      'Zabbix Monitoring System'
    ],
    testimonial: {
      quote: 'The infrastructure upgrade has transformed our operations. We\'ve seen remarkable improvements in performance and reliability.',
      author: 'John Doe',
      position: 'CTO',
      company: 'Leading East African Bank'
    },
    gallery: [
      '/images/projects/infrastructure/server-room.jpg',
      '/images/projects/infrastructure/network-setup.jpg',
      '/images/projects/infrastructure/monitoring-dashboard.jpg'
    ]
  },
  {
    slug: 'cloud-migration-solution',
    title: 'Cloud Migration Solution',
    category: 'Software Solutions',
    description: 'Seamless migration of legacy systems to cloud infrastructure for a manufacturing company.',
    image: '/images/projects/cloud.jpg',
    client: 'Major Manufacturing Company',
    duration: '4 months',
    completionDate: 'January 2025',
    services: [
      'Cloud Strategy Development',
      'Migration Planning',
      'Implementation',
      'Training & Support',
      'Performance Optimization'
    ],
    challenge: 'The client needed to modernize their operations by moving from on-premises infrastructure to cloud-based solutions while ensuring minimal disruption to their manufacturing processes and maintaining data integrity.',
    solution: 'We developed a phased migration strategy that included careful planning, testing, and implementation. Our team used a hybrid approach initially, gradually moving systems to the cloud while maintaining essential on-premises components during the transition.',
    results: [
      'Reduced IT infrastructure costs by 60%',
      'Improved system accessibility by 100%',
      'Enhanced disaster recovery capabilities',
      'Increased operational efficiency by 40%',
      'Zero data loss during migration'
    ],
    technologies: [
      'AWS Cloud Services',
      'Docker Containers',
      'Kubernetes',
      'Terraform',
      'CloudWatch Monitoring'
    ],
    testimonial: {
      quote: 'The cloud migration has revolutionized how we operate. Our systems are more reliable and accessible than ever.',
      author: 'Jane Smith',
      position: 'Operations Director',
      company: 'Major Manufacturing Company'
    },
    gallery: [
      '/images/projects/cloud/migration-dashboard.jpg',
      '/images/projects/cloud/cloud-architecture.jpg',
      '/images/projects/cloud/monitoring-system.jpg'
    ]
  },
  {
    slug: 'network-security-implementation',
    title: 'Network Security Implementation',
    category: 'Technical Support',
    description: 'Comprehensive security system deployment for a healthcare provider, ensuring HIPAA compliance.',
    image: '/images/projects/security.jpg',
    client: 'Leading Healthcare Provider',
    duration: '3 months',
    completionDate: 'February 2025',
    services: [
      'Security Assessment',
      'Firewall Implementation',
      'Access Control Systems',
      'Security Training',
      'Compliance Documentation'
    ],
    challenge: 'The healthcare provider needed to strengthen their network security to protect patient data and ensure compliance with healthcare regulations while maintaining efficient access for healthcare professionals.',
    solution: 'We implemented a multi-layered security approach including advanced firewalls, encrypted communication channels, and robust access control systems. The solution also included comprehensive staff training and documentation.',
    results: [
      'Achieved 100% compliance with regulations',
      'Enhanced data protection measures',
      'Reduced security incidents by 95%',
      'Improved access control efficiency',
      'Successfully passed security audits'
    ],
    technologies: [
      'Cisco Security Solutions',
      'Palo Alto Firewalls',
      'Microsoft Azure AD',
      'Encrypted Communication Systems',
      'Security Information and Event Management (SIEM)'
    ],
    testimonial: {
      quote: 'Our network security has never been stronger. The team\'s expertise in healthcare compliance was invaluable.',
      author: 'Dr. Sarah Johnson',
      position: 'IT Director',
      company: 'Leading Healthcare Provider'
    },
    gallery: [
      '/images/projects/security/security-dashboard.jpg',
      '/images/projects/security/access-control.jpg',
      '/images/projects/security/training-session.jpg'
    ]
  }
];