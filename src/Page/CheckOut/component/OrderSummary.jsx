import React from "react";
import { formatImg } from "../../../Utils/formatImage";
import { GrFormPrevious } from "react-icons/gr";

const OrderSummary = ({ products, paymentMethod, countCart }) => {
  return (
    <div className="flex flex-col">
      <aside className="w-full h-full">
        <header className="border-b border-gray-300 py-5 px-8">
          <h2 className="text-lg font-semibold">{`Đơn hàng có ${countCart} sản phẩm`}</h2>
        </header>
        <div className="pl-5">
          <div className="py-4 border-b border-gray-300">
            <table className="w-full">
              <tbody>
                {products?.map((product, i) => (
                  <tr key={i}>
                    <td>
                      <div className="relative">
                        <img
                          src={formatImg(product?.default_image)}
                          alt="Product"
                          className="w-12 h-12 rounded-lg mb-3"
                        />
                        <span className="absolute top-[-8px] right-0 bg-text_header text-white text-xs font-semibold rounded-full px-2">
                          {product?.quantity}
                        </span>
                      </div>
                    </td>
                    <td className="pl-2">
                      <div className="flex justify-between">
                        <span>{product?.product_name}</span>
                        <span className="text-gray-600">
                          {(
                            Number(product.product_price) -
                            (Number(product?.product_price) *
                              Number(product?.product_sale)) /
                              100
                          ).toLocaleString()}
                          ₫
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="py-4 border-b border-gray-300 flex gap-3 justify-between">
            <input
              type="text"
              placeholder="Nhập mã giảm giá"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 w-2/3 block p-2.5"
            />
            <button
              className="px-4 bg-blue-500 text-white rounded-lg text-sm block opacity-50 cursor-not-allowed"
              disabled
            >
              Áp dụng
            </button>
          </div>

          <div className="py-4 border-b border-gray-300">
            <table className="w-full text-gray-600">
              <tbody>
                <tr>
                  <td className="text-left pt-3">Tạm tính</td>
                  <td className="text-right pt-3">
                    {products[0]?.grand_total
                      ? `${Number(products[0]?.grand_total).toLocaleString()}đ`
                      : "0đ"}
                  </td>
                </tr>
                <tr>
                  <td className="text-left pt-3">Phí vận chuyển</td>
                  <td className="text-right pt-3">20.000₫</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="py-4">
            <table className="w-full">
              <tr>
                <td className="text-left py-4 text-xl">Tổng cộng</td>
                <td className="text-right text-xl py-4 text-blue-500 font-semibold">
                  {Number.isFinite(Number(products[0]?.grand_total))
                    ? (
                        Number(products[0]?.grand_total) + 20000
                      ).toLocaleString()
                    : (20000).toLocaleString()}
                  ₫
                </td>
              </tr>
              <tr>
                <td className="text-left pt-3 text-sm text-blue-500">
                  <div className="flex items-center">
                    <GrFormPrevious size={18} />
                    <span>Quay về giỏ hàng</span>
                  </div>
                </td>
                <td className="text-right text-xl pt-3 flex justify-end">
                  {paymentMethod === "Chuyển khoản" ? (
                    <button
                      form="checkoutForm"
                      type="submit"
                      className="py-3 px-6 bg-blue-500 text-white rounded-lg text-sm block uppercase"
                    >
                      Thanh Toán
                    </button>
                  ) : (
                    <button
                      form="checkoutForm"
                      type="submit"
                      className="py-3 px-6 bg-blue-500 text-white rounded-lg text-sm block uppercase"
                    >
                      Đặt hàng
                    </button>
                  )}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default OrderSummary;
