"use client";
import React, { FC } from "react";
import NextImage from "next/image";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { CakeIcon, GlobeIcon, MailIcon, LinkedinIcon } from "lucide-react";
import { ResumeData } from "./resume_data";
import { GithubIcon } from "#/core/icons/github";

const Image = motion(NextImage);

type ResumeHeaderProps = Pick<
    ResumeData,
    "avatar" | "dob" | "email" | "homepage" | "github" | "linkedIn"
>;

interface IconItemProps {
    icon: FC<{ className?: string }>;
    label: string;
    href?: string;
    removeHttps?: boolean;
    index: number;
}

const IconItem = ({
    icon: Icon,
    label,
    href,
    removeHttps,
    index,
}: IconItemProps) => {
    if (removeHttps) {
        label = label.replace("https://", "");
    }
    const Body = () => {
        return (
            <motion.div
                className={"flex flex-row justify-start items-center gap-2"}
                initial={{
                    x: 100,
                    opacity: 0,
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                        delay: 0.1 * index,
                    },
                }}
            >
                <Icon className={"h-3 w-3"} />
                <div className={"text-sm"}>{label}</div>
            </motion.div>
        );
    };
    if (href) {
        return (
            <a href={href}>
                <Body />
            </a>
        );
    } else {
        return <Body />;
    }
};

const ResumeHeader = ({
    dob,
    email,
    homepage,
    github,
    linkedIn,
    avatar,
}: ResumeHeaderProps) => {
    return (
        <div
            className={
                "w-full flex flex-col justify-start items-center md:flex-row min-[768px]:justify-around min-[1080px]:justify-between md:items-center"
            }
        >
            <div
                className={
                    "flex flex-col min-[450px]:flex-row justify-center items-center w-fit gap-4 md:gap-6"
                }
            >
                <div
                    className={
                        "w-[175px] h-[175px] relative flex justify-center items-center"
                    }
                >
                    <motion.div
                        className={
                            "rounded-full absolute left-0 top-0 w-[175px] h-[175px] border-primary border-[4px] flex flex-col justify-center items-center"
                        }
                        initial={{
                            scale: 0,
                        }}
                        animate={{
                            scale: 1,
                            transition: {
                                delay: 0.25,
                            },
                        }}
                    />
                    <Image
                        src={`/assets/resume/${avatar}`}
                        alt="Me"
                        width={150}
                        height={150}
                        className={"rounded-full"}
                        initial={{
                            scale: 0,
                        }}
                        animate={{
                            scale: 1,
                        }}
                    />
                </div>
                <div
                    className={
                        "flex-col justify-center items-center min-[450px]:items-start"
                    }
                >
                    <motion.div
                        className={
                            "text-4xl font-semibold leading-none text-center min-[450px]:text-left"
                        }
                        initial={{
                            x: -100,
                            opacity: 0,
                        }}
                        animate={{
                            x: 0,
                            opacity: 1,
                            transition: {
                                delay: 0.15,
                            },
                        }}
                    >
                        Andrew
                    </motion.div>
                    <motion.div
                        className={
                            "text-4xl font-semibold leading-none text-center min-[450px]:text-left"
                        }
                        initial={{
                            x: -100,
                            opacity: 0,
                        }}
                        animate={{
                            x: 0,
                            opacity: 1,
                            transition: {
                                delay: 0.2,
                            },
                        }}
                    >
                        Mueller
                    </motion.div>
                    <motion.div
                        className={
                            "text-muted-foreground text-center min-[450px]:text-left"
                        }
                        initial={{
                            x: -100,
                            opacity: 0,
                        }}
                        animate={{
                            x: 0,
                            opacity: 1,
                            transition: {
                                delay: 0.25,
                            },
                        }}
                    >
                        (he/him)
                    </motion.div>
                </div>
            </div>
            <div
                className={
                    "flex min-[450px]:grid min-[450px]:grid-cols-2 md:flex flex-col justify-center items-start gap-2 mt-6 md:mt-0"
                }
            >
                <IconItem
                    index={0}
                    icon={(props) => <CakeIcon {...props} />}
                    label={dayjs(dob).format("MM/DD/YYYY")}
                />
                <IconItem
                    index={1}
                    icon={(props) => <MailIcon {...props} />}
                    label={email}
                    href={`mailto:${email}`}
                />
                <IconItem
                    index={2}
                    icon={(props) => <GlobeIcon {...props} />}
                    label={homepage}
                    href={homepage}
                    removeHttps
                />
                {linkedIn && (
                    <IconItem
                        index={3}
                        icon={(props) => <LinkedinIcon {...props} />}
                        label={linkedIn}
                        href={linkedIn}
                        removeHttps
                    />
                )}
                <IconItem
                    index={linkedIn ? 4 : 3}
                    icon={(props) => <GithubIcon {...props} />}
                    label={github}
                    href={github}
                    removeHttps
                />
            </div>
        </div>
    );
};

ResumeHeader.displayName = "ResumeHeader";

export default ResumeHeader;
