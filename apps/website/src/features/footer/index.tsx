"use client";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import LinkGroup from "./link_group";
import FooterBanners from "./footer_banner";
import clsx from "clsx";
import { FooterLinkKeys, footerLinks } from "./data";
import { staticContent } from "#/core/static_content";
import { GithubIcon } from "#/core/icons/github";
import { PaypalIcon } from "#/core/icons/paypal";
import { PatreonIcon } from "#/core/icons/patreon";
import { RedditLogo } from "#/core/icons/reddit";
import { BlueSkyLogo } from "#/core/icons/bluesky";
import { XLogo } from "#/core/icons/x_logo";

const copyRightString = `© Fluster ${new Date().getFullYear()} - All rights reserved, but do your thang`;

const footerKeys = Object.keys(footerLinks).filter((a) => a !== "banners");

const Footer = () => {
  const ref = useRef<HTMLDivElement>(null!);
  const inView = useInView(ref, { once: true });
  return (
    <div
      id="main-footer-container"
      className={clsx(
        "group/footer max-w-screen min-w-full flex flex-col justify-center items-center px-6 lg:px-12 pb-8 pt-6 border-t bg-background z-10 relative",
        footerLinks.banners && footerLinks.banners.length > 0 && "withBanners"
      )}
    >
      <div
        ref={ref}
        className={
          "w-full h-fit flex flex-col mb-0 sm:mb-6 lg:mb-0 lg:flex-row justify-between items-center"
        }
      >
        <div
          className={
            "w-fit flex flex-col items-center justify-start lg:items-start"
          }
        >
          <p
            className={
              "text-muted-foreground sm:whitespace-nowrap text-center lg:text-left"
            }
          >
            Quick links
          </p>
          <div
            className={
              "w-full flex flex-row justify-center lg:justify-start items-center gap-4 mt-4"
            }
          >
            <a href={staticContent.links.social.github}>
              <GithubIcon
                className={
                  "text-gray-300 h-6 w-6 hover:text-white transition-colors duration-300"
                }
              />
            </a>
            <a href={staticContent.links.fund.paypalDonate}>
              <PaypalIcon
                className={"fill-gray-300 h-6 w-6 hover:fill-white"}
                style={{
                  transition: "fill 300ms ease-in-out",
                }}
              />
            </a>
            <a href={staticContent.links.fund.patreon}>
              <PatreonIcon
                className={"fill-gray-300 h-6 w-6 hover:fill-white"}
                style={{
                  transition: "fill 300ms ease-in-out",
                }}
              />
            </a>
          </div>
          <div
            className={
              "w-full flex flex-row justify-center lg:justify-start items-center gap-4 mt-4"
            }
          >
            <a href={staticContent.links.social.subreddit}>
              <RedditLogo
                className={
                  "text-gray-300 h-6 w-6 hover:text-white transition-colors duration-300 [&_circle]:fill-gray-300"
                }
              />
            </a>
            <a href={staticContent.links.social.bluesky}>
              <BlueSkyLogo
                className={
                  "text-gray-300 h-6 w-6 hover:text-white transition-colors duration-300 [&_path]:fill-gray-300 [&_path]:hover:fill-gray-300"
                }
              />
            </a>

            <a href={staticContent.links.social.twitter}>
              <XLogo
                className={
                  "text-gray-300 h-6 w-6 hover:text-white transition-colors duration-300 [&_path]:fill-gray-300 [&_path]:hover:fill-gray-300"
                }
              />
            </a>
          </div>
        </div>
        <div
          className={
            "flex flex-col justify-center items-center sm:flex-row sm:justify-around sm:items-start w-full gap-6 mt-6 lg:mt-0 lg:ml-6"
          }
          style={{
            gridTemplateColumns: `repeat(${footerKeys.length}, 1fr)`,
          }}
        >
          {footerKeys.map((k, i) => {
            return (
              <LinkGroup
                key={k}
                inView={inView}
                idx={i}
                title={k}
                items={footerLinks[k as FooterLinkKeys]}
              />
            );
          })}
        </div>
      </div>
      {footerLinks.banners && (
        <FooterBanners inView={inView} banners={footerLinks.banners} />
      )}
      <p
        className={"flex flex-col text-sm text-gray-400 text-center lg:hidden"}
      >
        {copyRightString}
      </p>
      <motion.p
        className={"lg:flex flex-col text-sm text-gray-400 text-center hidden"}
        initial={{
          x: -200,
          scale: 0,
          opacity: 0,
        }}
        whileInView={{
          x: 0,
          scale: 1,
          opacity: 1,
        }}
        transition={{
          delay: 2,
        }}
      >
        {copyRightString}
      </motion.p>
    </div>
  );
};

Footer.displayName = "Footer";

export default Footer;
