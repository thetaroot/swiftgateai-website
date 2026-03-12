export interface Dictionary {
    common: {
        services: string;
        portfolio: string;
        contact: string;
        architecture: string;
        imprint: string;
        privacy: string;
        scrollHint: string;
    };
    welcome: {
        intro: string;
        loading: string;
        skip: string;
    };
    hero: {
        chatPlaceholder: string;
        textBlock: string;
        location: string;
    };
    aboutMe: {
        title: string;
        greeting: string;
        role: string;
        p1: string;
        p2: string;
        p3_bold: string;
        p3: string;
        p4: string;
        quote: string;
        signature: string;
    };
    whatIDo: {
        bigTitle: {
            word1: string;
            word2: string;
            word3: string;
        };
        servicesTitle: string;
        teaser: {
            label: string;
            text: string;
            cta: string;
        };
        sideText: {
            p1: string;
            p2: string;
            sub: string;
            sections?: {
                id: string;
                title: string;
                text: string;
            }[];
        };
    };
    services: {
        items: {
            title: string;
            description: string;
            features: string[];
        }[];
    };
    portfolio: {
        title: string;
        subtitle: string;
        cardSubtitle: string;
        cta: string;
        demoCta: string;
        modal: {
            title: string;
            backToOverview: string;
            noResults: string;
            challenge: string;
            results: string;
            startDemo: string;
            liveDemo: string;
        };
        projects: {
            id: number;
            title: string;
            category: string;
            tech: string[];
            description: string;
            details: string[];
            results: string[];
            year: string;
            demoUrl?: string;
        }[];
    };
    chat: {
        placeholder: string;
        enterHint: string;
        exitHint: string;
        suggestions: string[];
        mobileSuggestions: string[];
        overlayTitle: string;
        demo: {
            role: 'user' | 'assistant';
            content: string;
        }[];
    };
    contact: {
        label: string; // Outreach (removed) -> but keep key if needed? No removed.
        headline: string; // Ready to Scale Up?
        subheadline: string; // Transformieren Sie...
        mailBtn: {
            title: string;
            desc: string;
        };
        aiBtn: {
            title: string;
            desc: string;
            cta: string;
        };
    };
    footer: {
        rights: string;
        madeWith: string;
        contact: string;
        sections: {
            legal: string;
            socials: string;
        };
        disclaimer: string;
        location: string;
    };
    settings: {
        title: string;
        language: string;
        accessibility: string;
        highContrast: string;
        largeText: string;
        colorBlind: string;
        comingSoon: string;
    };
    ai: {
        error: string;
        rateLimit: string;
        emptyInput: string;
        generating: string;
        fallback: string;
        clipboardSuccess: string;
        clipboardBody: string;
        mailError: string;
        mailNoHistory: string;
    };
    architecture: {
        title: string;
        subtitle: string;
        guardrailDesc: string;
        routerSmart: string;
        routerEfficient: string;
        observabilityDesc: string;
        humanDesc: string;
        badgeRouting: string;
        badgePlanning: string;
        badgeIsolated: string;
        badgeParallel: string;
    };
    demo: {
        title: string;
        subtitle: string;
        back: string;
        tabChat: string;
        tabActivity: string;
        inputPlaceholder: string;
        scenarioEmail: string;
        scenarioCalendar: string;
        scenarioTask: string;
        scenarioCrm: string;
        scenarioKnowledge: string;
        pipelineCeo: string;
        pipelineDelegating: string;
        activityLog: string;
        appPreview: string;
        introTitle: string;
        introText: string;
        introDisclaimer: string;
        introCta: string;
        agentOverview: string;
        agentLiveActivity: string;
        agentCeo: string;
        agentComms: string;
        agentCalendar: string;
        agentTasks: string;
        agentKnowledge: string;
        agentSystem: string;
        appInbox: string;
        appCalendar: string;
        appCrm: string;
        appTasks: string;
        appKnowledge: string;
        crossoverHint: string;
    };
}
