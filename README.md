# Assignment Project

A modern web application built with Next.js, React, and TypeScript, featuring a clean and responsive user interface powered by Tailwind CSS.

## 🌐 Live Demo

The application is deployed and available at: [https://insta-stories-xv5n.vercel.app/](https://insta-stories-xv5n.vercel.app/)

## 🚀 Technologies

- [Next.js 15.3.3](https://nextjs.org/) - React framework for production
- [React 19](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [ESLint](https://eslint.org/) - Code linting
- [Playwright](https://playwright.dev/) - End-to-end testing framework

## 📦 Project Structure

```
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── page.tsx        # Main page component
│   │   ├── layout.tsx      # Root layout component
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable components
│   │   ├── Stories.tsx     # Stories component
│   │   └── Loader.tsx      # Loading component
│   └── constants/          # Constant values
├── e2e/                    # End-to-end tests
│   └── stories.spec.ts     # Stories component tests
├── public/                 # Static assets
├── .next/                  # Next.js build output
└── node_modules/          # Project dependencies
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd assignment
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📝 Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run start` - Runs the built application
- `npm run lint` - Runs ESLint to check code quality
- `npm test` - Runs end-to-end tests in headless mode
- `npm run test:ui` - Runs end-to-end tests with UI mode

## 🧪 Testing

The project uses Playwright for end-to-end testing. The tests cover the following functionality:

- Story avatar display and navigation
- Story viewer opening and closing
- Navigation between stories
- Video story playback and controls
- Loading states and transitions

### Running Tests

1. Install Playwright browsers (first time only):

   ```bash
   npx playwright install
   ```

2. Run tests in headless mode:

   ```bash
   npm test
   ```

3. Run tests with UI mode (recommended for development):

   ```bash
   npm run test:ui
   ```

The tests run in three browsers (Chrome, Firefox, and Safari) to ensure cross-browser compatibility.

## 🚀 Deployment

The application is deployed on Vercel. The deployment process is automated through GitHub integration:

1. Push changes to the main branch
2. Vercel automatically builds and deploys the application
3. Preview deployments are created for pull requests

### Deployment URL

- Production: [https://insta-stories-xv5n.vercel.app/](https://insta-stories-xv5n.vercel.app/)

## 🔧 Configuration Files

- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `next.config.ts` - Next.js configuration
- `postcss.config.mjs` - PostCSS configuration for Tailwind
- `eslint.config.mjs` - ESLint configuration
- `playwright.config.ts` - Playwright test configuration

## 🏗️ Development

The project uses a modern development stack with:

- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **ESLint** for code quality
- **Next.js** for server-side rendering and routing
- **Playwright** for end-to-end testing

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
