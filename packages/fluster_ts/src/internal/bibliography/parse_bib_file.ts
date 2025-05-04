import { parseBibFile } from "bibtex";

export const parseBibtex = async (file_content: string): Promise<boolean> => {
    let parsed = parseBibFile(file_content);

    return true;
};
