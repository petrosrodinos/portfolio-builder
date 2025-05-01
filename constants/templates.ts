import { Portfolio } from "@/interfaces/templates";

export const PortfolioData: Portfolio = {
    address: "New York",
    welcome_message: "Welcome to my portfolio! I'm a passionate developer focused on creating impactful solutions.",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    role: "Full Stack Developer",
    bio: "Experienced developer with a passion for creating elegant solutions to complex problems. Specialized in modern web technologies and best practices.",
    booking_link: "https://example.com/booking",
    resume: {
        url: "https://example.com/resume.pdf",
        name: "resume",
    },
    user: {
        full_name: "John Doe",
        country: "GR",
        date_of_birth: "1990-01-01",
        avatar: {
            url: "https://i.pravatar.cc/300",
            name: "name",
        },
    },
    educations: [
        {
            title: "Bachelor of Computer Science",
            institution: "University of Technology",
            start: "2016",
            finish: "2020",
            link: "https://github.com",
        },
        {
            title: "Master of Computer Science",
            institution: "University of Technology",
            start: "2018-01",
            finish: "2022-01",
        }
    ],
    experiences: [
        {
            title: "Senior Developer",
            company: "Tech Corp",
            location: "San Francisco, CA",
            start: "2020-01",
            finish: "2022-01",
            description: "Leading development teams and implementing modern web solutions.",
        },
        {
            title: "Senior Web3 Developer",
            company: "Tech Corp",
            location: "San Francisco, CA",
            start: "2020-01",
            description: "Leading development teams and implementing modern web solutions.",
        },
    ],
    projects: [
        {
            title: "E-commerce Platform",
            company: "Personal Project",
            start: "2021-01",
            finish: "2021-06",
            description: "Built a full-stack e-commerce platform using Next.js and Node.js",
            link: "https://github.com",
        }, {
            title: "Sass Portfolio",
            company: "Google",
            start: "2021-01",
            finish: "2021-06",
            description: "Built a full-stack e-commerce platform using Next.js and Node.js",
            link: "https://google.com",
        }
    ],
    services: [
        {
            title: "Web Development",
            description: "Custom web application development using modern technologies",
            price: "50",
        },
        {
            title: "Web Design",
            description: "Custom web design using modern technologies",
            price: "50",
        },
    ],
    skills: [
        {
            title: "react",
            level: "expert",
        },
        {
            title: "nodejs",
            level: "advanced",
        },
    ],
    languages: [
        {
            title: "GR",
            level: "advanced",
        },
        {
            title: "IE",
            level: "advanced",
        },
    ],
    links: [
        {
            title: "linkedin",
            link: "https://www.linkedin.com",
        },
        {
            title: "github",
            link: "https://github.com",
        },
    ],
}

export const TemplateTypes = {
    minimal: 'minimal',
    professional: 'professional',
    creative: 'creative',
    default: 'professional',
}

export const PortfolioTemplates: any = [
    {
        id: TemplateTypes.professional,
        name: "Professional",
        description: "Modern layout with emphasis on your achievements",
        gradient: "from-secondary/20 to-secondary/5",
        preview: "/portfolio/templates/professional",
        image: "/illustration_1.jpg"
    },
    {
        id: TemplateTypes.creative,
        name: "Creative",
        description: "Dynamic design with interactive elements and animations",
        preview: "/portfolio/templates/creative",
        gradient: "from-accent/20 to-accent/5",
        image: "/illustration_2.jpg"
    },
    // {
    //     id: TemplateTypes.minimal,
    //     name: "Minimal",
    //     description: "Clean and simple design focusing on your content",
    //     gradient: "from-primary/20 to-primary/5",
    //     preview: "/portfolio/templates/professional",
    // },

    // {
    //     id: 'premium',
    //     name: 'Premium',
    //     description: 'Premium design with interactive elements',
    //     preview: '/portfolio/templates/premium',
    //     gradient: 'from-accent/20 to-accent/5',
    // }
]

export type TemplateType = typeof TemplateTypes[keyof typeof TemplateTypes]

