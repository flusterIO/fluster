import React from "react";
import SampleSponsorList from "./sample_sponsors_list";
import SponsorList from "./sponsors_list";

const ExistingSponsorsList = () => {
    // Need to actually get sponsors here.
    const sponsors = [];
    return sponsors.length === 0 ? <SampleSponsorList /> : <SponsorList />;
};

ExistingSponsorsList.displayName = "ExistingSponsorsList";

export default ExistingSponsorsList;
