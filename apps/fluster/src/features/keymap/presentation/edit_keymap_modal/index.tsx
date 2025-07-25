import { BodyPortal } from "@/components/body_portal";
import ModalBackdrop from "@/components/util/modal_backdrop";
import { EditKeymapSettingModalProps } from "@/events/window_events";
import { Button, H3, showToast, useEventListener } from "@fluster.io/dev";
import React, { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { KeymapItem } from "#/keymap/data/models/keymap_item";
import { useDispatch, useSelector } from "react-redux";
import { setKeymapEntry } from "#/keymap/state/slice";
import { KeymapId } from "#/keymap/data/models/keymap_ids";
import { KeyboardShortcutGroup } from "../keymap_setting_input";

import { AppState } from "@/state/initial_state";

const useKeymapState = (
    keymapId: KeymapId,
    initialStringifiedKeymap: string
): [string, () => void] => {
    const [keymapState, setKeymapState] = useState(initialStringifiedKeymap);
    const keymap = useSelector((state: AppState) => state.keymap);
    const dispatch = useDispatch();
    const km = useMemo(() => {
        return KeymapItem.fromString(keymapState);
    }, [keymapState]);
    const handleKeyDown = (e: KeyboardEvent): void => {
        const _km = new KeymapItem(
            e.shiftKey,
            e.metaKey,
            e.ctrlKey,
            e.altKey,
            e.key,
            km.desc
        );
        setKeymapState(_km.toString());
    };
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);
    const saveKeymapState = (): void => {
        const keymapAlreadyExists = () => {
            for (const k of Object.entries(keymap)) {
                if (k[1] === keymapState && k[0] !== keymapId) {
                    return true;
                }
            }
            return false;
        };
        if (!keymapAlreadyExists()) {
            dispatch(
                setKeymapEntry({
                    item: KeymapItem.fromString(keymapState),
                    id: keymapId,
                })
            );
        }
    };
    return [keymapState, saveKeymapState];
};

const KeymapModal = ({
    data,
    close,
}: {
    data: EditKeymapSettingModalProps;
    close: () => void;
}): ReactNode => {
    const [keymapState, saveKeymapState] = useKeymapState(
        data.settingKey,
        data.stringifiedKeyMap
    );
    return (
        <ModalBackdrop onClick={close}>
            <motion.div
                className="min-w-[350px] max-w-[min(768px,90vw)] px-4 py-3 bg-card text-card-foreground border rounded"
                initial="initial"
                animate="show"
                variants={{
                    show: {
                        opacity: 1,
                        scale: 1,
                    },
                    initial: {
                        opacity: 0,
                        scale: 0,
                    },
                }}
            >
                <H3>Edit Keymap</H3>
                <p className="text-sm text-muted-foreground">
                    {KeymapItem.fromString(keymapState).desc}
                </p>
                <div className="w-full h-fit flex flex-col justify-center items-center mt-12">
                    <KeyboardShortcutGroup item={KeymapItem.fromString(keymapState)} />
                </div>
                <div className="w-full flex flex-row justify-end items-center mt-4">
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            saveKeymapState();
                            showToast({
                                title: "Success",
                                body: "Your keymap has been updated successfully.",
                                variant: "Success",
                                duration: 3000,
                            });
                            close();
                        }}
                    >
                        Save
                    </Button>
                </div>
            </motion.div>
        </ModalBackdrop>
    );
};

export const EditKeymapSettingModal = (): ReactNode => {
    const [data, setData] = useState<EditKeymapSettingModalProps | null>(null);
    useEventListener("show-edit-keymap-modal", (e) => {
        setData(e.detail);
    });
    if (data === null) {
        return null;
    }
    return (
        <BodyPortal>
            <KeymapModal data={data} close={() => setData(null)} />
        </BodyPortal>
    );
};

EditKeymapSettingModal.displayName = "EditKeymapSettingModal";
