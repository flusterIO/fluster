import React, { useEffect, useState, type ReactNode } from "react";
import { GroupedDictionaryEntries } from "../types";
import { DictionaryEntryModel, commands } from "@/lib/bindings";
import DictionaryLetterGroup from "./dictionary_letter_group";
import PanelContainer from "@/components/util/panel_container";
import NoDictionaryEntriesFound from "./no_dictionary_entries_found";
import { useEventListener } from "@fluster.io/dev";

declare global {
  interface WindowEventMap {
    "request-dictionary-refresh": CustomEvent<object>;
  }
}

const initialGroupedDictionaryEntries = (): GroupedDictionaryEntries => {
  return {
    "#": [],
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [],
    i: [],
    j: [],
    k: [],
    l: [],
    m: [],
    n: [],
    o: [],
    p: [],
    q: [],
    r: [],
    s: [],
    t: [],
    u: [],
    v: [],
    w: [],
    x: [],
    y: [],
    z: [],
  };
};

const groupDictionaryEntries = (
  entries: DictionaryEntryModel[]
): GroupedDictionaryEntries => {
  const groupedEntries = initialGroupedDictionaryEntries();
  let idx = 0;
  for (const entry of entries) {
    let letter = entry.label.trimStart()[0].toLowerCase();
    // If the first character is a number, use the # symbol.
    if (`${parseInt(letter)}` === letter) {
      letter = "#";
    }
    if (!groupedEntries[letter]) {
      groupedEntries[letter] = [];
    }
    groupedEntries[letter].push({
      ...entry,
      idx: idx,
    });
    idx++;
  }
  return groupedEntries;
};

const DictionaryPage = (): ReactNode => {
  const [items, setItems] = useState<DictionaryEntryModel[] | null>(null);
  const gatherData = async (): Promise<void> => {
    const res = await commands.getDictionaryEntries();
    if (res.status === "error") {
      console.error(
        "An error occurred while attempting to gather your dictionary entries."
      );
    } else {
      setItems(res.data);
    }
  };
  useEventListener("request-dictionary-refresh", () => {
    gatherData();
  });
  useEffect(() => {
    gatherData();
  }, []);

  if (items === null) {
    return null;
  }
  return (
    <PanelContainer className="w-full flex flex-col justify-start items-center gap-6">
      {items?.length === 0 ? (
        <NoDictionaryEntriesFound />
      ) : (
        Object.entries(groupDictionaryEntries(items)).map((l) => (
          <DictionaryLetterGroup
            key={`letter-group-${l[0]}`}
            items={l[1]}
            letter={l[0]}
          />
        ))
      )}
    </PanelContainer>
  );
};

DictionaryPage.displayName = "DictionaryPage";

export default DictionaryPage;
