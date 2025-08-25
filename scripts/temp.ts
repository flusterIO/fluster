import fs from "fs";

const filePath =
    "/Users/bigsexy/Desktop/fluster/apps/fluster/src-tauri/src/features/embedded_docs/embedded_docs/assets/pv_plot.png";

const data = fs.readFileSync(filePath);

const base64String = new Buffer(data).toString("base64");

console.log(base64String);
