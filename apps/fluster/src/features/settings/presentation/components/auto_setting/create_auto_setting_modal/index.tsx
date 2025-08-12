import React, { type ReactNode } from "react";
import { motion } from "motion/react";
import ModalBackdrop from "@/components/util/modal_backdrop";
import { CreateAutoSettingForm } from "./create_auto_setting_form";

export const CreateAutoSettingModal = ({
  close,
}: {
  close: () => void;
}): ReactNode => {
  return (
    <ModalBackdrop onClick={close}>
      <motion.div
        className="px-4 py-3 rounded border bg-card text-card-foreground w-[min(540px,90vw)] @container/auto_setting_modal"
        initial="initial"
        animate="show"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        variants={{
          show: {
            scale: 1,
            opacity: 1,
          },
          initial: {
            scale: 0,
            opacity: 0,
          },
        }}
      >
        <h4 className="text-xl font-bold">Create Auto Setting</h4>
        <CreateAutoSettingForm close={close} />
      </motion.div>
    </ModalBackdrop>
  );
};

CreateAutoSettingModal.displayName = "CreateAutoSettingModal";
