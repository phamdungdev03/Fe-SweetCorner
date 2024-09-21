import React, { useState } from "react";
import default_image from "../../imgs/SweetCorner.png";
import { GoPerson } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import DialogLogin from "../Dialog/DialogLogin";
import DialogLogout from "../Dialog/DialogLogout";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State để toggle menu trên mobile
  const [showPopup, setShowPopup] = useState(false);
  const token = sessionStorage.getItem("accessToken");
  const menuItems = [
    { path: "/", label: "Trang chủ" },
    { path: "/introduce", label: "Giới thiệu" },
    { path: "/collections", label: "Sản phẩm" },
    { path: "/news", label: "Tin tức" },
    { path: "/contact", label: "Liên hệ" },
    { path: "/admin", label: "Hệ thống cửa hàng" },
  ];

  const handleClickCart = () => {
    navigate("/cart");
  };

  const handleClickLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  return (
    <>
      <header className="fixed w-full z-10 bg-[#000] bg-opacity-70 max-md:h-14">
        <nav className="border-gray-200 p-2">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            <button
              className="lg:hidden mr-2 text-white cursor-pointer p-2 hover:text-gray-700 hover:bg-slate-400 rounded"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AiOutlineMenu size={24} />
            </button>

            {/* Logo */}
            <a href="/" className="flex items-center">
              <img
                src={default_image}
                className="h-10 mr-3 sm:h-16"
                alt="LogoShop"
              />
            </a>

            {/* Menu cho desktop */}
            <div
              className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${
                isMenuOpen
                  ? "block bg-white rounded-lg p-6 relative z-10 max-w-xl w-full animate-fadeInScaleUp"
                  : "hidden"
              } lg:bg-transparent`}
            >
              <ul className="flex flex-col lg:flex-row lg:space-x-6 mt-4 lg:mt-0 font-medium">
                {menuItems.map((item, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate(item.path);
                    }}
                    className={`block py-4 pl-3 pr-4 text-lg cursor-pointer lg:bg-transparent lg:pb-2 ${
                      location.pathname === item.path
                        ? "text-text_header border-b-2 border-text_header"
                        : "max-md:text-black text-white"
                    }`}
                  >
                    {item?.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Icon cho giỏ hàng và tài khoản */}
            <div
              className={`items-center lg:order-2 gap-4 relative ${
                isMenuOpen ? "hidden" : "flex"
              }`}
            >
              <IoMdHeartEmpty size={28} color="#fff" />
              <div
                className="relative"
                onMouseEnter={() => setShowPopup(true)}
                onMouseLeave={() => setShowPopup(false)}
                onClick={() => setShowPopup(!showPopup)}
              >
                <GoPerson size={28} color="#fff" />

                {showPopup && !token && <DialogLogin />}
                {showPopup && token && (
                  <DialogLogout {...{ handleClickLogout }} />
                )}
              </div>
              <IoCartOutline size={28} color="#fff" onClick={handleClickCart} />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
