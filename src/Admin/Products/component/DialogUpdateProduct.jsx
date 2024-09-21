import { IoMdClose } from "react-icons/io";
import defaultImage from "../../../imgs/default-image.png";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosCatrgories } from "../../../ReduxToolkit/sildes/CategoriesSlide";
import {
  apiGetProductById,
  apiUpdateProduct,
} from "../../../Services/Products";
import { formatImg } from "../../../Utils/formatImage";
import { showToast } from "../../../ReduxToolkit/sildes/ToastSlide";

const DialogUpdateProduct = ({
  handleCloseDialog,
  selectedProduct: id,
  refreshData,
}) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryReducer || {});
  const [currentImage, setCurrentImage] = useState(null);

  const { register, handleSubmit, setValue } = useForm();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCurrentImage(reader.result);
      reader.readAsDataURL(file);
      setValue("default_image", file);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      const res = await apiUpdateProduct(id, formData);
      console.log("Res: ", res);

      dispatch(
        showToast({
          message: "Cập nhật sản phẩm thành công!",
          type: "success",
        })
      );
      refreshData();
      handleCloseDialog();
    } catch (err) {
      console.log("Error: ", err);
      dispatch(showToast({ message: err.message, type: "error" }));
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await apiGetProductById(id);
        const productDetails = res?.data?.data[0];
        setValue("product_name", productDetails.product_name);
        setValue("product_price", productDetails.product_price);
        setValue("rating_star", productDetails.rating_star);
        setValue("category_id", productDetails.category_id);
        setValue("product_info", productDetails.product_info);
        setValue("product_detail", productDetails.product_detail);
        setValue("product_sale", productDetails.product_sale);
        setCurrentImage(
          formatImg(productDetails?.default_image || defaultImage)
        );
      } catch (err) {
        console.log(err);
      }
    };

    dispatch(axiosCatrgories({ name: "" }));
    fetchProduct();
  }, [dispatch, setValue, id]);

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
          <h3 className="text-xl font-semibold">Tạo sản phẩm mới</h3>
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
            {/* Product Image */}
            <div className="col-span-6">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Ảnh sản phẩm
              </label>
              <label htmlFor="default_image">
                <img
                  src={currentImage ? currentImage : defaultImage}
                  htmlFor="default_image"
                  alt="img_default"
                  className="w-20 "
                />
              </label>
              <input
                type="file"
                id="default_image"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* Name */}
            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Tên sản phẩm
              </label>
              <input
                type="text"
                name="product_name"
                id="product_name"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Bonnie"
                required
                {...register("product_name")}
              />
            </div>

            {/* Sale */}
            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Giảm giá
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="20%"
                required
                {...register("product_sale", {
                  min: 0,
                  max: 100,
                })}
              />
            </div>

            {/* Price */}
            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Giá tiền
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="100.000đ"
                required
                {...register("product_price", { min: 0 })}
              />
            </div>

            {/* Rating Star */}
            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Sao đánh giá
              </label>
              <input
                type="number"
                name="Star"
                id="Star"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="5"
                required
                {...register("rating_star", { min: 0, max: 5 })}
              />
            </div>

            {/* Category */}
            <div className="col-span-6">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Loại sản phẩm
              </label>
              <select
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register("category_id")}
                required
              >
                <option value={""}>Choose a category</option>
                {categories.map((category, i) => (
                  <option key={i} value={category.category_id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>

            {/* product_detail */}
            <div className="col-span-6 hidden">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Chi tiết sản phẩm
              </label>
              <textarea
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                {...register("product_info")}
              />
            </div>

            {/* product_detail */}
            <div className="col-span-6 ">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Chi tiết sản phẩm
              </label>
              <textarea
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                required
                {...register("product_detail")}
              />
            </div>

            <div className="flex justify-end col-span-6">
              <button
                className="text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:ring-sky-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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

export default DialogUpdateProduct;
