import dayjs, { Dayjs } from "dayjs";

export const parseDate = (date: Date | string | number): Dayjs => {
    switch (typeof date) {
        case "string": {
            const i = parseInt(date);
            if (`${i}` === date) {
                return dayjs(new Date(i), {
                    utc: true,
                });
            } else {
                return dayjs(date, {
                    utc: true,
                });
            }
        }
        case "number": {
            return dayjs(date, {
                utc: true,
            });
        }
        default: {
            return dayjs(date, {
                utc: true,
            });
        }
    }
};
