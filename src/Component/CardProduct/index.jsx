import { FaHeart, FaRegHeart, FaShoppingBasket } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { formatImg } from "../../Utils/formatImage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openDialogCart,
  openDialogProductDeltai,
} from "../../ReduxToolkit/sildes/DialogSlide";
import { axiosAccountForLogin } from "../../ReduxToolkit/sildes/AccountSlide";
import { apiAddToCart } from "../../Services/Cart";
import { showToast } from "../../ReduxToolkit/sildes/ToastSlide";
import { useNavigate } from "react-router-dom";

const CardProduct = (props) => {
  const { product_id, productImg, product_price, product_name, product_sale } =
    props;
  const { accountLogin } = useSelector((state) => state.accountReducer || {});

  const discount = (Number(product_price) * Number(product_sale)) / 100;
  const priceSale = product_price - discount;
  const [heart, setHeart] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenDialogProductDetail = (e) => {
    e.stopPropagation();
    dispatch(openDialogProductDeltai(product_id));
  };

  const handleOpenDialogCart = async (e) => {
    e.stopPropagation();
    try {
      await dispatch(axiosAccountForLogin());
      const data = {
        account_id: accountLogin?.account_id,
        quantity: 1,
        product_id: product_id,
      };
      const cartResponse = await apiAddToCart(data);
      dispatch(
        showToast({ message: cartResponse?.data?.message, type: "success" })
      );
      dispatch(openDialogCart(product_id));
    } catch (error) {
      console.error("Error adding product to cart: ", error);
    }
  };

  const handleClickHeart = (e) => {
    e.stopPropagation();
    setHeart(!heart);
  };

  const handleClickProduct = () => {
    navigate(`/productDetail/${product_id}`);
  };

  return (
    <>
      <div
        onClick={handleClickProduct}
        className="bg-white overflow-hidden relative rounded-md max-w-[234px]"
      >
        {/* img */}
        <div className="relative rounded-md group overflow-hidden">
          <div className="relative">
            <img
              src={formatImg(productImg)}
              alt="productImg"
              width={234}
              height={234}
              className="transition-transform duration-1000 ease-in-out transform hover:scale-105"
            />
          </div>
          <div className="absolute top-2 left-2 z-2 text-center text-sm font-bold">
            {Number(product_sale) === 0 ? (
              ""
            ) : (
              <span className="bg-title_sale title_sale">
                - {product_sale}%
              </span>
            )}
          </div>
          <div className="absolute top-4 right-4">
            {heart ? (
              <FaHeart color="#dd433f" size={18} onClick={handleClickHeart} />
            ) : (
              <FaRegHeart
                color="#dd433f"
                size={18}
                onClick={handleClickHeart}
              />
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-4 transition-all transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500 ease-in-out">
            <button
              onClick={handleOpenDialogCart}
              className="bg-text_header text-white py-3 px-3 rounded-full"
            >
              <FaShoppingBasket />
            </button>
            <button
              onClick={handleOpenDialogProductDetail}
              className="bg-text_header text-white py-3 px-3 rounded-full"
            >
              <FaMagnifyingGlass />
            </button>
          </div>
        </div>
        {/* info */}
        <div className="px-2">
          <h3 className="text-base font-bold text-center pt-1 pb-2">
            {product_name}
          </h3>
          {Number(product_sale) === 0 ? (
            <div className="text-text_header text-base font-bold mb-2 text-center">
              {Number(product_price).toLocaleString()}₫
            </div>
          ) : (
            <div className="text-text_header text-base font-bold mb-2 text-center">
              {Number(priceSale).toLocaleString()}₫
              <span className="text-slate-400 line-through font-normal text-sm inline-block ml-3">
                {Number(product_price).toLocaleString()}₫
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CardProduct;
