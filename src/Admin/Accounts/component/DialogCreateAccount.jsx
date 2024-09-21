import { IoMdClose } from "react-icons/io";
import defaultImage from "../../../imgs/default-image.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { apiCreateAccount } from "../../../Services/Accounts";
import { useDispatch } from "react-redux";
import { showToast } from "../../../ReduxToolkit/sildes/ToastSlide";

const DialogCreateAccount = ({ handleCloseDialog, refreshData }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result);
      };
      reader.readAsDataURL(file);
      setValue("user_image", file);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("user_name", data.user_name);
    formData.append("email", data.email);
    formData.append("role_id", data.role_id);
    formData.append("password", data.password);
    formData.append("phone_number", data.phone_number);

    if (data.user_image instanceof File) {
      formData.append("user_image", data.user_image);
    }

    try {
      const res = await apiCreateAccount(formData);
      console.log(">>>res: ", res);
      refreshData();
      handleCloseDialog();
      dispatch(
        showToast({ message: "Thêm tài khoản thành công!", type: "success" })
      );
    } catch (err) {
      console.log("Error apiCreateAccount: ", err);
      dispatch(showToast({ message: err.message, type: "error" }));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="w-screen h-screen bg-slate-800 opacity-50 absolute top-0 left-0"
        onClick={handleCloseDialog}
      ></div>
      <div
        className="bg-white rounded-lg p-6 relative z-10 max-w-xl w-full
           animate-fadeInScaleUp"
      >
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Tạo tài khoản mới</h3>
          <button
            type="button"
            onClick={handleCloseDialog}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <IoMdClose size={22} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-6 gap-6"
          >
            {/* avatar */}
            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Avatar
              </label>
              <label htmlFor="avatar">
                <img
                  src={currentImage ? currentImage : defaultImage}
                  htmlFor="avatar"
                  alt="img_default"
                  className="w-20 "
                />
              </label>
              <input
                type="file"
                id="avatar"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            {/* Quyền */}
            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Quyền hạn
              </label>

              <div className="block">
                <input
                  id="admin"
                  type="radio"
                  name="role_name"
                  value="1"
                  className="mr-2"
                  {...register("role_id", { required: true })}
                />
                <label htmlFor="admin" className="mr-5">
                  Admin
                </label>
              </div>
              <div className="block">
                <input
                  id="staff"
                  type="radio"
                  name="role_name"
                  className="mr-2"
                  value="3"
                  {...register("role_id", { required: true })}
                />
                <label htmlFor="admin">Staff</label>
              </div>
              <div className="block">
                <input
                  id="user"
                  type="radio"
                  name="role_name"
                  className="mr-2"
                  value="2"
                  {...register("role_id", { required: true })}
                />
                <label htmlFor="admin">User</label>
              </div>
            </div>
            {/* Email */}
            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="example@company.com"
                {...register("email")}
              />
            </div>
            {/* User name */}
            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                User Name
              </label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Bonnie"
                required
                {...register("user_name")}
              />
            </div>
            {/* Phone Number */}
            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Phone Number
              </label>
              <input
                type="number"
                name="phone-number"
                id="phone-number"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="e.g. +(12)3456 789"
                required
                {...register("phone_number")}
              />
            </div>
            {/* Password */}
            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="*******"
                required
                {...register("password")}
              />
            </div>

            <div className="flex justify-end col-span-6">
              <button
                className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Thêm mới
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DialogCreateAccount;
