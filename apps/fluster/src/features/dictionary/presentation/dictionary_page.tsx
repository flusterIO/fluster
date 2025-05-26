import React, { type ReactNode } from "react";
import { getFakeDictionaryEntries } from "../../../../tests/fake_data/dictionary_entry";
import { GroupedDictionaryEntries } from "../types";
import { DictionaryEntry } from "@/lib/bindings";
import DictionaryLetterGroup from "./dictionary_letter_group";
import PanelContainer from "@/components/util/panel_container";


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
  entries: DictionaryEntry[]
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
  const items = getFakeDictionaryEntries(100);
  const groupedItems = groupDictionaryEntries(items);
  return (
    <PanelContainer className="w-full flex flex-col justify-start items-center gap-6">
      {Object.entries(groupedItems).map((l) => (
        <DictionaryLetterGroup
          key={`letter-group-${l[0]}`}
          items={l[1]}
          letter={l[0]}
        />
      ))}
    </PanelContainer>
  );
};

DictionaryPage.displayName = "DictionaryPage";

export default DictionaryPage;
