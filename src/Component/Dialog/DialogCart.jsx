import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../../ReduxToolkit/sildes/DialogSlide";
import { FaRegCheckCircle, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { apiGetProductById } from "../../Services/Products";
import { formatImg } from "../../Utils/formatImage";
import { axiosAccountForLogin } from "../../ReduxToolkit/sildes/AccountSlide";
import { apiGetCartForUser } from "../../Services/Cart";
import { useNavigate } from "react-router-dom";

const DialogCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productDetailCart: id } = useSelector(
    (state) => state?.dialogReducer || {}
  );
  const [productDetails, setProductDetails] = useState(null);
  const { accountLogin } = useSelector((state) => state.accountReducer || {});
  const [total, setTotal] = useState();
  const handleCloseDialog = () => {
    dispatch(closeDialog());
  };

  const salePrice = Number(productDetails?.product_sale);
  const finalPrice = salePrice
    ? productDetails.product_price -
      (Number(productDetails?.product_price) * Number(salePrice)) / 100
    : productDetails?.product_price;

  const handleClickCheckout = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    dispatch(axiosAccountForLogin());
  }, [dispatch]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await apiGetCartForUser(accountLogin?.account_id);
        const totalProduct = res?.data?.totalProduct;
        setTotal(totalProduct);
      } catch (err) {
        console.log(err);
      }
    };

    if (accountLogin?.account_id) {
      fetchCart();
    }
  }, [accountLogin]);

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
  }, [id, dispatch]);

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
        <div className="bg-white relative rounded-lg z-10 max-w-md w-full animate-fadeInScaleUp shadow-lg mx-4 md:mx-0 max-h-[80vh] max-md:overflow-y-auto ">
          <div className="rounded-t-lg bg-text_header">
            <span className="flex items-center gap-2 p-3 font-bold pl-5 text-white text-sm font-quicksand">
              <FaRegCheckCircle /> Mua hàng thành công
            </span>
            <button
              onClick={handleCloseDialog}
              className="absolute top-2 md:top-3 right-2 md:right-3 text-white hover:text-gray-800 focus:outline-none"
            >
              <FaTimes size={18} />
            </button>
          </div>
          <div className="flex p-3 border-b-2 border-text_header mb-3">
            <div className="w-[70px]">
              <img src={formatImg(productDetails.default_image)} alt="" />
            </div>
            <div className="w-[calc(100% - 70px] pl-4">
              <h4 className="text-sm font-quicksand font-bold">
                {productDetails?.product_name}
              </h4>
              <div className="text-base font-normal">
                <b className="text-text_header mr-4">
                  {Number(finalPrice).toLocaleString()}đ
                </b>
              </div>
            </div>
          </div>
          <a href="/" className="text-sm text-black inline-block px-3">
            Giỏ hàng của bạn hiện có{" "}
            <span className="inline-block bg-none text-text_header font-semibold">
              {total}
            </span>{" "}
            sản phẩm
          </a>
          <div className="flex justify-around py-3 pb-3">
            <div
              onClick={handleCloseDialog}
              className="bg-text_header font-normal px-10 border-[1px] flex items-center border-text_header text-white h-10 cursor-pointer rounded-md "
            >
              Tiếp tục mua hàng
            </div>
            <div
              onClick={handleClickCheckout}
              className="bg-text_header font-normal px-10 border-[1px] flex items-center border-text_header text-white h-10 cursor-pointer rounded-md"
            >
              Thanh toán ngay
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DialogCart;
