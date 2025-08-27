import dayjs from "dayjs";

export const parseDate = (d: string | number): dayjs.Dayjs => {
    if (typeof d === "number") {
        return dayjs.unix(d);
    }
    const regex = new RegExp("[a-zA-Z]", "gi");
    if (regex.test(d)) {
        return dayjs(d, {
            utc: true,
        });
    }
    return dayjs(new Date(parseInt(d)));
};
