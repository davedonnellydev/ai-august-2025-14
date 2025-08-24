# Project 14 #AIAugustAppADay: Full Stack: Blog Platform with AI Writing Assistant

![Last Commit](https://img.shields.io/github/last-commit/davedonnellydev/ai-august-2025-14)

**📆 Date**: 22/Aug/2025  
**🎯 Project Objective**: Simple blog platform where AI helps write or edit posts.  
**🚀 Features**: Auth (basic); Write blog post, get AI rewrite/expand suggestions; List/view posts  
**🛠️ Tech used**: Next.js, TypeScript, Mantine UI, Drizzle, libSQL (Turso), OpenAI Responses API  
**▶️ Live Demo**: [https://ai-august-2025-14.netlify.app](https://ai-august-2025-14.netlify.app)  
**Admin password:** superSecretPassword2025!  

## 🗒️ Summary

This was one of the bigger builds of the challenge so far — a **full stack app**. Since backend work isn’t my strongest area, I leaned heavily on AI to guide my approach. I used ChatGPT to sketch out a basic plan, which helped get me started, but I quickly ran into some of the limitations of relying on AI without context.  

Because the model didn’t know which dependencies I was using, how my starter repo was structured, or what my environment looked like, some of its suggestions were misleading or outdated. This slowed me down, and I had to spend extra time figuring out exactly how the backend should be structured and how data should be passed cleanly between the client and server.  

Despite the challenges, I got the app working, and I’m pretty happy with where it landed. This project will serve as a strong foundation for expanding blogging functionality on my own site. It also gave me the confidence that I’m becoming much more comfortable setting up and managing calls to OpenAI’s APIs — a skill that’s starting to feel second nature now.  

**Lessons learned**  
- AI guidance is powerful, but without context about your environment it can be misleading.  
- Backend development takes deliberate planning — don’t expect AI alone to fill every knowledge gap.  
- Confidence grows project by project: repetitive practice with API integration is paying off.  

**Final thoughts**  
This project stretched me in the best way. It reminded me that AI is a tool for support, not a silver bullet — but also showed me how far I’ve come in my ability to integrate and structure OpenAI’s APIs into real applications.  


This project has been built as part of my AI August App-A-Day Challenge. You can read more information on the full project here: [https://github.com/davedonnellydev/ai-august-2025-challenge](https://github.com/davedonnellydev/ai-august-2025-challenge).

## 🧪 Testing

![CI](https://github.com/davedonnellydev/ai-august-2025-14/actions/workflows/npm_test.yml/badge.svg)  
_Note: Test suite runs automatically with each push/merge._

## Quick Start

1. **Clone and install:**

   ```bash
   git clone https://github.com/davedonnellydev/ai-august-2025-14.git
   cd ai-august-2025-14
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

3. **Start development:**

   ```bash
   npm run dev
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# OpenAI API (for AI features)
OPENAI_API_KEY=your_openai_api_key_here

```

### Key Configuration Files

- `next.config.mjs` – Next.js config with bundle analyzer
- `tsconfig.json` – TypeScript config with path aliases (`@/*`)
- `theme.ts` – Mantine theme customization
- `eslint.config.mjs` – ESLint rules (Mantine + TS)
- `jest.config.cjs` – Jest testing config
- `.nvmrc` – Node.js version

### Path Aliases

```ts
import { Component } from '@/components/Component'; // instead of '../../../components/Component'
```

## 📦 Available Scripts

### Build and dev scripts

- `npm run dev` – start dev server
- `npm run build` – bundle application for production
- `npm run analyze` – analyze production bundle

### Testing scripts

- `npm run typecheck` – checks TypeScript types
- `npm run lint` – runs ESLint
- `npm run jest` – runs jest tests
- `npm run jest:watch` – starts jest watch
- `npm test` – runs `prettier:check`, `lint`, `typecheck` and `jest`

### Other scripts

- `npm run prettier:check` – checks files with Prettier
- `npm run prettier:write` – formats files with Prettier

## 📜 License

![GitHub License](https://img.shields.io/github/license/davedonnellydev/ai-august-2025-14)  
This project is licensed under the MIT License.
