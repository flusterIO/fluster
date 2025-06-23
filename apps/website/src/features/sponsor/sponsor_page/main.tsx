"use client";
import GithubSponsorList from "./sponsors_list_wrapper";
import SponsorshipRequestForm from "./sponsor_request_form/main";
import React from "react";

const SponsorFlusterPage = () => {
    return (
        <>
            <div
                className={
                    "w-full h-full min-h-screen flex flex-col justify-start items-center pt-[96px]"
                }
            >
                <h1 className={"text-5xl font-bold h-16 flex flex-row justify-center"}>
                    Sponsor Fluster
                </h1>
                <p className={"text-muted-foreground text-sm px-6 sm:px-8 text-center"}>
                    Your support goes a long way to support free, open source,
                    decentrialized software built to enable students and academics to be
                    at their best.
                </p>
                <div className={"w-fit flex flex-col justify-center items-center"}>
                    <h3 className={"text-3xl mt-8 mb-4 w-full"}>Sponsors</h3>
                    <GithubSponsorList />
                    <SponsorshipRequestForm />
                </div>
            </div>
        </>
    );
};

SponsorFlusterPage.displayName = "SponsorULLDPage";

export default SponsorFlusterPage;
