import { Dictionary } from './types';

export const en: Dictionary = {
    common: {
        services: 'SERVICES',
        portfolio: 'PORTFOLIO',
        contact: 'CONTACT',
        imprint: 'Legal Notice',
        privacy: 'Privacy Policy',
        scrollHint: 'SCROLL FOR CHAT',
    },
    welcome: {
        intro: 'Welcome to SwiftGate AI',
        loading: 'LOADING',
        skip: 'Skip',
    },
    hero: {
        chatPlaceholder: 'Which processes in my company can be automated?',
        textBlock: 'We build your AI systems together with you—ensuring they are EU-compliant, scalable, and feel like a true employee rather than just another tool.',
        location: '[ ESSEN, GERMANY ]',
    },
    aboutMe: {
        title: 'The Human Behind the AI',
        greeting: 'Hi, I\'m Luis.',
        role: 'Founder of SwiftGateAI and the mind behind the technology.',
        p1: 'We live in an era where artificial intelligence is revolutionizing businesses and radically simplifying processes. The potential is enormous – from automation to data-driven real-time decisions.',
        p2: 'But with all technology, one thing must not be lost:',
        p3_bold: 'The human side.',
        p3: ' ',
        p4: 'I firmly believe that true innovation only arises where technological precision meets human intuition. My mission is to build high-tech solutions that don\'t feel foreign, but organically expand your business.',
        quote: '"Technology is the tool. Humans are the architects."',
        signature: 'Luis',
    },
    whatIDo: {
        bigTitle: {
            word1: 'WHAT',
            word2: 'I',
            word3: 'DO',
        },
        servicesTitle: 'SERVICES',
        teaser: {
            label: 'The Human Behind',
            text: 'Technology is just the tool. Discover the vision.',
            cta: 'Learn more',
        },
        sideText: {
            p1: 'AI as an Employee.',
            p2: '',
            sub: '',
            sections: [
                {
                    id: '01',
                    title: 'Autonomous AI & Agentic Systems',
                    text: 'Conventional software waits for commands—an AI agent acts. We are not talking about simple chat windows, but systems that independently map out, plan, and execute complex tasks. Agentic AI means the machine operates as a proactive, digital employee, rather than just a reactive tool.'
                },
                {
                    id: '02',
                    title: 'Flexibility Over Rigid Rules',
                    text: 'Traditional automation breaks the moment reality deviates from the predefined process flow. AI agents, however, possess cognitive flexibility. They understand context, correct errors iteratively, and independently seek alternatives when facing obstacles. The result is robust workflows that scale without constant manual intervention.'
                },
                {
                    id: '03',
                    title: 'Data Sovereignty & EU AI Act',
                    text: 'Progress must not come at the expense of security. We develop systems that uncompromisingly meet the strict requirements of the GDPR and the upcoming EU AI Act. Whether deployed on-premise in your data centers or in secure European cloud environments: your corporate data and intellectual property remain 100% under your control.'
                },
                {
                    id: '04',
                    title: 'Seamless Implementation',
                    text: 'Implementation does not require a radical overhaul of your existing infrastructure. We begin with the bottlenecks that cost your team the most time. Through APIs, we organically integrate agents into your existing processes—whether ERP, CRM, or internal communication. The transformation is step-by-step and measurable.'
                },
                {
                    id: '05',
                    title: 'Who is it for?',
                    text: 'Agentic AI is not a gimmick, but the solution for forward-thinking enterprises reaching the limits of manual scalability. We work with teams seeking freedom from repetitive cognitive load. While the AI handles operational execution in the background, your employees can refocus on strategy, creativity, and genuine growth.'
                }
            ]
        },
    },
    services: {
        items: [
            {
                title: 'Consulting & Analysis',
                description: 'Any serious software integration requires a precise understanding of your existing operational procedures. Before we map out the first system architecture, we analyze your processes in detail to pinpoint exactly where manual, repetitive work is unnecessarily slowing your team down. We do not view your operations as isolated tasks, but as connected value chains that can be intelligently linked through software. Our goal is a clear, data-driven implementation concept that demonstrates how cognitive software systems can be integrated to provide genuine, measurable workload relief from day one.',
                features: [
                    'Holistic Process Analysis and Vulnerability Assessment',
                    'Identification of Concrete Automation Opportunities',
                    'Planning for Seamless System Integration into Daily Operations'
                ],
            },
            {
                title: 'Server Landscape & Security',
                description: 'The foundation for any independently acting software system is an uncompromisingly secure server architecture. Your corporate data is your most valuable asset and must be treated with strict confidentiality at all times. We design and maintain infrastructures that withstand the high standards of the General Data Protection Regulation (GDPR) and upcoming EU regulations. Whether fully isolated on your own servers (on-premise) in your data center, or in strictly certified European cloud solutions: We ensure that your data and trade secrets never leave your company unnoticed. The technology works exclusively for you.',
                features: [
                    'Operation on Proprietary Servers or GDPR-Compliant Cloud Solutions',
                    'Fully Encrypted and Privacy-Compliant Processing',
                    'Highly Available and Failsafe System Architecture'
                ],
            },
            {
                title: 'System Capabilities',
                description: 'We do not develop simple dialogue systems only capable of providing standardized answers. We build cognitive software solutions that can independently follow courses of action, deeply understand contextual meaning, and reliably make complex decisions. Such software is capable, for example, of independently reading incoming inquiries, simultaneously searching for the matching customer data in your systems, grasping the content of relevant email attachments, and subsequently launching the necessary business process fully automatically. The system autonomously detects logical errors and corrects them in a timely manner—just as a well-trained clerk would do.',
                features: [
                    'Content Processing of Documents, Emails, and Receipts',
                    'Direct Connection to Existing Management Systems',
                    'Self-Correcting Logic Chains for Complex Tasks'
                ],
            },
            {
                title: 'Investment & Operating Costs',
                description: 'The use of intelligent software must pay off like a reliable workforce, rather than becoming a burden through hidden license costs. Instead of relying on opaque subscriptions with usage-based fees, we focus on honest cost structures and genuine added value. We calculate using clearly defined project phases and a predetermined fixed price for the entire software development. In subsequent operations, you only pay the actual, predictable server and maintenance costs. This grants you full financial oversight, predictable initial costs, and leads to sustainable savings as soon as the systems become active.',
                features: [
                    'Guaranteed Cost Certainty throughout the Entire Development Phase',
                    'Predictable, Resource-Based Server Costs without Hidden Fees',
                    'Sustainable Cost Reduction via a Digital Workforce'
                ],
            },
        ],
    },
    portfolio: {
        title: 'Active Systems Showcase',
        subtitle: 'What we build is now, not tomorrow. Autonomous AI systems like these are already operating as active AI employees in the field.',
        cta: 'View Portfolio',
        modal: {
            title: 'Project Archive',
            searchPlaceholder: 'Search projects by title, tech stack or description...',
            backToOverview: 'Back to Overview',
            visitProject: 'Visit Project',
            noResults: 'No projects found.',
            challenge: 'Challenge & Solution',
            results: 'Results',
        },
        projects: [
            {
                id: 1,
                title: 'AI Workflow Automation',
                category: 'Automation',
                tech: ['n8n', 'Python', 'OpenAI'],
                description: 'Automated data processing for e-commerce.',
                details: [
                    'Implemented end-to-end automation for a leading e-commerce retailer, analyzing incoming order data and automatically transferring it to the ERP system.',
                    'The system uses AI-powered classification to detect return reasons and proactively inform customer service.'
                ],
                results: [
                    '90% reduction in manual data entry',
                    '24/7 operation with no downtime',
                    'Error rate reduced by 99%'
                ],
                year: '2025'
            },
            {
                id: 2,
                title: 'Intelligent Support Bot',
                category: 'Chatbot',
                tech: ['OpenAI', 'Vector DB', 'React'],
                description: 'Customer support bot with context memory.',
                details: [
                    'A sophisticated chatbot trained on the company\'s entire knowledge base. It understands context, remembers past interactions, and resolves complex support tickets autonomously.',
                    'By integrating a Vector Database (Pinecone), answers are always precise and hallucination-free.'
                ],
                results: [
                    '60% fewer First-Level-Support tickets',
                    'Response time reduced from 4h to 2s',
                    'NPS score increased by 15 points'
                ],
                year: '2025'
            },
            {
                id: 3,
                title: 'CRM Realtime Sync',
                category: 'Integration',
                tech: ['Supabase', 'React', 'Edge Functions'],
                description: 'Real-time synchronization of CRM data.',
                details: [
                    'Development of middleware that keeps customer data synchronized between HubSpot, Salesforce, and an internal database in real-time.',
                    'Conflict resolution happens automatically based on defined "Source of Truth" logic.'
                ],
                results: [
                    'Complete data consistency across all systems',
                    'Elimination of data silos',
                    'Real-time dashboard for sales team realized'
                ],
                year: '2024'
            },
            {
                id: 4,
                title: 'SEO Content Engine',
                category: 'Content',
                tech: ['GPT-4', 'Next.js', 'Vercel'],
                description: 'SEO-optimized blog posts at the push of a button.',
                details: [
                    'An internal tool for marketing agencies that generates complete, SEO-optimized blog articles based on keywords and competitor analysis.',
                    'The system integrates current trends and adapts writing style to the brand voice.'
                ],
                results: [
                    'Content output increased 10x',
                    'Organic traffic +200% in 3 months',
                    'Editorial costs halved'
                ],
                year: '2024'
            },
            {
                id: 5,
                title: 'Predictive Sales Analytics',
                category: 'Analytics',
                tech: ['TensorFlow', 'Python', 'Dashboard'],
                description: 'Sales volume prediction using ML.',
                details: [
                    'Implementation of a Machine Learning model that correlates seasonal trends, marketing spend, and market data to predict sales figures for the coming quarter.',
                    'The dashboard enables scenario planning ("What happens if we invest budget X?").'
                ],
                results: [
                    'Forecast accuracy of 94%',
                    'Optimized inventory management (less overstock)',
                    'Data-driven budget allocation'
                ],
                year: '2023'
            },
        ],
        categories: {
            all: 'All',
            automation: 'Automation',
            chatbot: 'Chatbot',
            integration: 'Integration',
            content: 'Content',
            analytics: 'Analytics',
        },
    },
    chat: {
        placeholder: 'Ask me something...',
        enterHint: 'Press Enter to send',
        exitHint: 'Scroll to exit chat',
        suggestions: [
            'How can an AI employee lighten the load on our support team?',
            'Which processes in my company can be automated?',
            'How do I build an EU-compliant AI system?',
            'What does an AI integration cost?',
            'What sets you apart from standard chatbots?',
        ],
        mobileSuggestions: [
            'How does AI help support?',
            'What can be automated?',
            'Build EU-compliant AI?',
            'Integration costs?',
            'What makes you different?',
        ],
        overlayTitle: 'SwiftGate AI',
        demo: [
            { role: 'user', content: 'Hello! Can you tell me more about your services?' },
            { role: 'assistant', content: 'Sure! I offer Strategy, AI Integration, and Full-Stack Web Development. My focus is on scalable solutions that provide real business value.' },
            { role: 'user', content: 'How does the process work?' },
            { role: 'assistant', content: 'We start with analyzing your goals. Based on that, I develop a tailored roadmap. I work transparently, iteratively, and result-oriented.' },
        ],
    },
    contact: {
        label: 'Outreach',
        headline: 'Take the first step.',
        subheadline: 'Inquiries are completely free, and we are happy to advise you on your AI potential.',
        mailBtn: {
            title: 'Direct Mail',
            desc: 'Direct contact via email.',
        },
        aiBtn: {
            title: 'Smart Briefing',
            desc: 'Automatically generates a professional project request from our chat.',
            cta: 'Generate Now',
        },
    },
    footer: {
        rights: 'All rights reserved.',
        madeWith: 'Developed with',
        contact: 'Contact',
        sections: {
            legal: 'Legal',
            socials: 'Socials',
        },
        disclaimer: 'All content, text, images, graphics, and design elements of this website are subject to copyright and are the property of Luis Amadeus Guenther / Swiftgateai. Any use, reproduction, or distribution without express written permission is prohibited.',
        location: 'in Essen, Germany',
    },
    settings: {
        title: 'Settings',
        language: 'Language',
        accessibility: 'Accessibility',
        highContrast: 'High Contrast',
        largeText: 'Large Text',
        colorBlind: 'Color Blind Mode',
        comingSoon: 'Coming Soon',
    },
    ai: {
        error: 'An error occurred. Please try again.',
        rateLimit: 'Too many requests. Please wait a moment.',
        emptyInput: 'Please enter a message.',
        generating: 'Generating...',
        fallback: 'SwiftGate AI is available to answer your questions about our services. Contact us at hello@swiftgateai.de.',
        clipboardSuccess: 'Email text has been copied to clipboard. Please paste it into your email.',
        clipboardBody: 'Please paste the copied text.',
        mailError: 'The email could not be created. Please try again.',
        mailNoHistory: 'Please have a conversation in the chat first.',
    },
};
