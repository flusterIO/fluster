import React, { type ReactNode } from "react";
import { motion } from "motion/react";

import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";

const connector = connect((state: AppState, props: any) => ({
  state: state.commandPalette,
  props: props,
}));

interface CommandPaletteProps {
  state: AppState["commandPalette"];
}

const CommandPalette = connector(
  ({ state }: CommandPaletteProps): ReactNode => {
    return (
      <motion.div
        className="w-32 h-32 bg-green-500"
        animate={state.navStack.length > 0 ? "show" : "hide"}
        variants={{
          show: {
            scale: 1,
          },
          hide: {
            scale: 0,
          },
        }}
      >
        Cmd palette
      </motion.div>
    );
  },
);

CommandPalette.displayName = "CommandPalette";

export default CommandPalette;
