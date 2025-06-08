"use client";
import React from "react";
import { MotionProps, motion } from "framer-motion";
import { HeroBackground } from "./hero_background";
import { staticContent } from "#/core/static_content";
import { Badge, buttonVariants, cn } from "@fluster.io/dev";
import Link from "next/link";
import { Brain, Download, Globe, Sparkles, Video, Zap } from "lucide-react";

const MotionLink = motion.create(Link);

/* const  */

const variants: MotionProps["variants"] = {
    show: {
        scale: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 3,
        },
    },
    hide: {
        scale: 0,
    },
};

/* const buttonMotionVariants: Variants  = { */

const HeroSection = () => {
    return (
        <HeroBackground containerClassName="min-h-screen w-full">
            <div
                className={
                    "min-h-[calc(100vh-76px)] w-full flex flex-col justify-center items-center"
                }
            >
                <div className="text-center w-[min(90vw,56rem)] z-10">
                    <Badge variant="secondary" className="mb-4">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI-Powered Research Platform
                    </Badge>
                    <motion.h1
                        className={
                            "text-[7vw] sm:text-5xl text-center align-middle text-5xl md:text-6xl font-bold mb-6 leading-tight inline-block text-foreground"
                        }
                        variants={variants}
                        animate={"show"}
                        initial={"hide"}
                    >
                        The Ultimate Note-Taking App for{" "}
                        <span className="bg-gradient-to-r from-foreground to-primary via-primary bg-clip-text text-transparent inline-block">
                            {"Scientists & Researchers"}
                        </span>
                    </motion.h1>
                    <motion.span
                        className={"sm:text-lg text-center font-semibold"}
                        initial={{
                            y: -200,
                            scale: 0,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            scale: 1,
                            opacity: 1,
                        }}
                        transition={{
                            delay: 0.5,
                        }}
                    >
                        Built with <span className="text-yellow-500">Rust</span> for maximum
                        performance. Featuring AI-powered RAG, vector databases,
                        bibliography management, and seamless integration with your research
                        workflow.
                    </motion.span>
                </div>
                <div
                    className={
                        "mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6"
                    }
                >
                    <MotionLink
                        href={"/downloads"}
                        className={cn(
                            "bg-gradient-to-r from-blue-600 to-primary hover:from-blue-700 hover:to-primary",
                            buttonVariants()
                        )}
                        animate="show"
                        initial="initial"
                        variants={{
                            initial: {
                                opacity: 0,
                                scale: 0,
                            },
                            show: {
                                opacity: 1,
                                scale: 1,
                            },
                        }}
                        transition={{
                            delay: 0.2,
                        }}
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Download Now
                    </MotionLink>
                    <motion.a
                        href={staticContent.links.videoDemo}
                        className={cn(
                            "bg-gradient-to-r from-blue-600 to-primary hover:from-blue-700 hover:to-primary",
                            buttonVariants()
                        )}
                        animate="show"
                        initial="initial"
                        variants={{
                            initial: {
                                opacity: 0,
                                scale: 0,
                            },
                            show: {
                                opacity: 1,
                                scale: 1,
                            },
                        }}
                        transition={{
                            delay: 0.35,
                        }}
                    >
                        <Video className="w-5 h-5 mr-2" />
                        Video Demo
                    </motion.a>
                </div>
                <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={{
                            initial: {
                                x: -100,
                                opacity: 0,
                            },
                            animate: {
                                x: 0,
                                opacity: 1,
                            },
                        }}
                        transition={{
                            delay: 0.7
                        }}
                        className="flex items-center"
                    >
                        <Globe className="w-4 h-4 mr-2" />
                        Cross-Platform
                    </motion.div>
                    <motion.div
                        className="flex items-center"
                        initial="initial"
                        animate="animate"
                        variants={{
                            initial: {
                                y: 200,
                                opacity: 0,
                            },
                            animate: {
                                y: 0,
                                opacity: 1,
                            },
                        }}
                        transition={{
                            delay: 0.85
                        }}
                    >
                        <Zap className="w-4 h-4 mr-2" />
                        Rust Performance
                    </motion.div>
                    <motion.div
                        className="flex items-center"
                        initial="initial"
                        animate="animate"
                        variants={{
                            initial: {
                                x: -100,
                                opacity: 0,
                            },
                            animate: {
                                x: 0,
                                opacity: 1,
                            },
                        }}
                        transition={{
                            delay: 0.4
                        }}
                    >
                        <Brain className="w-4 h-4 mr-2" />
                        AI-Powered
                    </motion.div>
                </div>
            </div>
        </HeroBackground>
    );
};

HeroSection.displayName = "HeroSection";

export default HeroSection;
