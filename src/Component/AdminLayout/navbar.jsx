import { AiOutlineMenu } from "react-icons/ai";
import { IoPersonCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import { formatImg } from "../../Utils/formatImage";
import logo from "../../imgs/SweetCorner.png";

const NavbarAdmin = ({ accountLogin, handleOpenSideBar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const hanleShow = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={handleOpenSideBar}
                className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 rounded"
              >
                <AiOutlineMenu size={24} />
              </button>
              <a
                href="/"
                className="text-xl font-bold flex items-center lg:ml-2.5"
              >
                <img src={logo} alt="" className="w-9 mr-2" />
                <span className="self-center whitespace-nowrap">
                  Sweet Corner
                </span>
              </a>
            </div>
            <div className="flex items-center justify-evenly">
              <div className="lg:flex items-center relative">
                <div onClick={hanleShow} className="flex items-center gap-4">
                  <span className="hidden text-right lg:block">
                    <span className="block text-sm font-medium text-black">
                      {accountLogin?.user_name}
                    </span>
                    <span className="block text-xs">
                      {accountLogin?.role_name}
                    </span>
                  </span>
                  <img
                    src={formatImg(accountLogin?.user_image)}
                    alt="User"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <FaChevronDown />
                </div>

                {dropdownOpen && (
                  <div
                    className={`absolute top-11 right-0 mt-4 flex w-64 flex-col rounded-sm border border-stroke bg-white shadow-default`}
                  >
                    <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7 dark:border-strokedark">
                      <li>
                        <a
                          href="/"
                          className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                        >
                          <IoPersonCircleOutline size={20} />
                          My Profile
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                        >
                          <IoSettingsOutline size={20} />
                          Account Settings
                        </a>
                      </li>
                    </ul>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                    >
                      <TbLogout2 size={20} />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarAdmin;
