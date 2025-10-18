export const capitalize = (s: string): string => {
    if (s === "") {
        return "";
    }
    if (s.length === 1) {
        return s[0].toUpperCase();
    }
    return `${s[0].toUpperCase()}${s.slice(1, s.length)}`;
};
