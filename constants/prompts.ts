export const createPortfolioPrompt = `
    You are a professional resume writer. You are given a resume and you need to create a portfolio for the user.
    The portfolio should be a JSON object that matches the following interface,do not include any other text and make all the dates in a valid date format,the language title should be the language code as AT for german,GR for greek,EN for english,etc":
    interface PortfoloAIData {
    profile: {
        email: string;
        phone: string;
        address: string;
        bio: string;
        role: string;
    },
    experiences: {
        title: string;
        description: string;
        company: string;
        location: string;
        start: string;
        finish: string;
        link: string;
        type:'experience'
    }[],
    projects: {
        title: string;
        description: string;
        start: string;
        finish: string;
        company: string;
        location: string;
        link: string;
        type:'project'
    }[],
    educations: {
        title: string;
        description: string;
        start: string;
        finish: string;
        institution: string;
        type:'education'
    }[],
    languages: {
        title: string;
        level: string;
        type:'language'
    }[],
    links: {
        title: string;
        link: string;
        type:'link'
    }[],
    skills: {
        title: string;
        level: string;
        type:'skill'
    }[]
}
    The resume is:
`;

export const test = JSON.parse(`
    {
    "profile": {
        "email": "petrosrodinos@gmail.com",
        "phone": "(+30) 6975638081",
        "address": "Heraklion, 71303, Greece",
        "bio": "Dynamic Smart Contract Developer with 3 years of experience specializing in Solidity and Full Stack Web Development. Experienced at designing, implementing, and optimizing smart contracts. Skilled in writing secure and efficient Solidity code, conducting code reviews, and working collaboratively to contribute to new product features. Strong understanding of smart contract security and gas optimization with a focus on delivering high-quality, scalable solutions. Passionate about blockchain technology and committed to continuous improvement.",
        "role": "Full Stack Smart Contract Developer"
    },
    "experiences": [
        {
            "title": "Full-Stack/Web3",
            "description": "Developed a full-stack Ethereum DApp using Solidity, React and Express.js. Designed and implemented smart contracts to issue ERC-20 tokens for receipt scanning rewards, ensuring secure token issuance and redemption processes. Integrated Web3.js for seamless frontend-backend communication and utilized Hardhat for smart contract testing and deployment. Conducted comprehensive security assessments and gas optimization for smart contracts to ensure scalability and efficiency.",
            "company": "Conveos",
            "location": "Heraklion",
            "start": "Aug 2022",
            "finish": "Present",
            "link": "",
            "type": "experience"
        },
        {
            "title": "Blockchain-Powered Transportation DApp",
            "description": "Developed a decentralized transportation rewards app using Solidity and React, with ERC-20 token rewards based on distance traveled. Integrated DeFi functionality by adding staking and yield aggregation for additional rewards. Used Chainlink oracles for real-time data, and optimized smart contracts for security and gas efficiency. Engineered backend interactions with Ethers.js to ensure seamless blockchain communication.",
            "company": "Conveos",
            "location": "Heraklion",
            "start": "Aug 2022",
            "finish": "Present",
            "link": "",
            "type": "experience"
        },
        {
            "title": "Ethereum Subdomain Issuance Platform",
            "description": "Designed the backend architecture and frontend interface for a web platform leveraging the Ethereum Name Service (ENS) protocol to issue and sell subdomain names. Built secure Solidity smart contracts for domain registration, transfer, and ownership management. Developed a user-friendly frontend with Vue.js, seamlessly integrated with the Ethereum network using Ethers.js.",
            "company": "Conveos",
            "location": "Heraklion",
            "start": "Aug 2022",
            "finish": "Present",
            "link": "",
            "type": "experience"
        },
        {
            "title": "Winery Customer App",
            "description": "Developed a winery customer app with features including label scanning using OCR technology, user-generated content integration, and a recommendation system for tasting preferences based on machine learning algorithms. Designed a scalable backend with Express.js and MongoDB to handle user data and content storage. Implemented a dynamic Vue.js frontend for an intuitive user interface. Managed a team of three interns, providing technical guidance on feature development, code reviews, and project timelines.",
            "company": "Conveos",
            "location": "Heraklion",
            "start": "Aug 2022",
            "finish": "Present",
            "link": "",
            "type": "experience"
        },
        {
            "title": "Full-Stack/Web3 Developer (Internship)",
            "description": "Developed an NFT marketplace using the ERC-1155 standard on Ethereum with Solidity, React, and Express.js. Built secure smart contracts for minting, buying, and selling NFTs. Integrated Truffle for development, Ganache for local blockchain simulation, and Ethers.js for Ethereum interactions. Used RainbowKit for wallet integration and Wagmi for React hooks to streamline blockchain operations, ensuring scalability, security, and performance.",
            "company": "Conveos",
            "location": "Heraklion",
            "start": "Jul 2022",
            "finish": "Aug 2022",
            "link": "",
            "type": "experience"
        }
    ],
    "projects": [
        {
            "title": "Full-Stack DApp for Token-Based Reward System",
            "description": "Developed a full-stack Ethereum DApp using Solidity, React and Express.js. Designed and implemented smart contracts to issue ERC-20 tokens for receipt scanning rewards, ensuring secure token issuance and redemption processes. Integrated Web3.js for seamless frontend-backend communication and utilized Hardhat for smart contract testing and deployment. Conducted comprehensive security assessments and gas optimization for smart contracts to ensure scalability and efficiency.",
            "start": "Aug 2022",
            "finish": "Present",
            "company": "Conveos",
            "location": "Heraklion",
            "link": "",
            "type": "experience"
        },
        {
            "title": "Blockchain-Powered Transportation DApp",
            "description": "Developed a decentralized transportation rewards app using Solidity and React, with ERC-20 token rewards based on distance traveled. Integrated DeFi functionality by adding staking and yield aggregation for additional rewards. Used Chainlink oracles for real-time data, and optimized smart contracts for security and gas efficiency. Engineered backend interactions with Ethers.js to ensure seamless blockchain communication.",
            "start": "Aug 2022",
            "finish": "Present",
            "company": "Conveos",
            "location": "Heraklion",
            "link": "",
            "type": "experience"
        },
        {
            "title": "Ethereum Subdomain Issuance Platform",
            "description": "Designed the backend architecture and frontend interface for a web platform leveraging the Ethereum Name Service (ENS) protocol to issue and sell subdomain names. Built secure Solidity smart contracts for domain registration, transfer, and ownership management. Developed a user-friendly frontend with Vue.js, seamlessly integrated with the Ethereum network using Ethers.js.",
            "start": "Aug 2022",
            "finish": "Present",
            "company": "Conveos",
            "location": "Heraklion",
            "link": "",
            "type": "experience"
        },
        {
            "title": "Winery Customer App",
            "description": "Developed a winery customer app with features including label scanning using OCR technology, user-generated content integration, and a recommendation system for tasting preferences based on machine learning algorithms. Designed a scalable backend with Express.js and MongoDB to handle user data and content storage. Implemented a dynamic Vue.js frontend for an intuitive user interface. Managed a team of three interns, providing technical guidance on feature development, code reviews, and project timelines.",
            "start": "Aug 2022",
            "finish": "Present",
            "company": "Conveos",
            "location": "Heraklion",
            "link": "",
            "type": "experience"
        },
        {
            "title": "Multi-Vendor NFT marketplace",
            "description": "Developed an NFT marketplace using the ERC-1155 standard on Ethereum with Solidity, React, and Express.js. Built secure smart contracts for minting, buying, and selling NFTs. Integrated Truffle for development, Ganache for local blockchain simulation, and Ethers.js for Ethereum interactions. Used RainbowKit for wallet integration and Wagmi for React hooks to streamline blockchain operations, ensuring scalability, security, and performance.",
            "start": "Jul 2022",
            "finish": "Aug 2022",
            "company": "Conveos",
            "location": "Heraklion",
            "link": "",
            "type": "experience"
        }
    ],
    "educations": [
        {
            "title": "Bachelor's degree",
            "description": "Computer Engineering",
            "start": "Oct 2018",
            "finish": "June 2023",
            "institution": "Hellenic Mediterranean University, Heraklion, Greece",
            "type": "education"
        },
        {
            "title": "Seminar",
            "description": "Blockchain Technologies",
            "start": "Feb 2023",
            "finish": "May 2023",
            "institution": "University of The Aegean, Heraklion, Greece",
            "type": "education"
        }
    ],
    "languages": [
        {
            "title": "English",
            "level": "",
            "type": "language"
        },
        {
            "title": "Greek",
            "level": "",
            "type": "language"
        }
    ],
    "links": [
        {
            "title": "LinkedIn",
            "link": "https://linkedin.com/in/petros-rodinos/",
            "type": "link"
        }
    ],
    "skills": [
        {
            "title": "React",
            "level": "",
            "type": "skill"
        },
        {
            "title": "ExpressJs",
            "level": "",
            "type": "skill"
        },
        {
            "title": "JavaScript",
            "level": "",
            "type": "skill"
        },
        {
            "title": "Solidity",
            "level": "",
            "type": "skill"
        }
    ]
}

    `)


