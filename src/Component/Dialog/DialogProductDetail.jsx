import { useDispatch, useSelector } from "react-redux";
import {
  closeDialog,
  openDialogCart,
} from "../../ReduxToolkit/sildes/DialogSlide";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { apiGetProductById } from "../../Services/Products";
import { formatImg } from "../../Utils/formatImage";
import { axiosAccountForLogin } from "../../ReduxToolkit/sildes/AccountSlide";
import { apiAddToCart } from "../../Services/Cart";
import { showToast } from "../../ReduxToolkit/sildes/ToastSlide";

const DialogProductDetail = () => {
  const dispatch = useDispatch();
  const { productDetail: id } = useSelector(
    (state) => state?.dialogReducer || {}
  );
  const [quantity, setQuantity] = useState(1);
  const [productDetails, setProductDetails] = useState(null);
  const { accountLogin } = useSelector((state) => state.accountReducer || {});

  const salePrice = Number(productDetails?.product_sale);
  const finalPrice = salePrice
    ? productDetails.product_price -
      (Number(productDetails?.product_price) * Number(salePrice)) / 100
    : productDetails?.product_price;

  const handleCloseDialog = () => {
    dispatch(closeDialog());
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      await dispatch(axiosAccountForLogin());
      const data = {
        account_id: accountLogin?.account_id,
        quantity: quantity,
        product_id: id,
      };

      const cartResponse = await apiAddToCart(data);
      dispatch(
        showToast({ message: cartResponse?.data?.message, type: "success" })
      );
      handleCloseDialog();
      dispatch(openDialogCart(id));
    } catch (error) {
      console.error("Error adding product to cart: ", error);
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await apiGetProductById(id);
        const productDetails = res?.data?.data[0];
        setProductDetails(productDetails);
      } catch (err) {
        console.error("Error fetching product details: ", err);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (!productDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="w-screen h-screen bg-slate-800 opacity-50 absolute top-0 left-0"
          onClick={handleCloseDialog}
        ></div>
        <div className="bg-white rounded-lg p-4 md:p-8 relative z-10 max-w-3xl w-full animate-fadeInScaleUp shadow-lg mx-4 md:mx-0 max-h-[80vh] max-md:overflow-y-auto max-md:m-0 max-md:rounded-none max-md:max-h-screen ">
          <button
            onClick={handleCloseDialog}
            className="absolute top-2 md:top-3 right-2 md:right-3 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <FaTimes size={20} />
          </button>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 md:col-span-6">
              <div className="flex flex-col gap-4">
                <div className="border p-2 rounded-lg">
                  <img
                    src={formatImg(productDetails.default_image)}
                    alt="Product"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="flex gap-2 max-sm:hidden">
                  <img
                    src={formatImg(productDetails.default_image)}
                    alt="Thumbnail 1"
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg cursor-pointer"
                  />
                  <img
                    src={formatImg(productDetails.default_image)}
                    alt="Thumbnail 2"
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg cursor-pointer"
                  />
                  <img
                    src={formatImg(productDetails.default_image)}
                    alt="Thumbnail 3"
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 flex flex-col">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 font-playball">
                  {productDetails?.product_name}
                </h3>
                <div className="text-lg mb-2">
                  Tình trạng:
                  <span className="text-text_header text-base ml-2">
                    Còn hàng
                  </span>
                </div>
                {salePrice === 0 ? (
                  <div className="text-xl md:text-2xl font-semibold text-black mb-2 font-quicksand">
                    {Number(finalPrice).toLocaleString()}đ
                  </div>
                ) : (
                  <div className="text-xl md:text-2xl font-semibold text-black mb-2 font-quicksand">
                    {Number(finalPrice).toLocaleString()}₫
                    <span className="text-slate-400 line-through font-normal text-sm inline-block ml-3">
                      {Number(productDetails?.product_price).toLocaleString()}₫
                    </span>
                  </div>
                )}
                <p className="text-gray-700 mb-3 text-sm">
                  {productDetails?.product_info ||
                    "Thông tin sản phẩm đang cập nhật"}
                </p>
              </div>
              <form className="flex flex-col items-start gap-4">
                <div className="mb-2">
                  <h2 className="mb-2">Số lượng:</h2>
                  <div className="flex items-center gap-4 md:gap-6 border-2 border-text_header p-1 rounded-md">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      className="bg-text_header text-white px-2 py-2 rounded-lg text-base"
                    >
                      <FaMinus />
                    </button>
                    <span className="text-xl">{quantity}</span>
                    <button
                      type="button"
                      onClick={handleIncrease}
                      className="bg-text_header text-white px-2 py-2 rounded-lg text-base"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="bg-text_header text-white px-4 py-2 md:px-6 md:py-2 rounded-lg uppercase font-mono"
                >
                  Thêm vào giỏ hàng
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DialogProductDetail;
