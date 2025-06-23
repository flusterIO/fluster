import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

export class DateTime {
    dayjs: Dayjs;
    constructor(timestamp: number) {
        this.dayjs = dayjs(timestamp);
    }
    formatDateOnly() {
        return this.dayjs.format("MMM Do, YYYY");
    }
    formatDateTime() {
        return this.dayjs.format("MMM Do, YYYY hh:mm a");
    }
}
