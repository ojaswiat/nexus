"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NexusLandingPage: React.FC = () => {
    const featureCardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    const techCardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    const features = [
        {
            title: "Authentication",
            description:
                "Built-in email and Google authentication using Supabase.",
            icon: (
                <svg
                    className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                    />
                </svg>
            ),
            link: "https://supabase.com",
        },
        {
            title: "Theming",
            description:
                "Support for light, dark, and system themes powered by next-themes.",
            icon: (
                <svg
                    className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                    />
                </svg>
            ),
            link: "https://github.com/pacocoursey/next-themes",
        },
        {
            title: "TurboRepo",
            description:
                "Blazing fast development with TurboRepo for high-speed builds and hot reloading.",
            icon: (
                <svg
                    className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                    />
                </svg>
            ),
            link: "https://turbo.build/",
        },
        {
            title: "Data Management",
            description:
                "Efficient data fetching with TanStack Query and type-safe database access with Prisma.",
            icon: (
                <svg
                    className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                    />
                </svg>
            ),
            link: "https://tanstack.com/query/latest",
        },
        {
            title: "UI Components",
            description:
                "Beautiful UI components with NextUI and animations powered by Framer Motion.",
            icon: (
                <svg
                    className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                    />
                </svg>
            ),
            link: "https://nextui.org/",
        },
        {
            title: "Type Safety",
            description:
                "End-to-end type safety with TypeScript and form validation with Zod.",
            icon: (
                <svg
                    className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                    />
                </svg>
            ),
            link: "https://www.typescriptlang.org/",
        },
    ];

    const technologies = [
        {
            name: "Next.js",
            link: "https://nextjs.org/",
            icon: "/images/nextjs.svg",
        },
        {
            name: "React",
            link: "https://react.dev/",
            icon: "/images/reactjs.svg",
        },
        {
            name: "TypeScript",
            link: "https://www.typescriptlang.org/",
            icon: "/images/typescript.svg",
        },
        {
            name: "Supabase",
            link: "https://supabase.com/",
            icon: "/images/supabase.svg",
        },
        {
            name: "React Query",
            link: "https://tanstack.com/query/latest",
            icon: "/images/query.svg",
        },
        {
            name: "Prisma",
            link: "https://www.prisma.io/",
            icon: "/images/prisma.svg",
        },
        {
            name: "HeroUI",
            link: "https://heroui.com/",
            icon: "/images/heroui.svg",
        },
        { name: "Zod", link: "https://zod.dev/", icon: "/images/zod.svg" },
    ];

    return (
        <div className="min-h-screen">
            <section className="py-20 md:py-32 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        Nexus
                    </motion.h1>
                    <motion.p
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        A NextJS project starter template with authentication,
                        theming, and best practices baked in
                    </motion.p>
                    <motion.div
                        animate={{ opacity: 1 }}
                        className="flex flex-col md:flex-row justify-center gap-4"
                        initial={{ opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Link
                            className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
                            href="#getting-started"
                        >
                            Get Started
                        </Link>
                        <Link
                            className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                            href="https://github.com/decoyder/nexus"
                        >
                            View on GitHub
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section
                className="py-16 md:py-24 bg-white dark:bg-background"
                id="features"
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
                        Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md"
                                initial="hidden"
                                variants={featureCardVariants}
                                viewport={{ once: true, margin: "-50px" }}
                                whileInView="visible"
                            >
                                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {feature.description.includes(
                                        feature.title.split(" ")[0],
                                    ) ? (
                                        <>
                                            {
                                                feature.description.split(
                                                    feature.title.split(" ")[0],
                                                )[0]
                                            }
                                            <Link
                                                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                                href={feature.link}
                                            >
                                                {feature.title.split(" ")[0]}
                                            </Link>
                                            {
                                                feature.description.split(
                                                    feature.title.split(" ")[0],
                                                )[1]
                                            }
                                        </>
                                    ) : (
                                        feature.description
                                    )}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section
                className="py-16 md:py-24 bg-gray-50 dark:bg-background"
                id="tech-stack"
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
                        Tech Stack
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {technologies.map((tech, index) => (
                            <motion.div
                                key={index}
                                className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow text-center"
                                initial="hidden"
                                variants={techCardVariants}
                                viewport={{ once: true, margin: "-30px" }}
                                whileInView="visible"
                            >
                                {/* TODO: Replace with actual tech logos */}
                                <Image
                                    alt={tech.icon}
                                    className="rounded-full mx-auto mb-3"
                                    height={64}
                                    src={tech.icon}
                                    width={64}
                                />
                                <h3 className="font-medium text-gray-800 dark:text-white">
                                    <Link
                                        className="hover:text-indigo-600 dark:hover:text-indigo-400"
                                        href={tech.link}
                                    >
                                        {tech.name}
                                    </Link>
                                </h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Getting Started Section */}
            <section
                className="py-16 md:py-24 bg-white dark:bg-background"
                id="getting-started"
            >
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
                        Getting Started
                    </h2>
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-md mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                            1. Clone the repository
                        </h3>
                        <div className="bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
                            <code className="text-green-400">
                                git clone https://github.com/decoyder/nexus.git
                                my-project
                            </code>
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                            2. Install dependencies
                        </h3>
                        <div className="bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
                            <code className="text-green-400">
                                cd my-project
                                <br />
                                bun install
                            </code>
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                            3. Set up Supabase
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Create a{" "}
                            <Link
                                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                href="https://supabase.com/"
                            >
                                Supabase
                            </Link>{" "}
                            project and add your credentials to{" "}
                            <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                                env.local
                            </code>
                        </p>
                        <div className="bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
                            <code className="text-green-400">
                                NEXT_PUBLIC_SUPABASE_URL=your-project-url
                                <br />
                                NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
                            </code>
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                            4. Run the development server
                        </h3>
                        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                            <code className="text-green-400">bun run dev</code>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Ready to build something awesome?
                        </p>
                        <Link
                            className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-lg hover:bg-indigo-700 transition-colors"
                            href="https://github.com/decoyder/nexus"
                        >
                            Get Started Now
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NexusLandingPage;
