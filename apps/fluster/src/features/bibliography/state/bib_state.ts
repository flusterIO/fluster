export interface BibliographyState {
  /// The path relative to the user's notes root that points to a valid .bib file.
  bib_path: string | null;
  /// The root relative path that points to a valid .csl file.
  csl_path: string | null;
}
