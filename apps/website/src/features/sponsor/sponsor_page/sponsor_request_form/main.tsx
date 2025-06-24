import React from "react";
import BusinessInterestForm from "./form";
import { Separator } from "#/core/shad/ui/separator";

const SponsorshipRequestForm = () => {
    return (
        <div className="space-y-6 border rounded-lg px-4 py-6 my-12 max-w-[calc(100vw-4rem)] w-[768px]">
            <div>
                <h3 className="text-lg font-medium">Business Interests</h3>
                <p className="text-sm text-muted-foreground">
                    If you are reaching out on behalf of a business, let me know how I can
                    help.
                </p>
            </div>
            <Separator />
            <BusinessInterestForm />
        </div>
    );
};

SponsorshipRequestForm.displayName = "SponsorshipRequestForm";

export default SponsorshipRequestForm;
