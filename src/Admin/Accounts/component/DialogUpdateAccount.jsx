import { IoMdClose } from "react-icons/io";
import defaultImage from "../../../imgs/default-image.png";
import { useEffect, useState } from "react";
import {
  apiGetAccountById,
  apiUpdateAccount,
} from "../../../Services/Accounts";
import { useForm } from "react-hook-form";
import { formatImg } from "../../../Utils/formatImage";
import { useDispatch } from "react-redux";
import { showToast } from "../../../ReduxToolkit/sildes/ToastSlide";

const DialogUpdateAccount = ({
  handleCloseDialog,
  selectedAccount,
  refreshData,
}) => {
  const { register, setValue, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [avatarPreview, setAvatarPreview] = useState(defaultImage);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setValue("user_image", file);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("user_name", data.user_name);
    formData.append("role_id", data.role_id);
    formData.append("phone_number", data.phone_number);

    if (data.user_image) {
      formData.append("user_image", data.user_image);
    }
    try {
      await apiUpdateAccount(selectedAccount.account_id, formData);
      refreshData();
      handleCloseDialog();
      dispatch(
        showToast({
          message: "Cập nhật tài khoản thành công !",
          type: "success",
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(
        showToast({
          message: err.message,
          type: "error",
        })
      );
    }
  };

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await apiGetAccountById(selectedAccount.account_id);
        const accountDetail = res?.data?.data;

        setValue("user_name", accountDetail?.user_name);
        setValue("email", accountDetail?.email);
        setValue("phone_number", accountDetail?.phone_number);
        setValue("role_id", String(accountDetail?.role_id));
        setValue("user_image", accountDetail.user_image);

        const image = formatImg(accountDetail?.user_image);
        setAvatarPreview(image);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAccount();
  }, [setValue, selectedAccount]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="w-screen h-screen bg-slate-800 opacity-50 absolute top-0 left-0"
        onClick={handleCloseDialog}
      ></div>
      <div className="bg-white rounded-lg p-6 relative z-10 max-w-xl w-full animate-fadeInScaleUp">
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Cập nhật khoản</h3>
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
            {/* Avatar */}
            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Avatar
              </label>
              <label htmlFor="avatar">
                <img src={avatarPreview} alt="Avatar" className="w-20" />
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
              <label
                htmlFor="role_id"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Quyền
              </label>

              <div className="block">
                <input
                  id="admin"
                  type="radio"
                  name="role_id"
                  className="mr-2"
                  value="1"
                  {...register("role_id")}
                />
                <label htmlFor="admin" className="mr-5">
                  Admin
                </label>
              </div>
              <div className="block">
                <input
                  id="staff"
                  type="radio"
                  name="role_id"
                  className="mr-2"
                  value="3"
                  {...register("role_id")}
                />
                <label htmlFor="staff">Staff</label>
              </div>
              <div className="block">
                <input
                  id="user"
                  type="radio"
                  name="role_id"
                  className="mr-2"
                  value="2"
                  {...register("role_id")}
                />
                <label htmlFor="user">User</label>
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
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="example@company.com"
                required
                {...register("email")}
              />
            </div>
            {/* User Name */}
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
              <label
                htmlFor="phone_number"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Phone Number
              </label>
              <input
                type="number"
                name="phone_number"
                id="phone_number"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="e.g. +(12)3456 789"
                required
                {...register("phone_number")}
              />
            </div>
            <div className="flex justify-end col-span-6">
              <button
                className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DialogUpdateAccount;
