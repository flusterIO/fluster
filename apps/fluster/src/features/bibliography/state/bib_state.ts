export interface BibliographyState {
    /// The path relative to the user's notes root that points to a valid .bib file.
    bibPath: string | null;
    /// The root relative path that points to a valid .csl file.
    cslPath: string | null;
}
