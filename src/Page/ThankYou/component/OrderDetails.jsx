import { formatImg } from "../../../Utils/formatImage";

const OrderDetails = ({ products }) => {
  const subTotal = Number(products[0]?.grand_total);
  const shippingFee = 20000;
  const total = subTotal + shippingFee;
  return (
    <>
      <div className="bg-white p-8 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Chi tiết đơn hàng
        </h3>
        {/* Product List */}
        {products?.map((product, i) => (
          <div key={i} className="flex items-center mb-4">
            <img
              src={formatImg(product?.default_image)}
              alt="Product"
              className="w-16 h-16 object-cover rounded-lg mr-4"
            />
            <div className="flex-1">
              <h4 className="text-lg font-medium text-gray-800">
                {product?.product_name}
              </h4>
              <p className="text-sm text-gray-600">
                {(
                  Number(product.product_price) -
                  (Number(product?.product_price) *
                    Number(product?.product_sale)) /
                    100
                ).toLocaleString()}
                ₫
              </p>
            </div>
            <p className="text-lg font-medium text-gray-800">
              x {product?.quantity}
            </p>
          </div>
        ))}

        <div className="border-t border-gray-300 my-4"></div>

        {/* Order Summary */}
        <div className="flex justify-between text-gray-800 mb-2">
          <span className="text-sm">Tạm tính</span>
          <span className="text-sm">{subTotal.toLocaleString()}đ</span>
        </div>
        <div className="flex justify-between text-gray-800 mb-2">
          <span className="text-sm">Phí vận chuyển</span>
          <span className="text-sm">{shippingFee.toLocaleString()}đ</span>
        </div>
        <div className="border-t border-gray-300 my-4"></div>
        <div className="flex justify-between text-gray-800 font-bold text-lg">
          <span>Tổng cộng</span>
          <span>{total.toLocaleString()}đ</span>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
