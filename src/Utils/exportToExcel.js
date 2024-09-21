import * as xlsx from "xlsx";

const ExportToExcel = (data, fileName) => {
  const worksheet = xlsx.utils.json_to_sheet(data);

  const workbook = xlsx.utils.book_new();

  xlsx.utils.book_append_sheet(workbook, worksheet, "sheet1");

  xlsx.writeFile(workbook, `${fileName}.xlsx`);
};

export default ExportToExcel;
