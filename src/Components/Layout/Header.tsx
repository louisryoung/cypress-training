import IconDown from "assets/svgs/icon-down.svg";

const Header = () => {
  return (
    <div className="h-16 px-5 py-2 flex items-center shadow fixed w-full bg-white z-10">
      <img src="/images/logo.png" alt="logo" />
      <div className="avatar ml-auto flex items-center">
        <div className="rounded-full bg-[#DB9200] text-white h-8 w-8 flex justify-center items-center font-bold">
          YW
        </div>
        <div className="ml-[15px]">
          <div className="text-base">Yi Wan</div>
          <div className="text-xs text-[#BDBDBD]">Supervisor</div>
        </div>
        <img src={IconDown} alt="icon-down" className="ml-[15px]" />
      </div>
    </div>
  );
};

export default Header;
