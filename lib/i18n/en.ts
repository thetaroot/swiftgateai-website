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
        chatPlaceholder: 'How can AI scale my business?',
        textBlock: 'Swiftgate develops tailored AI solutions for modern enterprises. We automate processes with intelligent workflows and create scalable systems. From strategy to integration – we are your partner for digital transformation.',
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
            p1: "It doesn't have to be hard,",
            p2: 'to keep up with 2026.',
            sub: 'AI & Business Integrations',
        },
    },
    services: {
        items: [
            {
                title: 'Strategy & Consulting',
                description: 'Technology only delivers results when it fits the business — not the other way around.\n\nBefore a single line of code is written, we work together to analyze where your company stands today and where it wants to go. We identify the processes that cost the most time, money, and energy — and show you exactly which ones can be immediately optimized through AI and automation.\n\nNo tech jargon. No generic recommendations. Instead, an honest analysis with a clear roadmap: What delivers the biggest impact? What is realistically implementable? And what makes sense in the long run?\n\nThe result: A tailor-made strategy that you understand, that you stand behind — and that we can implement right away.',
                features: [
                    'Analysis of existing business processes & workflows',
                    'Identification of automation potential',
                    'Technology roadmap with concrete priorities',
                    'Cost-benefit evaluation before every implementation',
                    'Competitive analysis: Where is your industry already using AI?',
                ],
            },
            {
                title: 'AI & Automation',
                description: 'Artificial intelligence is no longer a future topic — it is the tool your competition is already using.\n\nWe integrate cutting-edge AI models directly into your existing systems and workflows. No isolated solutions, no gimmicks — but automations that measurably save time and costs from day one. From intelligent chatbots that answer your customer inquiries around the clock, to automated data processing, to complete workflow chains that fully replace manual labor.\n\nWe use the best available language models and tailor them precisely to your company\'s requirements — with your data, your tone of voice, your processes. You don\'t get an off-the-shelf standard solution, but a system that feels as if it were developed in-house.',
                features: [
                    'Integration of AI language models into existing business processes',
                    'Automation of recurring tasks & workflows',
                    'Intelligent chatbots & customer communication',
                    'Automated data capture, processing & analysis',
                    'Connecting your existing tools into seamless automation chains',
                    'Custom AI solutions, trained on your industry and your data',
                ],
            },
            {
                title: 'Development & Infrastructure',
                description: 'AI needs a home — we build it. Anywhere, no matter how complex.\n\nEvery AI solution is only as good as the technical foundation it runs on. We develop everything your system needs to function: web applications, cloud architectures, local software solutions, interfaces between your existing tools — or complete platforms from scratch.\n\nWe adapt to your reality, not the other way around. Your data needs to stay local? No problem. You work entirely in the cloud? Also no problem. You need a combination of both? Even less of a problem. We write the code that makes your AI solutions run — and build the environment in which they work reliably.\n\nWhether website, internal application, database, API, or a system that doesn\'t exist yet: If it needs to be built, we build it.',
                features: [
                    'Web applications, platforms & enterprise websites',
                    'Cloud infrastructure & deployment',
                    'Local software solutions & on-premise systems',
                    'API development & system integration',
                    'Databases, backend architecture & data pipelines',
                    'Custom dashboards, internal tools & admin panels',
                    'Technical foundation for all AI & automation solutions',
                ],
            },
            {
                title: 'Ongoing Support & Maintenance',
                description: 'We don\'t deliver and disappear — we stay.\n\nMost agencies hand over a finished project and are hard to reach afterwards. At SwiftgateAI, things are different. We see ourselves as your external IT team: reliable, reachable, and invested in your long-term success.\n\nWhether it\'s a technical issue on the weekend, a spontaneous adjustment, or the next big idea — you have a dedicated contact person who knows your system, your processes, and your goals. No waiting queues, no ticket systems, no rotating contacts. Instead, a partner who thinks ahead and works alongside you as if they were part of your team.\n\nYou don\'t need to build your own IT team. You already have one.',
                features: [
                    'Dedicated contact person with full system understanding',
                    'Ongoing maintenance, updates & security patches',
                    'Fast response times — even outside business hours',
                    'Proactive optimization suggestions instead of just problem-solving',
                    'Flexible support packages, scalable with your growth',
                    'Monthly reports & transparent communication',
                ],
            },
        ],
    },
    portfolio: {
        title: 'Intelligent Automations',
        subtitle: 'Real results, no gimmicks. We build systems that deliver measurable value and transform businesses.',
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
        demo: [
            { role: 'user', content: 'Hello! Can you tell me more about your services?' },
            { role: 'assistant', content: 'Sure! I offer Strategy, AI Integration, and Full-Stack Web Development. My focus is on scalable solutions that provide real business value.' },
            { role: 'user', content: 'How does the process work?' },
            { role: 'assistant', content: 'We start with analyzing your goals. Based on that, I develop a tailored roadmap. I work transparently, iteratively, and result-oriented.' },
        ],
    },
    contact: {
        label: 'Outreach',
        headline: 'Ready for the Next Step?',
        subheadline: 'Efficiency through intelligence. We transform your vision into future-proof technology.',
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
    },
};
