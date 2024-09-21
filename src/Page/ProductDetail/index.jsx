import { GrFormNext } from "react-icons/gr";
import background_image from "../../imgs/breadcrumb.webp";
import { FaMinus, FaPlus, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { RiShoppingBag4Line } from "react-icons/ri";
import policyImage1 from "../../imgs/chinhsach_1.webp";
import policyImage2 from "../../imgs/chinhsach_2.webp";
import policyImage3 from "../../imgs/chinhsach_3.webp";
import policyImage4 from "../../imgs/chinhsach_4.webp";
import ProductRelate from "./component/ProductRelate";
import { useParams } from "react-router-dom";
import { apiGetProductById } from "../../Services/Products";
import { formatImg } from "../../Utils/formatImage";
import { axiosAccountForLogin } from "../../ReduxToolkit/sildes/AccountSlide";
import { useDispatch, useSelector } from "react-redux";
import { apiAddToCart } from "../../Services/Cart";
import { showToast } from "../../ReduxToolkit/sildes/ToastSlide";
import { openDialogCart } from "../../ReduxToolkit/sildes/DialogSlide";
import DialogCart from "../../Component/Dialog/DialogCart";

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState(null);
  const { accountLogin } = useSelector((state) => state.accountReducer || {});
  const [quantity, setQuantity] = useState(1);
  const { isOpenCart } = useSelector((state) => state.dialogReducer);
  const { id } = useParams();

  const salePrice = Number(productDetails?.product_sale);
  const finalPrice = salePrice
    ? productDetails.product_price -
      (Number(productDetails?.product_price) * Number(salePrice)) / 100
    : productDetails?.product_price;

  const downPrice =
    (Number(productDetails?.product_price) * Number(salePrice)) / 100;

  const handleAddToCart = async () => {
    try {
      console.log(accountLogin);

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
      dispatch(openDialogCart(id));
    } catch (error) {
      console.error("Error adding product to cart: ", error);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      {/* Breadcrumb Section */}
      <div
        className="relative bg-cover bg-center min-h-96 mb-12"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url(${background_image})`,
        }}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-10 min-h-52 flex justify-center items-center pt-[200px] pb-[50px]">
            <div className="flex flex-col items-center">
              <h3 className="text-center text-5xl text-text_header font-playball font-semibold">
                {productDetails?.product_name}
              </h3>
              <ul className="flex py-4 px-3 gap-2 text-center">
                <li className="text-white flex gap-2 items-center hover:text-text_header cursor-pointer">
                  Trang chủ
                  <span>
                    <GrFormNext />
                  </span>
                </li>
                <li className="text-text_header font-normal">
                  {productDetails?.product_name}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="max-w-screen-xl mx-auto font-quicksand">
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Product Images */}
          <div className="col-span-12 md:col-span-5">
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

          {/* Product Info */}
          <div className="col-span-12 md:col-span-7 flex flex-col">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                {productDetails?.product_name}
              </h3>
              <div className="flex gap-3">
                <div className="text-base mb-2 font-semibold">
                  Loại:
                  <span className="text-text_header text-base ml-2 font-semibold">
                    {productDetails?.category_name}
                  </span>
                </div>
                <div className="text-base mb-2 font-semibold">
                  Tình trạng:
                  <span className="text-text_header text-base ml-2 font-semibold">
                    Còn hàng
                  </span>
                </div>
              </div>
              {salePrice === 0 ? (
                <div className="flex items-center">
                  <h3 className="text-xl md:text-3xl font-semibold text-text_header mb-2 font-playball">
                    {Number(finalPrice).toLocaleString()}₫
                  </h3>
                </div>
              ) : (
                <>
                  <div className="flex items-center">
                    <h3 className="text-xl md:text-3xl font-semibold text-text_header mb-2 font-playball">
                      {Number(finalPrice).toLocaleString()}₫
                    </h3>
                    <span className="text-slate-600 text-base inline-block line-through ml-3">
                      {Number(productDetails?.product_price).toLocaleString()}₫
                    </span>
                  </div>
                  <div className="mb-2 font-semibold">
                    Tiết kiệm:
                    <span className="text-rose-700 font-medium ml-2">
                      {Number(downPrice).toLocaleString()}₫
                    </span>
                  </div>
                </>
              )}

              <div className="flex flex-col items-start">
                <span className="font-semibold">Số lượng:</span>
                <div className="flex my-2 items-center justify-center">
                  <div className="flex items-center gap-6 border-2 border-text_header p-1 rounded-md">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      className="bg-text_header text-white px-2.5 py-2.5 rounded-lg"
                    >
                      <FaMinus size={14} />
                    </button>
                    <span className="text-xl">{quantity}</span>
                    <button
                      type="button"
                      onClick={handleIncrease}
                      className="bg-text_header text-white px-2.5 py-2.5 rounded-lg"
                    >
                      <FaPlus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center mb-4">
                <div className="flex items-center gap-3 border-2 h-12 text-white w-full border-text_header font-medium rounded-md overflow-hidden mr-3">
                  <span className="text-text_header flex justify-center items-center h-full pl-3">
                    <RiShoppingBag4Line size={24} />
                  </span>
                  <span className="bg-text_header flex flex-col w-full h-full items-center justify-center">
                    <button
                      onClick={handleAddToCart}
                      className="text-sm font-semibold uppercase"
                    >
                      Thêm vào giỏ
                    </button>
                    <span className="text-xs">Giao hàng tận nơi miễn phí</span>
                  </span>
                </div>

                <div className="flex items-center gap-3 border-2 h-12 text-white w-full border-text_header font-medium rounded-md overflow-hidden mr-3">
                  <span className="text-text_header flex justify-center items-center h-full pl-3">
                    <FaRegHeart size={24} />
                  </span>
                  <span className="bg-text_header flex flex-col w-full h-full items-center justify-center">
                    <span className="text-sm font-semibold uppercase">
                      Yêu thích
                    </span>
                    <span className="text-xs">
                      Thêm vào yêu thích để lưu lại nhớ
                    </span>
                  </span>
                </div>
              </div>

              <div className="col-span-12 md:col-span-4 max-md:mx-5">
                <div className="border-[1px] border-text_header pb-1 py-4 pt-4 relative mb-5 mt-10 rounded-lg ">
                  <div className="bg-text_header text-white font-semibold rounded-[20px] text-lg inline-block py-1 px-4 items-center top-[-24px] absolute left-5 ">
                    <span>Nhận voucher ngay !!!</span>
                  </div>
                  <ul className="mt-5 text-base pl-8 list-disc">
                    <li className="mb-1 opacity-45">
                      <div>
                        <b className="text-text_header">Còn 156.000₫</b> để được
                        nhận mã freeship
                      </div>
                      <div className=" text-white text-base bg-text_header py-1 px-4 rounded-md mt-1 cursor-pointer inline-block">
                        Sao chép
                      </div>
                    </li>
                    <li className="mb-1 opacity-45">
                      <div>
                        <b className="text-text_header">Còn 556.000₫</b> để được
                        nhận mã giảm 20.00đ
                      </div>
                      <div className=" text-white text-base bg-text_header py-1 px-4 rounded-md mt-1 cursor-pointer inline-block">
                        Sao chép
                      </div>
                    </li>
                    <li className="mb-1 opacity-45">
                      <div>
                        <b className="text-text_header">Còn 856.000₫</b> để được
                        nhận mã giảm 50.00đ
                      </div>
                      <div className=" text-white text-base bg-text_header py-1 px-4 rounded-md mt-1 cursor-pointer inline-block">
                        Sao chép
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="max-w-screen-xl mx-auto mt-12 mb-12">
                <div className="grid grid-cols-4 gap-5">
                  <div className="flex items-center max-md:col-span-4 lg:col-span-2 shadow-lg p-4 rounded-md">
                    <img src={policyImage1} alt="" className="w-10 h-10" />
                    <div className="pl-3">
                      <span className="font-semibold text-base text-black block">
                        Miễn phí vận chuyển
                      </span>
                      <span className="text-sm">
                        Áp dụng free shop cho tất cả đơn hàng từ 300 nghìn
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center max-md:col-span-4 lg:col-span-2 shadow-lg p-4 rounded-md">
                    <img src={policyImage2} alt="" className="w-10 h-10" />
                    <div className="pl-3">
                      <span className="font-semibold text-base text-black block">
                        Đổi trả dễ dàng
                      </span>
                      <span className="text-sm">
                        Đổi ngay trong ngày nếu như bánh không đúng yêu cầu
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center max-md:col-span-4 lg:col-span-2 shadow-lg p-4 rounded-md">
                    <img src={policyImage3} alt="" className="w-10 h-10" />
                    <div className="pl-3">
                      <span className="font-semibold text-base text-black block">
                        Hỗ trợ nhanh chóng
                      </span>
                      <span className="text-sm">
                        Gọi hotline: 19008999 để được hỗ trợ ngay
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center max-md:col-span-4 lg:col-span-2 shadow-lg p-4 rounded-md">
                    <img src={policyImage4} alt="" className="w-10 h-10" />
                    <div className="pl-3">
                      <span className="font-semibold text-base text-black block">
                        Thanh toán đa dạng
                      </span>
                      <span className="text-sm">
                        Thanh toán khi nhận hàng, Napas, Visa, Chuyển khoản
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-12">
          <h3 className="text-center text-3xl text-text_header font-playball font-semibold mb-5">
            Mô tả sản phẩm
          </h3>
          <div className="border-t pt-4">
            <p className="text-gray-700 text-sm mb-4">
              Thành phần: {productDetails.product_detail}
            </p>
          </div>
        </div>

        <ProductRelate />
      </div>
      {isOpenCart && <DialogCart />}
    </>
  );
};

export default ProductDetailPage;
