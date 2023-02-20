import { useState } from "react";
import RLDD from "react-list-drag-and-drop/lib/RLDD";

import { Column } from "constants/types";
import IconClose from "assets/svgs/icon-close.svg";

type ColumnsSettingPanelProps = {
  handleClose: Function;
  columnDefs: Column[];
  onConfirm: Function;
};

const ColumnsSettingPanel = ({
  columnDefs,
  handleClose,
  onConfirm,
}: ColumnsSettingPanelProps) => {
  const [columns, setColumns] = useState(columnDefs);

  const handleColumnsChange = (items: Column[]) => {
    setColumns(items);
  };

  const handleCheck = (item: Column) => {
    let items: Column[] = [];
    columns.forEach((column) => {
      if (column.id === item.id) {
        items.push({ ...column, checked: !column.checked });
      } else {
        items.push({ ...column });
      }
    });
    setColumns(items);
  };

  const itemRenderer = (item: Column) => {
    return (
      <div
        id={`item-${item.field}`}
        className="mb-2 cursor-pointer h-8 text-base py-1 px-[18px] flex items-center"
        onClick={() => handleCheck(item)}
      >
        <label className="item-container">
          <input
            type="checkbox"
            checked={item.checked}
            className="mr-4"
            onChange={() => handleCheck(item)}
          />
          <span className="checkmark" onClick={() => handleCheck(item)}></span>
        </label>
        {item.headerName}
      </div>
    );
  };

  return (
    <div
      id="select-column-panel"
      className="fixed h-full w-[400px] p-6 bg-white shadow-xl right-0 mt-1 rounded"
    >
      <img
        src={IconClose}
        className="float-right cursor-pointer"
        alt="icon-close"
        onClick={() => handleClose()}
      />
      <div className="mt-6">
        <div className="text-xl uppercase">Customise Table Columns</div>
        <div className="text-xs text-[#828282] mt-2">
          Instructions:
          <br />
          1. Display or Hide table column by checking a checkbox
          <br />
          2. Drag and drop rows to control order of table columns
        </div>
      </div>
      <div className="mt-6 flex border-b border-b-[#DF1D00] flex-col">
        <div className="w-[165px] h-[36px] bg-[#DF1D00] text-white flex items-center justify-center">
          Active Columns
        </div>
      </div>
      <div className="mt-6 flex w-full">
        <RLDD
          cssClasses="w-full"
          onChange={handleColumnsChange}
          itemRenderer={itemRenderer}
          items={columns}
        />
      </div>
      <div className="flex justify-center items-center mt-32">
        <button
          type="button"
          id="select-column-confirm"
          className="uppercase rounded bg-[#DF1D00] text-white text-xs h-6 w-20"
          onClick={() => onConfirm(columns)}
        >
          confirm
        </button>
      </div>
    </div>
  );
};

export default ColumnsSettingPanel;
