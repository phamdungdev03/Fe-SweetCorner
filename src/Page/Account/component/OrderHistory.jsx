import { useEffect, useState } from "react";
import { BsBoxSeamFill } from "react-icons/bs";
import { FaTruck, FaStar } from "react-icons/fa";
import { apiGetOrderByAccountId } from "../../../Services/Orders";
import { formatImg } from "../../../Utils/formatImage";

// Icons data with their corresponding statuses
const icons = [
  { id: "box", icon: <BsBoxSeamFill size={24} />, status: "Confirm" },
  { id: "truck", icon: <FaTruck size={24} />, status: "Pending" },
  { id: "star", icon: <FaStar size={24} />, status: "Completed" },
];

const HeaderIcons = ({ account_id }) => {
  const [selectedIcon, setSelectedIcon] = useState("box");
  const [orders, setOrders] = useState([]);

  const handleClick = (id) => {
    setSelectedIcon(id);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await apiGetOrderByAccountId(account_id);
        setOrders(res?.data?.orders || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, [account_id]);

  const filteredOrders = orders.filter((order) => {
    const selectedStatus = icons.find(
      (icon) => icon.id === selectedIcon
    )?.status;
    return order.delivery_status === selectedStatus;
  });

  return (
    <>
      <header className="flex justify-between w-full items-center">
        {icons.map((item, index) => (
          <>
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full cursor-pointer ${
                selectedIcon === item.id
                  ? "bg-[#F3E7CD] text-text_header"
                  : "bg-gray-100"
              }`}
              onClick={() => handleClick(item.id)}
            >
              {item.icon}
            </div>
            {index < icons.length - 1 && (
              <div className="border-t-2 border-gray-300 flex-grow mx-4"></div>
            )}
          </>
        ))}
      </header>

      {/* Order history */}
      <section className="mt-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.order_id}
              className="mb-8 border overflow-x-auto border-gray-300 rounded-lg p-4"
            >
              {/* Order ID */}
              <h2 className="font-semibold text-lg mb-4">#{order.order_id}</h2>

              {/* Product Table */}
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product, index) => (
                    <tr
                      key={product?.product_id}
                      className={`bg-white border-b hover:bg-gray-50 ${
                        index === order.products.length - 1 ? "border-b-0" : ""
                      }`}
                    >
                      <td className="px-4 py-2">
                        <img
                          src={formatImg(product?.default_image)}
                          alt={"product"}
                          className="w-12 h-12"
                        />
                      </td>
                      <td className="px-4 py-2">{product.product_name}</td>
                      <td className="px-4 py-2">
                        {Number(
                          product?.product_price -
                            product?.product_price *
                              (product?.product_sale / 100)
                        ).toLocaleString()}{" "}
                        đ
                      </td>
                      <td className="px-4 py-2">{product.quantity} sản phẩm</td>
                      <td className="px-4 py-2">
                        {Number(
                          (product?.product_price -
                            product?.product_price *
                              (product?.product_sale / 100)) *
                            product?.quantity
                        ).toLocaleString()}{" "}
                        VNĐ
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td colSpan="3"></td>
                    <td
                      colSpan="1"
                      className="px-4 py-2 font-semibold text-left"
                    >
                      Shipping Fee:
                    </td>
                    <td className="px-4 py-2">
                      {Number(20000).toLocaleString()} VNĐ
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3"></td>
                    <td
                      colSpan="1"
                      className="px-4 py-2 font-semibold text-left"
                    >
                      Total Amount:
                    </td>
                    <td className="px-4 py-2 font-semibold">
                      {Number(
                        order.products.reduce((total, product) => {
                          const priceAfterSale =
                            product?.product_price -
                            product?.product_price *
                              (product?.product_sale / 100);
                          return total + priceAfterSale * product.quantity;
                        }, 0) + (order?.shipping_fee || 0)
                      ).toLocaleString()}{" "}
                      VNĐ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm.</p>
        )}
      </section>
    </>
  );
};

export default HeaderIcons;
