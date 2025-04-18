'use client';

import React from 'react';
import * as XLSX from 'xlsx';

export default function ExcelData({ data }) {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'data.xlsx');
  };

  const openExcel = () => {
    exportToExcel();
    setTimeout(() => window.open('data.xlsx'), 1000);
  };

  return (
    <div className="excel_container">
      <button onClick={exportToExcel} disabled={!data.length} className="excel_btn">Export to Excel</button>
      <button onClick={openExcel} disabled={!data.length} className="excel_btn">Get Excel</button>
    </div>
  );
}
