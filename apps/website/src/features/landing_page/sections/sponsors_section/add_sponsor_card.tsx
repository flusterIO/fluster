import React from "react";
import { PlusIcon } from "lucide-react";
import { SponsorLogoCard } from "./sponsor_logo_card";

const AddSponsorCard = () => {
  return (
    <SponsorLogoCard
      classes={{
        container:
          "group/sponsorContent w-full lg:w-[calc(50%-1rem)] text-muted-foreground",
        title:
          "group-hover/sponsorContent:text-foreground transition-colors duration-500 ease-in",
      }}
      logo={
        <PlusIcon
          className={
            "text-muted-foreground h-12 w-12 group-hover/sponsorContent:text-foreground transition-colors ease-in duration-500"
          }
        />
      }
      title="Add your company"
      desc="This is a sample sponsor card. Replace one of these cards with your logo and a link to your site by clicking below."
      href="/sponsor"
    />
  );
};

AddSponsorCard.displayName = "AddSponsorCard";

export default AddSponsorCard;
