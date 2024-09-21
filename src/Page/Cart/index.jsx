import { GrFormNext } from "react-icons/gr";
import background_image from "../../imgs/breadcrumb.webp";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { axiosAccountForLogin } from "../../ReduxToolkit/sildes/AccountSlide";
import {
  apiDeleteProductInCart,
  apiGetCartForUser,
  apiUpdateQuantityProductInCart,
} from "../../Services/Cart";
import { formatImg } from "../../Utils/formatImage";
import { showToast } from "../../ReduxToolkit/sildes/ToastSlide";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accountLogin } = useSelector((state) => state.accountReducer || {});
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const handleClickRemove = async (id) => {
    try {
      const res = await apiDeleteProductInCart(id);
      dispatch(showToast({ message: res?.data?.message, type: "success" }));
      setReload(!reload);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    const data = {
      account_id: accountLogin?.account_id,
      product_id: id,
      quantity: newQuantity,
    };

    try {
      if (newQuantity < 1) return;
      const res = await apiUpdateQuantityProductInCart(data);
      dispatch(showToast({ message: res?.data?.message, type: "success" }));
      setReload(!reload);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickCheckOut = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    dispatch(axiosAccountForLogin());
  }, [dispatch]);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await apiGetCartForUser(accountLogin?.account_id);
        const products = res?.data?.data;
        setProducts(products);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (accountLogin?.account_id) {
      fetchCart();
    }
  }, [accountLogin, reload]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div
        className="relative bg-cover bg-center min-h-96 mb-12"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url(${background_image})`,
        }}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-10 min-h-52 flex justify-center items-center pt-[200px] pb-[50px]">
            <div className="flex flex-col items-center">
              <h3 className="text-center text-5xl m text-text_header font-playball font-semibold">
                Giỏ hàng
              </h3>
              <ul className="flex py-4 px-3 gap-2 text-center">
                <li className="text-white flex gap-2 items-center hover:text-text_header">
                  Trang chủ
                  <span>
                    <GrFormNext />
                  </span>
                </li>
                <li className="text-text_header font-normal">Giỏ hàng</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="flex justify-center mb-20">
          Không có sản phẩm nào trong giỏ hàng
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto mb-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-8">
              <div className="p-3 bg-white rounded-md">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-max bg-white border border-gray-200">
                    <thead>
                      <tr className="border-b border-gray-300 text-sm font-quicksand">
                        <th className="text-left pl-3 py-2">
                          Thông tin sản phẩm
                        </th>
                        <th className="text-center">Đơn giá</th>
                        <th className="text-center">Số lượng</th>
                        <th className="text-center">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products?.map((product, i) => (
                        <tr className="border-b border-gray-300" key={i}>
                          <td className="flex items-center gap-5 py-3 px-2">
                            <img
                              src={formatImg(product?.default_image)}
                              alt="defaultImg"
                              className="w-28 h-32 ml-3 object-cover"
                            />
                            <div className="font-quicksand">
                              <h4 className="mb-1 text-sm font-bold text-black cursor-pointer hover:text-text_header">
                                {product?.product_name}
                              </h4>
                              <span
                                onClick={() =>
                                  handleClickRemove(product.product_id)
                                }
                                className="text-text_header cursor-pointer text-sm font-bold block"
                              >
                                Xóa
                              </span>
                            </div>
                          </td>
                          <td className="text-center">
                            {product.product_sale === 0 ? (
                              <span className="text-base font-bold text-text_header block font-quicksand">
                                {Number(
                                  product?.product_price
                                ).toLocaleString()}
                                đ
                              </span>
                            ) : (
                              <span className="text-base font-bold text-text_header block font-quicksand">
                                {(
                                  Number(product.product_price) -
                                  (Number(product?.product_price) *
                                    Number(product?.product_sale)) /
                                    100
                                ).toLocaleString()}{" "}
                                đ
                              </span>
                            )}
                          </td>
                          <td className="text-center">
                            <div className="flex justify-center items-center">
                              <div className="flex gap-3 border-2 border-text_header p-1 rounded-md">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      product.product_id,
                                      Number(product.quantity) - 1
                                    )
                                  }
                                  className="bg-text_header text-white px-1.5 py-1.5 rounded-lg"
                                >
                                  <FaMinus size={14} />
                                </button>
                                <span className="text-base">
                                  {product?.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      product.product_id,
                                      product.quantity + 1
                                    )
                                  }
                                  className="bg-text_header text-white px-1.5 py-1.5 rounded-lg"
                                >
                                  <FaPlus size={14} />
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="text-center">
                            <span className="text-base font-bold text-text_header block font-quicksand">
                              {Number(product?.total_price).toLocaleString()}đ
                            </span>
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t">
                        <td colSpan="2"></td>
                        <td colSpan="2">
                          <table className="w-full text-sm font-semibold">
                            <tbody>
                              <tr>
                                <td className="px-4 py-4">Tổng tiền: </td>
                                <td className="text-end px-4 text-text_header">
                                  {Number(
                                    products[0]?.grand_total
                                  ).toLocaleString()}
                                  đ
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4" colSpan="2">
                                  <button
                                    onClick={handleClickCheckOut}
                                    className="bg-text_header text-sm font-quicksand font-medium text-white rounded-md leading-10 border-[1px] w-full border-text_header"
                                  >
                                    Thanh toán
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
              <form
                action=""
                className="p-3 bg-[#f3e7cd] rounded-md float-left w-full"
              >
                <h4 className="text-lg font-bold font-quicksand">
                  Thời gian giao hàng
                </h4>
                <div className="flex justify-between mt-2 gap-4">
                  <div className="relative max-w-sm">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                      placeholder="Select date"
                    />
                  </div>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5">
                    <option value="">Chọn thời gian</option>
                    <option value="">8h00 - 12h00</option>
                    <option value="">14h00 - 18h00</option>
                    <option value="">19h00 - 22h00</option>
                  </select>
                </div>
                <div className="mt-3 flex gap-1 items-center">
                  <input type="checkbox" className="w-4 h-4" />
                  <label
                    htmlFor=""
                    className="text-base pl-1 text-black align-top font-medium font-quicksand"
                  >
                    Xuất hóa đơn công ty
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
