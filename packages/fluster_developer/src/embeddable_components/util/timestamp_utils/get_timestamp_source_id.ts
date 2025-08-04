export const getTimestampSourceId = (base: string, id?: string) => {
    if (!id) {
        return undefined;
    }
    return `ts-${base}-${id}`;
};
