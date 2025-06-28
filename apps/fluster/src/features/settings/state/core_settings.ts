import { MdxNoteGroup } from "@/lib/bindings";

export interface CoreSettings {
    /// True while the database is being syncronized.
    syncing: boolean;
    /// The root directory to use for all relative paths. This should point to the root of the user's notes.
    notesDirectory: string;
    hasLoadedSavedState: boolean;
    /// The default number of threads to be used when running computationally intensive tasks.
    nThreads: number;
    /// Whether or not a .gitignore file should be respected when syncing files. Set to true to ignore files in the gitignore during syncing.
    useGitIgnore: boolean;
}
