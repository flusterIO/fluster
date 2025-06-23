import { TagIcon } from "lucide-react";
import React from "react";

interface PersonalInterestItemProps {
    value: string;
}

const PersonalInterestItem = ({ value }: PersonalInterestItemProps) => {
    return (
        <div
            className={
                "w-fit h-fit flex flex-row justify-start items-center gap-2 border border-foreground rounded-[24px] px-3 py-2 select-none"
            }
        >
            <TagIcon className={"w-3 h-3"} />
            <div className={"text-sm"} dangerouslySetInnerHTML={{ __html: value }} />
        </div>
    );
};

PersonalInterestItem.displayName = "PersonalInterestItem";

export default PersonalInterestItem;
