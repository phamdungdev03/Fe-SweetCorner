import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { apiGetOrderById, apiUpdateOrder } from "../../../Services/Orders";
import { axiosProducts } from "../../../ReduxToolkit/sildes/ProductSlide";
import { axiosAccounts } from "../../../ReduxToolkit/sildes/AccountSlide";
import { showToast } from "../../../ReduxToolkit/sildes/ToastSlide";

const DialogUpdateOrder = ({
  handleCloseDialog,
  handleReloadData,
  selectedOrder: id,
}) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state?.productReducer || {});
  const { accounts } = useSelector((state) => state?.accountReducer || {});

  const [quantity, setQuantity] = useState(1);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const { register, handleSubmit, setValue } = useForm();

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAccountChange = (e) => {
    const account = accounts.find(
      (acc) => acc.account_id === Number(e.target.value)
    );
    setSelectedAccount(account);
  };

  const handleProductChange = (e) => {
    const product = products.find(
      (prod) => prod.product_id === Number(e.target.value)
    );
    setSelectedProduct(product);
  };

  const handleAddProduct = () => {
    if (selectedProduct) {
      const productPrice = selectedProduct.product_price;
      const productQuantity = quantity;

      setSelectedProducts((prevProducts) => {
        const existingProductIndex = prevProducts.findIndex(
          (product) => product.product_id === selectedProduct.product_id
        );

        let updatedProducts;

        if (existingProductIndex !== -1) {
          updatedProducts = [...prevProducts];
          updatedProducts[existingProductIndex].quantity += productQuantity;
        } else {
          const newProduct = {
            product_id: selectedProduct.product_id,
            quantity: productQuantity,
            product_price: productPrice,
          };
          updatedProducts = [...prevProducts, newProduct];
        }

        setTotalPrice((prev) => {
          return (
            Number(prev) + Number(selectedProduct.product_price) * quantity
          );
        });
        return updatedProducts;
      });

      setQuantity(1);
    }
  };

  const handleRemoveProduct = (index) => {
    setSelectedProducts((prev) => {
      const updatedProducts = prev.filter((_, i) => i !== index);
      const newTotalPrice = updatedProducts.reduce(
        (sum, item) => sum + item.product_price * item.quantity,
        0
      );
      setTotalPrice(newTotalPrice);
      return updatedProducts;
    });
  };

  const onSubmit = async (data) => {
    const { product_id, ...rest } = data;
    const newData = {
      ...rest,
      account_id: selectedAccount?.account_id,
      items: selectedProducts,
      total_amount: totalPrice,
    };

    if (!selectedAccount?.account_id) {
      dispatch(
        showToast({
          message: "Dữ liệu tài khoản chưa được tải. Vui lòng thử lại.",
          type: "error",
        })
      );
      return;
    }

    await apiUpdateOrder(id, newData)
      .then((response) => {
        dispatch(
          showToast({
            message: "Cập nhật đơn hàng thành công !",
            type: "success",
          })
        );
        handleCloseDialog();
        handleReloadData();
      })
      .catch((err) => {
        showToast({
          message: "Cập nhật đơn hàng thất bại !",
          type: "error",
        });
        console.log("Lỗi từ API:", err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(axiosProducts({ currentPage: 1, pageSize: 10000 }));
      await dispatch(axiosAccounts({ currentPage: 1, pageSize: 10000 }));
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const res = await apiGetOrderById(id);
        const orderDetail = res?.data?.data[0];
        setValue("account_id", orderDetail.account_id);
        setValue("shipping_address", orderDetail.shipping_address);
        setValue("product_id", orderDetail.product_id);
        setValue("payment_method", orderDetail.payment_method);
        setValue("delivery_status", orderDetail.delivery_status);
        setSelectedProducts(orderDetail.products);
        setTotalPrice(orderDetail.total_amount);

        const account = accounts.find(
          (acc) => acc.account_id === orderDetail.account_id
        );
        setSelectedAccount(account);
      } catch (err) {
        console.log(err);
      }
    };

    if (accounts.length > 0) {
      fetchOrderData();
    }
  }, [accounts, id, setValue]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="w-screen h-screen bg-slate-800 opacity-50 absolute top-0 left-0"
          onClick={handleCloseDialog}
        ></div>
        <div className="bg-white rounded-lg p-2 relative z-10 max-w-lg w-full animate-fadeInScaleUp">
          <div className="flex items-start justify-between p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold">Cập nhật đơn hàng</h3>
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
              <div className="col-span-6">
                <label className="text-sm font-medium text-gray-900 block mb-2">
                  Khách hàng
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  {...register("account_id", {
                    onChange: (e) => {
                      handleAccountChange(e);
                    },
                  })}
                >
                  <option value={""}>Tên khách hàng</option>
                  {accounts?.map((account, i) => (
                    <option key={i} value={account.account_id}>
                      {account.user_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Address */}
              <div className="col-span-6">
                <label className="text-sm font-medium text-gray-900 block mb-2">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Long Biên Hà Nội"
                  required
                  {...register("shipping_address")}
                />
              </div>

              {/* Product */}
              <div className="col-span-6 sm:col-span-3">
                <label className="text-sm font-medium text-gray-900 block mb-2">
                  Sản phẩm
                </label>
                <select
                  id="product"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  {...register("product_id", {
                    onChange: (e) => {
                      handleProductChange(e);
                    },
                  })}
                >
                  <option value={""}>Product</option>
                  {products.map((product, i) => (
                    <option key={i} value={product.product_id}>
                      {product.product_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Counter */}
              <div className="col-span-6 sm:col-span-2">
                <label className="text-sm font-medium text-gray-900 block mb-2">
                  Số lượng
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={handleDecrease}
                    className="flex h-10 items-center justify-center rounded-l-md border border-neutral-300 bg-neutral-50 px-2 py-2 text-neutral-600 hover:opacity-75"
                  >
                    <RiSubtractFill size={22} />
                  </button>
                  <input
                    type="text"
                    className="h-10 w-14 text-center border-y border-neutral-300 bg-neutral-50/50 text-neutral-900"
                    readOnly
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                  <button
                    type="button"
                    onClick={handleIncrease}
                    className="flex h-10 items-center justify-center rounded-r-md border border-neutral-300 bg-neutral-50 px-2 py-2 text-neutral-600 hover:opacity-75"
                  >
                    <FaPlus size={15} />
                  </button>
                </div>
              </div>

              {/* Button Add product to form */}
              <div className="col-span-1">
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br rounded-lg px-5 py-3 mt-7"
                >
                  <FaPlus color="#fff" />
                </button>
              </div>

              {/* Payment */}
              <div className="col-span-6 sm:col-span-3">
                <label className="text-sm font-medium text-gray-900 block mb-2">
                  Thanh toán
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  {...register("payment_method")}
                >
                  <option value={""}>Payment Method</option>
                  <option value={"Chuyển khoản"}>Chuyển khoản</option>
                  <option value={"Thu hộ (COD)"}>Thu hộ (COD)</option>
                  <option value={"Tiền mặt"}>Tiền mặt</option>
                </select>
              </div>

              {/* State */}
              <div className="col-span-6 sm:col-span-3">
                <label className="text-sm font-medium text-gray-900 block mb-2">
                  Trạng thái đơn hàng
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  {...register("delivery_status")}
                >
                  <option value={""}>Delivery Status</option>
                  <option value={"Confirm"}>Confirm</option>
                  <option value={"Pending"}>Pending</option>
                  <option value={"Completed"}>Completed</option>
                </select>
              </div>

              {selectedProducts.length > 0 && (
                <div className="col-span-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">
                    Sản phẩm đã chọn
                  </h4>
                  <ul className="space-y-4">
                    {selectedProducts.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                      >
                        <span className="text-sm">
                          {
                            products.find(
                              (prod) => prod.product_id === item.product_id
                            )?.product_name
                          }{" "}
                          - Số lượng: {item.quantity} - Giá:{" "}
                          {Number(item.product_price).toLocaleString()} VNĐ
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveProduct(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <IoMdClose size={20} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Total Amount */}
              <div className="col-span-6 text-end">
                <label className="text-sm font-medium text-gray-900 block mb-2">
                  Tổng tiền:{" "}
                  <p className="inline text-red-600">
                    {Number(totalPrice).toLocaleString()} VNĐ
                  </p>
                </label>
              </div>

              <div className="flex justify-end col-span-6">
                <button
                  className="text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:ring-teal-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  type="submit"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DialogUpdateOrder;
