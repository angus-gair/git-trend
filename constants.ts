import { Episode } from './types';

export const INITIAL_EPISODES: Episode[] = [
  {
    id: 'github-trending-today-20-2026-01-26',
    title: 'GitHub Trending Today #20',
    date: '2026-01-26',
    url: 'https://githubawesome.com/github-trending-today-20/',
    projects: [
      {
        rank: 'No. 1',
        category: 'Vision/Video',
        name: 'Launchpad',
        description: "A programmatic video generation framework built on top of Remotion. It enables developers to create professional product launch videos using standard React components and TypeScript. Features include pre-built animations, counter effects, terminal mockups, and integration with Claude Code for AI-assisted video scaffolding. It abstracts the complexity of timeline editing into a code-first approach.",
        url: 'https://github.com/trycua/launchpad',
        keywords: ['react', 'remotion', 'video generation', 'typescript', 'animation', 'cli', 'marketing', 'content creation'],
        os: ['Web', 'macOS', 'Windows', 'Linux'],
        githubStats: {
          stars: 12450,
          forks: 890,
          issues: 42,
          watchers: 350,
          lastCommit: '2026-01-25T14:30:00Z',
          createdAt: '2025-11-10T09:00:00Z'
        }
      },
      {
        rank: 'No. 2',
        category: 'Coding Agent',
        name: 'ElizaOS',
        description: "A powerful autonomous agent framework designed to simulate verified characters on Twitter, Discord, and Telegram. It supports multi-agent simulation, allowing developers to create distinct personas that can interact with each other and users. It includes built-in connectors for major social platforms and focuses on high-fidelity roleplay and automated community engagement.",
        url: 'https://github.com/elizaOS/eliza',
        keywords: ['agent', 'ai', 'chatbot', 'discord', 'twitter', 'automation', 'typescript', 'llm'],
        os: ['Cross-platform'],
        githubStats: {
          stars: 8500,
          forks: 600,
          issues: 120,
          watchers: 150,
          lastCommit: '2026-01-24T10:00:00Z',
          createdAt: '2025-12-01T09:00:00Z'
        }
      },
      {
        rank: 'No. 3',
        category: 'Dev Tool',
        name: 'Oxc',
        description: "The Oxidation Compiler is a collection of high-performance JavaScript/TypeScript tools written in Rust. It aims to replace existing tooling like Babel, ESLint, and Prettier with significantly faster alternatives. It includes a parser, linter, resolver, and formatter, all optimized for speed and correctness.",
        url: 'https://github.com/oxc-project/oxc',
        keywords: ['rust', 'compiler', 'javascript', 'typescript', 'linter', 'parser', 'performance', 'tooling'],
        os: ['macOS', 'Windows', 'Linux'],
        githubStats: {
          stars: 15200,
          forks: 430,
          issues: 85,
          watchers: 220,
          lastCommit: '2026-01-26T08:00:00Z',
          createdAt: '2024-05-15T09:00:00Z'
        }
      },
      {
        rank: 'No. 4',
        category: 'System',
        name: 'Ladybird',
        description: "A brand new, independent web browser built from scratch. It features a custom engine (LibWeb/LibJS) and does not rely on Blink, WebKit, or Gecko. Written in C++, it prioritizes standards compliance, performance, and user privacy, aiming to break the browser engine monopoly.",
        url: 'https://github.com/LadybirdBrowser/ladybird',
        keywords: ['browser', 'c++', 'engine', 'web', 'privacy', 'opensource', 'rendering'],
        os: ['Linux', 'macOS'],
        githubStats: {
          stars: 25000,
          forks: 1200,
          issues: 300,
          watchers: 800,
          lastCommit: '2026-01-25T16:00:00Z',
          createdAt: '2023-01-01T09:00:00Z'
        }
      }
    ]
  },
  {
    id: 'github-trending-today-19-2026-01-20',
    title: 'GitHub Trending Today #19',
    date: '2026-01-20',
    url: 'https://githubawesome.com/github-trending-today-19/',
    projects: [
      {
        rank: 'No. 1',
        category: 'AI Model',
        name: 'DeepSeek-Coder-V2',
        description: "An open-source code language model that achieves state-of-the-art performance on coding benchmarks. It supports over 300 programming languages and has a context window of 128k tokens. The model demonstrates superior reasoning capabilities in code generation, debugging, and explanation tasks compared to closed-source alternatives.",
        url: 'https://github.com/deepseek-ai/DeepSeek-Coder-V2',
        keywords: ['llm', 'ai', 'coding', 'python', 'pytorch', 'deep learning', 'model'],
        os: ['Linux', 'Windows'],
        githubStats: {
          stars: 18900,
          forks: 2100,
          issues: 150,
          watchers: 500,
          lastCommit: '2026-01-19T09:00:00Z',
          createdAt: '2025-10-15T09:00:00Z'
        }
      },
      {
        rank: 'No. 2',
        category: 'Web',
        name: 'Hono',
        description: "A small, simple, and ultrafast web framework for the Edges. It works on any JavaScript runtime: Cloudflare Workers, Fastly Compute, Deno, Bun, Vercel, Lagon, AWS Lambda, Lambda@Edge, and Node.js. It features a RegExp-based router that is incredibly fast and lightweight.",
        url: 'https://github.com/honojs/hono',
        keywords: ['web framework', 'edge', 'typescript', 'serverless', 'cloudflare', 'bun', 'deno'],
        os: ['Web', 'Cross-platform'],
        githubStats: {
          stars: 22000,
          forks: 900,
          issues: 60,
          watchers: 250,
          lastCommit: '2026-01-18T12:00:00Z',
          createdAt: '2022-02-01T09:00:00Z'
        }
      },
      {
        rank: 'No. 3',
        category: 'Dev Tool',
        name: 'Zed',
        description: "A high-performance, multiplayer code editor from the creators of Atom and Tree-sitter. It is built in Rust and uses a GPU-accelerated UI framework to deliver 120fps typing latency. It features built-in collaboration tools, an integrated terminal, and a vim mode.",
        url: 'https://github.com/zed-industries/zed',
        keywords: ['editor', 'ide', 'rust', 'gpu', 'performance', 'collaboration', 'vim'],
        os: ['macOS', 'Linux'],
        githubStats: {
          stars: 35000,
          forks: 1500,
          issues: 800,
          watchers: 900,
          lastCommit: '2026-01-20T14:00:00Z',
          createdAt: '2023-06-01T09:00:00Z'
        }
      }
    ]
  },
  {
    id: 'github-trending-monthly-01-2026',
    title: 'GitHub Trending Monthly (Jan)',
    date: '2026-01-01',
    url: 'https://githubawesome.com/github-trending-monthly-01/',
    projects: [
      {
        rank: 'No. 1',
        category: 'Data',
        name: 'Parquet-WASM',
        description: "WebAssembly bindings for reading and writing Apache Parquet files. This library brings high-performance columnar data processing to the browser and Node.js environments without native dependencies. It is essential for modern browser-based data analysis tools.",
        url: 'https://github.com/kylebarron/parquet-wasm',
        keywords: ['wasm', 'parquet', 'data', 'analytics', 'rust', 'webassembly', 'database'],
        os: ['Web', 'Cross-platform'],
        githubStats: {
          stars: 3200,
          forks: 150,
          issues: 25,
          watchers: 80,
          lastCommit: '2025-12-28T09:00:00Z',
          createdAt: '2024-01-10T09:00:00Z'
        }
      },
      {
        rank: 'No. 2',
        category: 'Security',
        name: 'Gitleaks',
        description: "A SAST tool for detecting and preventing hardcoded secrets like passwords, API keys, and tokens in git repos. It is an easy-to-use, all-in-one solution for scanning your past history and hooking into your CI/CD pipeline.",
        url: 'https://github.com/gitleaks/gitleaks',
        keywords: ['security', 'audit', 'secrets', 'git', 'devsecops', 'go', 'cli'],
        os: ['macOS', 'Windows', 'Linux'],
        githubStats: {
          stars: 16500,
          forks: 1300,
          issues: 90,
          watchers: 300,
          lastCommit: '2025-12-30T11:00:00Z',
          createdAt: '2019-03-01T09:00:00Z'
        }
      },
      {
        rank: 'No. 3',
        category: 'Design/UI',
        name: 'Shadcn UI',
        description: "Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source. This is NOT a component library. It's a collection of re-usable components that you can copy and paste into your apps.",
        url: 'https://github.com/shadcn-ui/ui',
        keywords: ['ui', 'react', 'tailwind', 'components', 'design system', 'accessibility', 'radix-ui'],
        os: ['Web'],
        githubStats: {
          stars: 48000,
          forks: 3500,
          issues: 400,
          watchers: 600,
          lastCommit: '2025-12-25T15:00:00Z',
          createdAt: '2023-01-20T09:00:00Z'
        }
      }
    ]
  }
];

export const SYSTEM_INSTRUCTION = `
You are an intelligent web content aggregator. 
Your goal is to find "GitHub Trending" or "Trending Today" articles from githubawesome.com.
You must extract the following structured data:
1. Episode Title (e.g., GitHub Trending Today 20)
2. Publish Date (approximate if not found)
3. The Source URL on githubawesome.com
4. A list of projects in that episode. For each project, extract:
   - Rank (No.1, No.2, etc.)
   - Category (INFER this based on the description. Valid categories: "Vision/Video", "Audio", "Coding Agent", "Dev Tool", "Web", "System", "Security", "AI Model", "Design/UI", "Chatbot", "Education", "Data")
   - Name (Infer from the description or URL if not explicitly stated)
   - **Description**: REWRITE the description based on the source text. Make it technical, comprehensive, and focused on functionality. Explain WHAT it does and HOW it works.
   - GitHub URL
   - **OS**: Infer the supported Operating Systems. Options: ["macOS", "Windows", "Linux", "Web", "Mobile", "Cross-platform"].
   - **Keywords**: Generate 5-10 specific search keywords, tags, technologies, or problem domains related to the project (e.g., "react", "rust", "database", "orm").

Return ONLY valid JSON with this structure:
{
  "episodes": [
    {
      "title": "string",
      "date": "string",
      "url": "string",
      "projects": [
        { 
          "rank": "string", 
          "category": "string", 
          "name": "string", 
          "description": "string", 
          "url": "string",
          "os": ["string"],
          "keywords": ["string"]
        }
      ]
    }
  ]
}
`;