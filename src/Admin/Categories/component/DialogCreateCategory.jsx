import { IoMdClose } from "react-icons/io";
import defaultImage from "../../../imgs/default-image.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { apiCreateCategory } from "../../../Services/Categories";
import { useDispatch } from "react-redux";
import { showToast } from "../../../ReduxToolkit/sildes/ToastSlide";

const DialogCreateCategory = ({ handleCloseDialog, handleReloadData }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [currentImage, setCurrentImage] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result);
      };
      reader.readAsDataURL(file);
      setValue("category_image", file);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("category_name", data.category_name);

    if (data.category_image) {
      formData.append("category_image", data.category_image);
    }
    try {
      const res = await apiCreateCategory(formData);
      console.log("res: ", res);
      dispatch(
        showToast({ message: "Thêm tài khoản thành công!", type: "success" })
      );
      handleReloadData();
      handleCloseDialog();
    } catch (err) {
      console.log("Error apiCreateCategory: ", err);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="w-screen h-screen bg-slate-800 opacity-50 absolute top-0 left-0"
          onClick={handleCloseDialog}
        ></div>
        <div
          className="bg-white rounded-lg p-6 relative z-10 max-w-xl w-full
           animate-fadeInScaleUp"
        >
          {/* Title */}
          <div className="flex items-start justify-between p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold">Tạo lại sản phẩm mới</h3>
            <button
              type="button"
              onClick={handleCloseDialog}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <IoMdClose size={22} />
            </button>
          </div>
          {/* form */}
          <div className="p-6 space-y-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-6 gap-6"
            >
              <div className="col-span-6">
                <label className="text-sm font-medium text-gray-900 block mb-2">
                  Ảnh loại sản phẩm
                </label>
                <label htmlFor="category_image">
                  <img
                    src={currentImage ? currentImage : defaultImage}
                    htmlFor="category_image"
                    alt="img_default"
                    className="w-20 "
                  />
                </label>
                <input
                  type="file"
                  id="category_image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div className="col-span-6">
                <label className="text-sm font-medium text-gray-900 block mb-2">
                  Tên loại sản phẩm
                </label>
                <input
                  type="text"
                  name="category_name"
                  id="category_name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Bonnie"
                  required
                  {...register("category_name")}
                />
              </div>

              <div className="items-center col-span-6 ">
                <div className="bg-slate-100 w-full h-0.5"></div>
              </div>

              {/* Action */}
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
    </>
  );
};

export default DialogCreateCategory;
