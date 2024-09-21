import { FaPhone, FaRegUserCircle } from "react-icons/fa";
import { MdDateRange, MdOutlineMail } from "react-icons/md";
import { useState } from "react";
import DialogUpdateUser from "./DialogUpdateAccount";

const AccountInfo = ({ accountLogin, ReloadData }) => {
  const [isOpen, setIsOpen] = useState();

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <>
      <section className="w-5/6 mx-auto">
        <header className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-playball pb-4">
            Thông tin khách hàng
          </h2>
          <p className="text-sm text-gray-600">
            Quản lý thông tin cá nhân của bạn, bao gồm số điện thoại và địa chỉ
            email nơi bạn có thể liên hệ
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="border rounded-2xl bg-gray-100 px-6 sm:px-8 py-4 break-words">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg sm:text-xl">Name</h2>
              <FaRegUserCircle size={24} color="#CD9B32" />
            </div>
            <h2 className="py-2 text-base font-quicksand break-words">
              {accountLogin?.user_name}
            </h2>
          </div>

          <div className="border rounded-2xl bg-gray-100 px-6 sm:px-8 py-4 break-words">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg sm:text-xl">Email</h2>
              <MdOutlineMail size={24} color="#CD9B32" />
            </div>
            <h2 className="py-2 text-base font-quicksand break-words">
              {accountLogin?.email}
            </h2>
          </div>

          <div className="border rounded-2xl bg-gray-100 px-6 sm:px-8 py-4 break-words">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg sm:text-xl">Phone Number</h2>
              <FaPhone size={20} color="#CD9B32" />
            </div>
            <h2 className="py-2 text-base font-quicksand break-words">
              {accountLogin?.phone_number
                ? accountLogin?.phone_number
                : "Thông tin cần cập nhật"}
            </h2>
          </div>

          <div className="border rounded-2xl bg-gray-100 px-6 sm:px-8 py-4 break-words">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg sm:text-xl">Create At</h2>
              <MdDateRange size={24} color="#CD9B32" />
            </div>
            <h2 className="py-2 text-base font-quicksand break-words">
              {accountLogin.created_at}
            </h2>
          </div>
        </section>

        <footer className="flex justify-end mt-6">
          <button
            onClick={handleOpenDialog}
            className="cursor-pointer bg-violet-500 rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-violet-700 hover:ring-2 hover:ring-violet-800 hover:shadow-xl hover:shadow-violet-500 focus:ring-violet-300 focus:shadow-violet-400 px-5 py-2"
          >
            Cập nhật thông tin
          </button>
        </footer>
      </section>

      {isOpen && (
        <DialogUpdateUser
          {...{ accountLogin, handleCloseDialog, ReloadData }}
        />
      )}
    </>
  );
};

export default AccountInfo;
