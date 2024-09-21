import { useEffect, useState } from "react";
import NavbarAdmin from "./navbar";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { axiosAccountForLogin } from "../../ReduxToolkit/sildes/AccountSlide";
import logo from "../../imgs/SweetCorner.png";

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { accountLogin } = useSelector((state) => state.accountReducer || {});
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const windowWidth = useWindowSize();

  const isMobileView = windowWidth <= 830;

  const handleOpenSideBar = () => {
    setIsSideBarOpen(true);
  };

  const handleCloseSideBar = () => {
    setIsSideBarOpen(false);
  };

  useEffect(() => {
    dispatch(axiosAccountForLogin());
  }, [dispatch]);

  return (
    <>
      <NavbarAdmin {...{ accountLogin, handleOpenSideBar }} />

      {!isMobileView && <Sidebar />}

      <div className="flex overflow-hidden bg-white pt-16">
        {isMobileView && (
          <>
            {isMobileView && (
              <>
                {isSideBarOpen && (
                  <>
                    <div
                      className="fixed w-screen h-screen bg-slate-800 opacity-50 top-0 left-0 z-40"
                      onClick={handleCloseSideBar}
                    ></div>

                    <div
                      className={`fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg`}
                    >
                      {" "}
                      <a
                        href="/"
                        className="text-xl font-bold flex items-center justify-center mt-4"
                      >
                        <img src={logo} alt="logo" className="w-12 mr-2" />
                        <span className="">Sweet Corner</span>
                      </a>
                      <Sidebar />
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}

        <div className="h-full w-full relative overflow-y-auto lg:ml-64">
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </>
  );
};

const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};

export default AdminLayout;
