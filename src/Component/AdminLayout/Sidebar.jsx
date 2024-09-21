import { BiSolidCategory } from "react-icons/bi";
import { FaHome, FaUsers } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { RiBillFill } from "react-icons/ri";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    { path: "/admin", label: "Trang chủ", icon: <FaHome /> },
    { path: "/admin/accounts", label: "Tài khoản", icon: <FaUsers /> },
    {
      path: "/admin/category",
      label: "Loại sản phẩm",
      icon: <BiSolidCategory />,
    },
    { path: "/admin/product", label: "Sản phẩm", icon: <HiShoppingBag /> },
    {
      path: "/admin/order",
      label: "Đơn hàng",
      icon: <RiBillFill />,
    },
  ];

  return (
    <>
      <aside
        id="sidebar"
        className="fixed z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
        aria-label="Sidebar"
      >
        <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-red pt-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 bg-white divide-y space-y-1">
              <ul className="space-y-2 pb-2">
                {menuItems.map((item) => (
                  <li
                    key={item.path}
                    className={`text-base text-gray-900 font-normal rounded-lg flex cursor-pointer items-center p-2 hover:bg-gray-100  group ${
                      location.pathname === item.path ? "bg-slate-200" : ""
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
