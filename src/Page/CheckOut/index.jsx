import React, { useEffect, useState } from "react";
import CheckoutForm from "./component/CheckOutForm";
import OrderSummary from "./component/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import { axiosAccountForLogin } from "../../ReduxToolkit/sildes/AccountSlide";
import { apiGetCartForUser } from "../../Services/Cart";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { accountLogin } = useSelector((state) => state.accountReducer || {});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isAccountLoaded, setIsAccountLoaded] = useState(false);
  const navigate = useNavigate();
  const [countCart, setCountCart] = useState();

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    navigate("/account");
  };

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await apiGetCartForUser(accountLogin?.account_id);
        const products = res?.data?.data;
        setProducts(products);
        setCountCart(products?.length);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (accountLogin?.account_id) {
      fetchCart();
    }
  }, [accountLogin]);

  useEffect(() => {
    const fetchAccountLogin = async () => {
      await dispatch(axiosAccountForLogin());
      setIsAccountLoaded(true);
    };

    fetchAccountLogin();
  }, [dispatch]);

  useEffect(() => {
    if (isAccountLoaded && !accountLogin?.phone_number) {
      if (!isDialogOpen) {
        setIsDialogOpen(true);
      }
    }
  }, [accountLogin, isDialogOpen, isAccountLoaded]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="max-md:flex-col flex h-screen gap-10">
        <div className="w-full md:w-2/3 bg-white p-0 md:pl-40">
          <CheckoutForm
            {...{
              accountLogin,
              products,
              handlePaymentMethodChange,
              paymentMethod,
            }}
          />
        </div>
        <div className="w-full md:w-1/3  bg-gray-100 p-0 md:pr-40 border-l border-l-gray-300">
          <OrderSummary {...{ products, paymentMethod, countCart }} />
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">
              Thông tin chưa đầy đủ
            </h2>
            <p>
              Vui lòng cập nhật số điện thoại của bạn để tiếp tục quá trình
              thanh toán.
            </p>
            <button
              onClick={handleDialogClose}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Cập nhật thông tin
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
