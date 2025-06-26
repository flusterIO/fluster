"use client";
import { onEnter } from "@/events/on_enter";
import { AppRoutes, Input } from "@fluster.io/dev";
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";

const SimpleDashboardInput = (): ReactNode => {
    const [value, setValue] = useState("");
    const valueRef = useRef(value);

    useEffect(() => {
        valueRef.current = value;
    }, [value]);
    const nav = useNavigate();
    return (
        <Input
            className="w-full !text-lg p-6 rounded-[80px]"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) =>
                onEnter(
                    e,
                    () => {
                        const sp = new URLSearchParams();
                        sp.set("query", valueRef.current);
                        nav(`${AppRoutes.semanticSearch}?${sp.toString()}`);
                    },
                    "onEnter"
                )
            }
        />
    );
};

SimpleDashboardInput.displayName = "SimpleDashboardInput";

export default SimpleDashboardInput;
