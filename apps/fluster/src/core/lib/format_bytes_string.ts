/** Formats a number of bytes into a human readable string. */
export function formatBytesString(bytes: number, decimals = 2): string {
    // If the input is zero, return '0 Bytes' immediately
    if (bytes === 0) return "0 Bytes";

    // Define the conversion factor (1024 for base-2, which is standard for file sizes)
    const k = 1024;
    // An array of units to cycle through
    const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    // Ensure decimals is a valid number, and set a default
    const dm = decimals < 0 ? 0 : decimals;

    // Use Math.floor and Math.log to find the correct unit index
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // If i is less than 0, it means the number is a fraction, handle this case
    if (i < 0) {
        return `${bytes} Bytes`;
    }

    // Return the formatted string with the correct unit
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + units[i];
}
