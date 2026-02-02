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
  },
  {
    id: 'github-trending-today-18-2026-01-15',
    title: 'GitHub Trending Today #18',
    date: '2026-01-15',
    url: 'https://githubawesome.com/github-trending-today-18/',
    projects: [
      {
        rank: 'No. 1',
        category: 'Dev Tool',
        name: 'Rye',
        description: "A hands-on experimental alternative to the Python packaging ecosystem. It provides a unified experience for installing Python, managing dependencies, and running projects. Rye aims to simplify Python project management by bundling together tools like pyenv, pip, and virtualenv into a single cohesive workflow.",
        url: 'https://github.com/mitsuhiko/rye',
        keywords: ['python', 'packaging', 'dependency management', 'tooling', 'project management', 'rust'],
        os: ['macOS', 'Windows', 'Linux'],
        githubStats: {
          stars: 18500,
          forks: 520,
          issues: 180,
          watchers: 340,
          lastCommit: '2026-01-14T11:00:00Z',
          createdAt: '2023-11-15T09:00:00Z'
        }
      },
      {
        rank: 'No. 2',
        category: 'AI Model',
        name: 'Llama 3',
        description: "Meta's latest open-source large language model family. Llama 3 features improved reasoning, coding, and creative writing capabilities compared to previous versions. It comes in multiple sizes (8B, 70B) and is optimized for both consumer hardware and enterprise deployments.",
        url: 'https://github.com/meta-llama/llama3',
        keywords: ['llm', 'ai', 'meta', 'language model', 'open source', 'pytorch', 'inference'],
        os: ['Cross-platform'],
        githubStats: {
          stars: 42000,
          forks: 7500,
          issues: 280,
          watchers: 1200,
          lastCommit: '2026-01-13T16:00:00Z',
          createdAt: '2024-04-18T09:00:00Z'
        }
      },
      {
        rank: 'No. 3',
        category: 'Web',
        name: 'HTMX',
        description: "A library that allows you to access modern browser features directly from HTML, using attributes. It enables building hypermedia-driven applications with simplicity and power, avoiding the complexity of heavy JavaScript frameworks while maintaining interactivity.",
        url: 'https://github.com/bigskysoftware/htmx',
        keywords: ['html', 'javascript', 'web', 'hypermedia', 'frontend', 'rest', 'ajax'],
        os: ['Web'],
        githubStats: {
          stars: 35000,
          forks: 1200,
          issues: 220,
          watchers: 650,
          lastCommit: '2026-01-15T09:30:00Z',
          createdAt: '2020-05-20T09:00:00Z'
        }
      },
      {
        rank: 'No. 4',
        category: 'Coding Agent',
        name: 'Aider',
        description: "An AI pair programming tool that runs in your terminal. Aider works with your local git repository, editing files and making commits based on your requests. It supports multiple LLM providers and can handle complex multi-file changes while maintaining clean git history.",
        url: 'https://github.com/paul-gauthier/aider',
        keywords: ['ai', 'coding assistant', 'git', 'terminal', 'pair programming', 'llm', 'automation'],
        os: ['macOS', 'Windows', 'Linux'],
        githubStats: {
          stars: 21500,
          forks: 1900,
          issues: 320,
          watchers: 480,
          lastCommit: '2026-01-14T14:00:00Z',
          createdAt: '2023-05-25T09:00:00Z'
        }
      }
    ]
  },
  {
    id: 'github-trending-today-17-2026-01-10',
    title: 'GitHub Trending Today #17',
    date: '2026-01-10',
    url: 'https://githubawesome.com/github-trending-today-17/',
    projects: [
      {
        rank: 'No. 1',
        category: 'System',
        name: 'Eigen',
        description: "A C++ template library for linear algebra, matrix, vector, numerical solvers, and related algorithms. Eigen is widely used in robotics, computer vision, and machine learning applications due to its performance and expressive API. It's header-only and has no dependencies.",
        url: 'https://github.com/libeigen/eigen',
        keywords: ['c++', 'linear algebra', 'math', 'matrix', 'scientific computing', 'robotics', 'ml'],
        os: ['Cross-platform'],
        githubStats: {
          stars: 38000,
          forks: 12000,
          issues: 450,
          watchers: 950,
          lastCommit: '2026-01-09T10:00:00Z',
          createdAt: '2011-12-20T09:00:00Z'
        }
      },
      {
        rank: 'No. 2',
        category: 'Vision/Video',
        name: 'Manim',
        description: "An animation engine for explanatory math videos. Manim uses Python to programmatically create precise mathematical animations, used by channels like 3Blue1Brown. It supports complex geometric transformations, LaTeX rendering, and smooth interpolations.",
        url: 'https://github.com/3b1b/manim',
        keywords: ['animation', 'python', 'math', 'visualization', 'video', 'education', 'latex'],
        os: ['macOS', 'Windows', 'Linux'],
        githubStats: {
          stars: 58000,
          forks: 5600,
          issues: 720,
          watchers: 1500,
          lastCommit: '2026-01-08T15:30:00Z',
          createdAt: '2018-03-15T09:00:00Z'
        }
      },
      {
        rank: 'No. 3',
        category: 'Dev Tool',
        name: 'uv',
        description: "An extremely fast Python package installer and resolver, written in Rust. uv serves as a drop-in replacement for pip and pip-tools, offering 10-100x speed improvements. It also includes project management capabilities and can install Python itself.",
        url: 'https://github.com/astral-sh/uv',
        keywords: ['python', 'rust', 'package manager', 'installer', 'tooling', 'performance', 'dependency resolution'],
        os: ['macOS', 'Windows', 'Linux'],
        githubStats: {
          stars: 32000,
          forks: 950,
          issues: 280,
          watchers: 720,
          lastCommit: '2026-01-10T11:00:00Z',
          createdAt: '2024-02-20T09:00:00Z'
        }
      },
      {
        rank: 'No. 4',
        category: 'AI Model',
        name: 'Mistral',
        description: "An open-source large language model optimized for chat and reasoning tasks. Mistral 7B outperforms larger models on many benchmarks while being efficient enough to run on consumer hardware. The model is released under Apache 2.0 license for commercial use.",
        url: 'https://github.com/mistralai/mistral',
        keywords: ['llm', 'ai', 'language model', 'chat', 'inference', 'pytorch', 'open source'],
        os: ['Cross-platform'],
        githubStats: {
          stars: 48000,
          forks: 6200,
          issues: 380,
          watchers: 1100,
          lastCommit: '2026-01-09T14:00:00Z',
          createdAt: '2023-09-25T09:00:00Z'
        }
      }
    ]
  },
  {
    id: 'github-trending-today-16-2026-01-05',
    title: 'GitHub Trending Today #16',
    date: '2026-01-05',
    url: 'https://githubawesome.com/github-trending-today-16/',
    projects: [
      {
        rank: 'No. 1',
        category: 'Design/UI',
        name: 'Framer Motion',
        description: "A production-ready motion library for React. It provides a simple declarative API for animations, gestures, and layout transitions. Framer Motion includes spring physics, drag interactions, and server-side rendering support out of the box.",
        url: 'https://github.com/framer/motion',
        keywords: ['react', 'animation', 'motion', 'ui', 'gestures', 'transitions', 'spring physics'],
        os: ['Web'],
        githubStats: {
          stars: 46000,
          forks: 2000,
          issues: 340,
          watchers: 580,
          lastCommit: '2026-01-04T12:00:00Z',
          createdAt: '2018-08-10T09:00:00Z'
        }
      },
      {
        rank: 'No. 2',
        category: 'Dev Tool',
        name: 'Biome',
        description: "A fast formatter, linter, and compiler for JavaScript, TypeScript, and JSX. Biome aims to replace Babel, ESLint, Prettier, and other tools with a single unified solution written in Rust. It offers significant performance improvements and IDE integration.",
        url: 'https://github.com/biomejs/biome',
        keywords: ['rust', 'javascript', 'typescript', 'linter', 'formatter', 'tooling', 'performance'],
        os: ['Cross-platform'],
        githubStats: {
          stars: 12500,
          forks: 420,
          issues: 280,
          watchers: 290,
          lastCommit: '2026-01-05T09:00:00Z',
          createdAt: '2023-09-10T09:00:00Z'
        }
      },
      {
        rank: 'No. 3',
        category: 'System',
        name: 'Tauri',
        description: "A framework for building tiny, fast binaries for all major desktop platforms. Using a web frontend as the UI, Tauri produces applications that are smaller and more secure than equivalent Electron apps while maintaining the same development experience.",
        url: 'https://github.com/tauri-apps/tauri',
        keywords: ['rust', 'desktop', 'web', 'cross-platform', 'electron alternative', 'ui', 'framework'],
        os: ['macOS', 'Windows', 'Linux'],
        githubStats: {
          stars: 78000,
          forks: 2300,
          issues: 890,
          watchers: 1100,
          lastCommit: '2026-01-04T16:00:00Z',
          createdAt: '2019-04-20T09:00:00Z'
        }
      },
      {
        rank: 'No. 4',
        category: 'Coding Agent',
        name: 'Continue',
        description: "An open-source AI code assistant that runs inside VS Code and JetBrains. Continue provides autocomplete, chat, and code refactoring capabilities. It can be configured to use any LLM provider and works entirely offline.",
        url: 'https://github.com/continuedev/continue',
        keywords: ['ai', 'coding assistant', 'vscode', 'jetbrains', 'autocomplete', 'llm', 'ide'],
        os: ['Web', 'macOS', 'Windows', 'Linux'],
        githubStats: {
          stars: 19500,
          forks: 1100,
          issues: 420,
          watchers: 380,
          lastCommit: '2026-01-03T14:30:00Z',
          createdAt: '2023-06-25T09:00:00Z'
        }
      }
    ]
  },
  {
    id: 'github-trending-weekly-15-20-Combined',
    title: 'GitHub Trending Weekly (Issues 15-20)',
    date: '2026-01-01',
    url: 'https://githubawesome.com/trending-weekly-collection/',
    projects: [
      {
        rank: 'No. 1',
        category: 'Dev Tool',
        name: 'Bun',
        description: "A JavaScript runtime, bundler, test runner, and package manager all in one. Bun is designed to be a drop-in replacement for Node.js with significantly faster startup and execution. It's written in Zig and natively implements TypeScript and JSX.",
        url: 'https://github.com/oven-sh/bun',
        keywords: ['javascript', 'runtime', 'bundler', 'zig', 'typescript', 'node alternative', 'performance'],
        os: ['macOS', 'Windows', 'Linux'],
        githubStats: {
          stars: 68000,
          forks: 1800,
          issues: 1200,
          watchers: 1400,
          lastCommit: '2026-01-01T10:00:00Z',
          createdAt: '2022-07-01T09:00:00Z'
        }
      },
      {
        rank: 'No. 2',
        category: 'AI Model',
        name: 'Stable Diffusion',
        description: "A latent text-to-image diffusion model capable of generating photo-realistic images from text descriptions. Stable Diffusion runs on consumer GPUs with as little as 8GB VRAM and has sparked a revolution in AI art generation tools and applications.",
        url: 'https://github.com/Stability-AI/stablediffusion',
        keywords: ['ai', 'image generation', 'diffusion', 'stable diffusion', 'art', 'machine learning', 'gpu'],
        os: ['Cross-platform'],
        githubStats: {
          stars: 135000,
          forks: 24000,
          issues: 1800,
          watchers: 6800,
          lastCommit: '2025-12-30T15:00:00Z',
          createdAt: '2022-08-22T09:00:00Z'
        }
      },
      {
        rank: 'No. 3',
        category: 'Web',
        name: 'Next.js',
        description: "The React framework for production. Next.js provides hybrid static and server rendering, TypeScript support, smart bundling, route pre-fetching, and more. It's used by some of the world's largest companies for high-performance web applications.",
        url: 'https://github.com/vercel/next.js',
        keywords: ['react', 'framework', 'ssr', 'static site', 'typescript', 'vercel', 'web'],
        os: ['Web'],
        githubStats: {
          stars: 125000,
          forks: 26000,
          issues: 1400,
          watchers: 2800,
          lastCommit: '2026-01-01T08:00:00Z',
          createdAt: '2016-10-05T09:00:00Z'
        }
      },
      {
        rank: 'No. 4',
        category: 'System',
        name: 'Turbo',
        description: "An incremental build system for JavaScript and TypeScript. Turbo speeds up monorepo builds by caching and only rebuilding what changed. It integrates with popular frameworks like Next.js and supports both local and remote caching.",
        url: 'https://github.com/vercel/turbo',
        keywords: ['build system', 'monorepo', 'caching', 'rust', 'typescript', 'performance', 'vercel'],
        os: ['Cross-platform'],
        githubStats: {
          stars: 26000,
          forks: 890,
          issues: 340,
          watchers: 480,
          lastCommit: '2025-12-31T11:00:00Z',
          createdAt: '2021-10-15T09:00:00Z'
        }
      },
      {
        rank: 'No. 5',
        category: 'Security',
        name: 'Kubernetes',
        description: "Production-grade container orchestration system. Kubernetes automates deployment, scaling, and management of containerized applications across clusters of hosts. It has become the de facto standard for cloud-native application deployment.",
        url: 'https://github.com/kubernetes/kubernetes',
        keywords: ['containers', 'orchestration', 'docker', 'cloud native', 'devops', 'scaling', 'microservices'],
        os: ['Cross-platform'],
        githubStats: {
          stars: 108000,
          forks: 38000,
          issues: 4200,
          watchers: 5800,
          lastCommit: '2026-01-01T07:00:00Z',
          createdAt: '2014-06-06T09:00:00Z'
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