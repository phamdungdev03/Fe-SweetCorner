import { GrFormNext } from "react-icons/gr";
import background_image from "../../imgs/background.webp";
import { useEffect, useState } from "react";
import AccountInfo from "./component/InfoAccount";
import OrderHistory from "./component/OrderHistory";
import ChangePassword from "./component/ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { axiosAccountForLogin } from "../../ReduxToolkit/sildes/AccountSlide";
import { formatImg } from "../../Utils/formatImage";

const AccountPage = () => {
  const dispatch = useDispatch();
  const { accountLogin } = useSelector((state) => state?.accountReducer || {});
  const [activeTab, setActiveTab] = useState("infoAccount");
  const [reload, setReload] = useState();
  const account_id = accountLogin?.account_id;
  const renderContent = () => {
    switch (activeTab) {
      case "infoAccount":
        return <AccountInfo {...{ accountLogin, ReloadData }} />;
      case "orderHistory":
        return <OrderHistory {...{ account_id }} />;
      case "changePassword":
        return <ChangePassword />;
      default:
        return <AccountInfo />;
    }
  };

  const ReloadData = () => {
    setReload(!reload);
  };

  useEffect(() => {
    dispatch(axiosAccountForLogin());
  }, [dispatch, reload]);

  return (
    <>
      <div
        className="relative bg-cover bg-center min-h-96 mb-12"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(${background_image})`,
        }}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-10 min-h-52 flex justify-center items-center pt-[150px] pb-[50px]">
            <div className="flex flex-col items-center">
              <h3 className="text-center text-4xl md:text-5xl text-white font-playball font-semibold shadow-lg">
                Trang khách hàng
              </h3>
              <ul className="flex py-4 px-3 gap-2 text-center text-sm md:text-base">
                <li className="text-white flex gap-2 items-center hover:text-text_header cursor-pointer">
                  Trang chủ
                  <span>
                    <GrFormNext />
                  </span>
                </li>
                <li className="text-text_header font-normal">
                  Trang khách hàng
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-screen-xl mx-auto mb-20 px-4 md:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-3">
            <div className="mb-8 text-center flex flex-col items-center sm:text-left bg-white p-6 rounded-lg shadow-md">
              <img
                src={formatImg(accountLogin?.user_image)}
                alt=""
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover mx-auto sm:mx-0 "
              />
              <h2 className="font-bold text-lg sm:text-xl pt-4 pb-1 text-center">
                {accountLogin?.user_name}
              </h2>
              <h3 className="text-sm text-gray-500">{accountLogin?.email}</h3>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <ul>
                <li
                  className={`text-lg sm:text-xl py-2 cursor-pointer transition-all duration-300 ${
                    activeTab === "infoAccount"
                      ? "text-text_header font-bold border-l-4 border-text_header pl-2"
                      : "font-semibold hover:text-text_header"
                  }`}
                  onClick={() => setActiveTab("infoAccount")}
                >
                  Thông tin khách hàng
                </li>
                <li
                  className={`text-lg sm:text-xl py-2 cursor-pointer transition-all duration-300 ${
                    activeTab === "orderHistory"
                      ? "text-text_header font-bold border-l-4 border-text_header pl-2"
                      : "font-medium hover:text-text_header"
                  }`}
                  onClick={() => setActiveTab("orderHistory")}
                >
                  Lịch sử đơn hàng
                </li>
                <li
                  className={`text-lg sm:text-xl py-2 cursor-pointer transition-all duration-300 ${
                    activeTab === "changePassword"
                      ? "text-text_header font-bold border-l-4 border-text_header pl-2"
                      : "font-medium hover:text-text_header"
                  }`}
                  onClick={() => setActiveTab("changePassword")}
                >
                  Đổi mật khẩu
                </li>
              </ul>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-9 bg-white p-8 rounded-lg shadow-md">
            {renderContent()}
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountPage;
