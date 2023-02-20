import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";

import { Column, Staff } from "constants/types";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type StaffTableProps = {
  staffs: Staff[];
  columnDefs: Column[];
};

const StaffTable = ({ staffs, columnDefs }: StaffTableProps) => {
  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      width: 280,
    };
  }, []);

  return (
    <div className="w-full h-full ag-theme-alpine">
      <AgGridReact
        rowData={staffs}
        rowHeight={58}
        rowClass="border-b-0"
        className="text-base"
        headerHeight={60}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      ></AgGridReact>
    </div>
  );
};

export default StaffTable;
