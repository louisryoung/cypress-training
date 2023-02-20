import IconSidebarToggle from "assets/svgs/icon-sidebar-toggle.svg";
import IconDown from "assets/svgs/icon-down-white.svg";
import IconHarvest from "assets/svgs/icon-harvest.svg";
import IconSpray from "assets/svgs/icon-spray.svg";
import IconAdmin from "assets/svgs/icon-admin.svg";
import IconTimeSheet from "assets/svgs/icon-timesheet.svg";
import IconPayroll from "assets/svgs/icon-payroll.svg";
import IconMaps from "assets/svgs/icon-maps.svg";
import IconInsights from "assets/svgs/icon-insights.svg";
import IconScout from "assets/svgs/icon-scout.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const subMenuAdmin = [
  {
    text: "staff",
    url: "/admin/stuff",
    active: true,
  },
  {
    text: "jobs",
    url: "#",
  },
  {
    text: "tasks",
    url: "#",
  },
  {
    text: "orchards",
    url: "#",
  },
  {
    text: "varieties",
    url: "#",
  },
  {
    text: "payroll",
    url: "#",
  },
  {
    text: "general",
    url: "#",
  },
];

type SideBarItemProps = {
  size?: string;
  iconSrc?: string;
  text: string;
  url: string;
  active?: boolean;
  isNested?: boolean;
  nestedList?: SideBarItemProps[];
};

const SideBarItem = ({
  size = "lg",
  iconSrc,
  text,
  url = "#",
  isNested = false,
  nestedList = [],
}: SideBarItemProps) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    if (isNested) {
      setToggle(!toggle);
    }
  };

  return (
    <div className="sidebar-item min-w-[240px]">
      <Link
        to={url}
        className="flex text-white py-2 mt-3 px-5"
        onClick={handleToggle}
      >
        <img src={iconSrc} alt={`icon-${text}`} />
        {size === "lg" && (
          <div className="uppercase font-bold ml-3">{text}</div>
        )}
        {size === "lg" && isNested && (
          <img
            src={IconDown}
            alt="icon-down"
            className={`mr-[10px] ml-auto ${toggle ? "rotate-180" : ""}`}
          />
        )}
      </Link>
      {size === "lg" &&
        toggle &&
        nestedList.length &&
        nestedList.map((item) => (
          <Link
            to={item.url}
            className={`flex py-2 mt-3 pl-11 px-5 ${
              item.active ? "bg-white text-[#DF1D00]" : "text-white"
            }`}
            key={item.text}
          >
            <div className="uppercase font-bold ml-3">{item.text}</div>
          </Link>
        ))}
    </div>
  );
};

const Sidebar = () => {
  const [size, setSize] = useState("lg");

  useEffect(() => {
    console.log(window);
    if (window.innerWidth >= 768) {
      setSize("lg");
    } else {
      setSize("sm");
    }
  }, []);

  const handleSidebarToggle = () => {
    setSize(size === "lg" ? "sm" : "lg");
  };

  return (
    <div
      className={`py-[30px] bg-gradient-to-r from-[#DF1D00] to-[#DF5500] ${
        size === "lg" ? "w-[240px]" : "w-16"
      }`}
    >
      <div
        className="sidebar-toggle cursor-pointer pl-5"
        onClick={handleSidebarToggle}
      >
        <img src={IconSidebarToggle} alt="sidebar-toggle" />
      </div>
      <div className="menu">
        <SideBarItem size={size} iconSrc={IconHarvest} text="harvest" url="#" />
        <SideBarItem size={size} iconSrc={IconSpray} text="spray" url="#" />
        <SideBarItem
          size={size}
          iconSrc={IconTimeSheet}
          text="timesheet"
          url="#"
        />
        <SideBarItem size={size} iconSrc={IconPayroll} text="payroll" url="#" />
        <SideBarItem size={size} iconSrc={IconMaps} text="maps" url="#" />
        <SideBarItem
          size={size}
          iconSrc={IconInsights}
          text="insights"
          url="#"
        />
        <SideBarItem size={size} iconSrc={IconScout} text="scout" url="#" />
        <SideBarItem
          size={size}
          iconSrc={IconAdmin}
          text="Admin"
          url="#"
          isNested={true}
          nestedList={subMenuAdmin}
        />
      </div>
    </div>
  );
};

export default Sidebar;
