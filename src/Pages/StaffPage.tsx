import { useMemo, useState } from "react";
// import { ChangeEvent, useEffect } from "react";
import ReactPaginate from "react-paginate";

import IconFilter from "assets/svgs/icon-filter.svg";
import IconSettings from "assets/svgs/icon-settings.svg";
import OutlinedSelect from "Components/OutlinedSelect";
import SearchInput from "Components/SearchInput";
import StaffTable from "Components/StaffTable";
// import { useAppDispatch } from "store/hooks";
// import { getStaffList } from "store/staffs/actions";
// import { useSelector } from "react-redux";
// import { selectStaffs } from "store/staffs/staffSlice";
import { Column, Option } from "constants/types";
import staffs from "constants/staff.json";
import ColumnsSettingPanel from "Components/ColumnsSettingPanel";

const staffTypes = [
  {
    label: "Activated Staff",
    value: "activate",
  },
  {
    label: "Deactivated Staff",
    value: "deactivate",
  },
];

const StaffPage = () => {
  // const dispatch = useAppDispatch();
  // const staffs = useSelector(selectStaffs);
  const [currentPage, setCurrentPage] = useState(0);
  const [staffType, setStaffType] = useState("activate");
  const [accountType, setAccountType] = useState("");
  const [nameSearchKey, setNameSearchKey] = useState("");
  const [settingPanel, toggleSettingPanel] = useState(false);
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 0,
      field: "firstName",
      headerName: "First Name",
      checked: true,
    },
    {
      id: 1,
      field: "lastName",
      headerName: "Last Name",
      checked: true,
    },
    {
      id: 2,
      field: "employeeId",
      headerName: "Employee ID",
      checked: true,
    },
    {
      id: 3,
      field: "accountType",
      headerName: "Type Account",
      checked: true,
    },
    {
      id: 4,
      field: "wageRate",
      headerName: "Wage Rate",
      checked: true,
    },
    {
      id: 5,
      field: "contractor",
      headerName: "Contractor For",
      checked: true,
    },
    {
      id: 6,
      field: "workingHoursStart",
      headerName: "Work Hour Start At",
      checked: false,
    },
    {
      id: 7,
      field: "workingHoursEnd",
      headerName: "Work Hour End At",
      checked: false,
    },
    {
      id: 8,
      field: "email",
      headerName: "Email Address",
      checked: false,
    },
    {
      id: 9,
      field: "phoneNumber",
      headerName: "Phone Number",
      checked: false,
    },
    {
      id: 10,
      field: "dob",
      headerName: "Dashboard Access",
      checked: false,
    },
  ]);

  const columnDefs = useMemo(() => {
    return columns.filter((column) => {
      return column.checked;
    });
  }, [columns]);

  const accountTypes = useMemo(() => {
    let accounts: Option[] = [
      {
        label: "All",
        value: "",
      },
    ];
    let accountString: string[] = [];
    staffs.forEach((staff) => {
      if (!accountString.includes(staff.accountType)) {
        accounts.push({
          label: staff.accountType,
          value: staff.accountType,
        });
        accountString.push(staff.accountType);
      }
    });
    return accounts;
  }, []);

  const filteredStaff = useMemo(() => {
    setCurrentPage(0);
    return staffs.filter((staff) => {
      let result = true;
      if (staffType === "activate") {
        result &&= staff.deleted;
      } else {
        result &&= !staff.deleted;
      }
      if (accountType !== "") {
        result &&= staff.accountType === accountType;
      }
      result &&= staff.name.toLowerCase().includes(nameSearchKey.toLowerCase());
      return result;
    });
  }, [accountType, staffType, nameSearchKey]);

  const paginatedStaff = useMemo(() => {
    return filteredStaff.slice(currentPage * 20, (currentPage + 1) * 20);
  }, [filteredStaff, currentPage]);

  const pageCount = useMemo(() => {
    return Math.ceil(filteredStaff.length / 20);
  }, [filteredStaff]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleStaffType = (value: string) => {
    setStaffType(value);
  };

  const handleAccountType = (value: string) => {
    setAccountType(value);
  };

  const handleNameSearchKey = (value: string) => {
    setNameSearchKey(value);
  };

  const handleSettingPanelClose = () => {
    toggleSettingPanel(false);
  };

  const handleSettingPanelConfirm = (items: Column[]) => {
    setColumns([...items]);
    toggleSettingPanel(false);
  };

  // useEffect(() => {
  //   dispatch(getStaffList());
  // }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="p-8 shadow">
        <div className="flex px-16 py-7 shadow-lg items-center flex-wrap">
          <div className="flex py-3">
            <img src={IconFilter} alt="icon-filter" />
            <div className="ml-[15px]" id="staff-type">
              <OutlinedSelect
                options={staffTypes}
                label="Staff Type"
                onChange={handleStaffType}
              />
            </div>
          </div>
          <div className="ml-6 py-3" id="account-type">
            <OutlinedSelect
              options={accountTypes}
              label="Account Type"
              onChange={handleAccountType}
            />
          </div>
          <div className="ml-6 py-3">
            <SearchInput onChange={handleNameSearchKey} />
          </div>
          <div
            id="select-column"
            className="ml-auto flex cursor-pointer py-3 pl-4"
            onClick={() => toggleSettingPanel(true)}
          >
            <img src={IconSettings} alt="icon-setting" />
            <div className="ml-[6px]">Setting Columns</div>
          </div>
        </div>
        <div className="flex p-4 shadow-lg mt-3 h-[821px] flex-col">
          <div className="py-4 px-[70px] w-full border-b-2 border-b-[#DF1D00]">
            <span className="text-xl">STAFF</span>
            <span className="ml-4 text-[#828282]">
              There are {filteredStaff.length} staff in total
            </span>
          </div>
          <div className="h-full w-full px-[52px] py-[15px]">
            <div className="h-[660px]">
              <StaffTable staffs={paginatedStaff} columnDefs={columnDefs} />
            </div>
            <div className="flex mt-4 float-right">
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                nextClassName="rounded py-1 px-3 border border-[#E0E0E0] text-[#828282] mx-1 flex items-center justify-center"
                previousClassName="rounded py-1 px-3 border border-[#E0E0E0] text-[#828282] mx-1 flex items-center justify-center"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                className="flex"
                pageClassName="rounded py-1 px-3 border border-[#E0E0E0] text-[#828282] mx-1 flex items-center justify-center"
                activeClassName="border-[#DF1D00] text-[#DF1D00]"
                forcePage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
      {settingPanel && (
        <ColumnsSettingPanel
          handleClose={handleSettingPanelClose}
          columnDefs={columns}
          onConfirm={handleSettingPanelConfirm}
        />
      )}
    </div>
  );
};

export default StaffPage;
