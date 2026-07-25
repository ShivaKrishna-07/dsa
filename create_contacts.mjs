import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "D:/shiva/dsa/outputs/contact_list";
await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Contacts");

sheet.getRange("A1:D6").values = [
  ["Name", "Age", "Email", "Phone"],
  ["Aarav Sharma", 28, "aarav.sharma@example.com", "+91 98765 43210"],
  ["Priya Patel", 31, "priya.patel@example.com", "+91 98234 56789"],
  ["Rohan Gupta", 25, "rohan.gupta@example.com", "+91 97654 32109"],
  ["Ananya Singh", 29, "ananya.singh@example.com", "+91 99123 45678"],
  ["Vikram Rao", 34, "vikram.rao@example.com", "+91 98456 78901"],
];

sheet.getRange("A1:D1").format = {
  fill: "#1F4E78",
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
};
sheet.getRange("A1:D6").format.borders = { preset: "all", style: "thin", color: "#D9E2F3" };
sheet.getRange("B2:B6").format.numberFormat = "0";
sheet.getRange("A1:D6").format.autofitColumns();
sheet.getRange("A1:D1").format.rowHeight = 24;
sheet.getRange("A1:D6").format.verticalAlignment = "center";
sheet.getRange("A1:A6").format.columnWidth = 20;
sheet.getRange("B1:B6").format.columnWidth = 10;
sheet.getRange("C1:C6").format.columnWidth = 30;
sheet.getRange("D1:D6").format.columnWidth = 20;
sheet.freezePanes.freezeRows(1);
sheet.showGridLines = false;

const check = await workbook.inspect({
  kind: "table",
  range: "Contacts!A1:D6",
  include: "values,formulas",
  tableMaxRows: 10,
  tableMaxCols: 6,
});
console.log(check.ndjson);

const preview = await workbook.render({ sheetName: "Contacts", range: "A1:D6", scale: 2, format: "png" });
await fs.writeFile(`${outputDir}/preview.png`, new Uint8Array(await preview.arrayBuffer()));

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/contact_list.xlsx`);
