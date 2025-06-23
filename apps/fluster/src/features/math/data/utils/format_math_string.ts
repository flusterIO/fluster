export const formatMathBlockString = (s: string): string => {
    if (s.includes("$$")) {
        return s;
    } else {
        return `$$${s}$$`;
    }
};
