export interface Dictionary {
    common: {
        services: string;
        portfolio: string;
        contact: string;
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
        cta: string;
        modal: {
            title: string;
            searchPlaceholder: string;
            backToOverview: string;
            visitProject: string;
            noResults: string;
            challenge: string;
            results: string;
        };
        projects: {
            id: number;
            title: string;
            category: string;
            tech: string[];
            description: string;
            details: string[]; // Detailed paragraphs
            results: string[]; // Bullet points
            year: string;
        }[];
        categories: {
            all: string;
            automation: string;
            chatbot: string;
            integration: string;
            content: string;
            analytics: string;
        };
    };
    chat: {
        placeholder: string;
        enterHint: string;
        exitHint: string;
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
    };
}
