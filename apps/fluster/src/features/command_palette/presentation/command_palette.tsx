"use client"
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import CommandPaletteInput from "./command_palette_input";
import CommandPaletteResults from "./command_palette_results";
import {
  CommandPaletteActionType,
  useCommandPaletteContext,
  useCommandPaletteDispatch,
} from "../state/command_palette_provider";
import { useEventListener } from "@/hooks/use_event_listener";
import { CommandPaletteRoot } from "../data/command_palette_tree";

const getWidth = (): number => Math.min(768, window.innerWidth - 64);

const CommandPalette = (): ReactNode => {
  const input = useRef<HTMLInputElement>(null!);
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(getWidth());
  const dispatch = useCommandPaletteDispatch();
  const handleResize = () => setWidth(getWidth());
  const state = useCommandPaletteContext();
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEventListener("show_command_palette", async () => {
    const cat = new CommandPaletteRoot();
    const items = await cat.getItems();
    dispatch({
      type: CommandPaletteActionType.appendCommandPaletteCategory,
      payload: {
        cat,
        items,
      },
    });
  });
  useEffect(() => {
    setOpen(state.navStack.length > 0);
  }, [state.navStack]);
  if (state.navStack.length == 0) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black/20 dark:bg-black/70 z-[1000]"
      animate={open ? "show" : "hide"}
      variants={{
        show: {
          opacity: 1,
        },
        hide: {
          opacity: 0,
        },
      }}
      onClick={() =>
        dispatch({
          type: CommandPaletteActionType.setCommandPaletteOpen,
          payload: false,
        })
      }
    >
      <motion.div
        style={{
          left: (window.innerWidth - width) / 2,
          width: `${width}px`,
        }}
        className="max-h-[80vh] absolute top-24 bg-popover rounded-lg border"
        variants={{
          show: {
            scale: 1,
          },
          hide: {
            scale: 0,
            top: 0,
          },
        }}
      >
        <CommandPaletteInput ref={input} />
        <CommandPaletteResults />
      </motion.div>
    </motion.div>
  );
};

CommandPalette.displayName = "CommandPalette";

export default CommandPalette;
