export const copyStringToClipboard = async (s: string): Promise<boolean> => {
    try {
        await navigator.clipboard.writeText(s);
        return true;
    } catch (err) {
        console.error("Failed to copy: ", err);
        return false;
    }
};
