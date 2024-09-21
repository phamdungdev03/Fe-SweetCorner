import React, { useEffect, useState } from "react";
import logo from "../../../imgs/SweetCorner.png";
import payment1 from "../../../imgs/payment_1.webp";
import payment2 from "../../../imgs/payment_2.webp";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  apiCreateOrder,
  apiOrderStatus,
  apiPayment,
} from "../../../Services/Orders";
import { useDispatch } from "react-redux";
import { showToast } from "../../../ReduxToolkit/sildes/ToastSlide";
import { apiDeleteCartForUser } from "../../../Services/Cart";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({
  accountLogin,
  products,
  handlePaymentMethodChange,
  paymentMethod,
}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    if (provinceId) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`)
        .then((res) => {
          setDistricts(res?.data?.data);
          setWards([]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setDistricts([]);
      setWards([]);
    }
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    if (districtId) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`)
        .then((res) => {
          setWards(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setWards([]);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.get(
        `https://esgoo.net/api-tinhthanh/5/${data?.ward}.htm`
      );

      const full_name = response?.data?.data?.full_name;
      const shipping_address = `${data?.address}, ${full_name}`;

      const {
        address,
        district,
        province,
        ward,
        email,
        user_name,
        phone_number,
        ...ortherData
      } = data;

      const { grand_total } = products[0];

      const newData = {
        ...ortherData,
        items: products,
        account_id: accountLogin?.account_id,
        shipping_address,
        total_amount: Number(grand_total),
        delivery_status: "Confirm",
      };

      await apiCreateOrder(newData)
        .then(async () => {
          dispatch(
            showToast({ message: "Tạo đơn hàng thành công!", type: "success" })
          );
          await apiDeleteCartForUser(accountLogin?.account_id);
          navigate("/checkout/thankyou", {
            state: { products, data: data, shipping_address },
          });
        })
        .catch((err) => {
          dispatch(
            showToast({ message: "Tạo đơn hàng thất bại!", type: "error" })
          );
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const payment = async (data) => {
    try {
      const response = await axios.get(
        `https://esgoo.net/api-tinhthanh/5/${data?.ward}.htm`
      );

      const full_name = response?.data?.data?.full_name;
      const shipping_address = `${data?.address}, ${full_name}`;

      const res = await apiPayment({
        total_amount: Number(products[0]?.grand_total) + Number(20000),
        products,
        account_id: accountLogin?.account_id,
        shipping_address: shipping_address,
        note_checkout: data?.note_checkout,
      });
      const payUrl = res?.data?.data?.order_url;

      if (payUrl) {
        window.location.href = payUrl;
        const paymentSuccess = await checkPaymentStatus(
          res?.data?.transaction_id
        );

        if (paymentSuccess) {
          await onSubmit(data);
        }
      } else {
        console.log("URL thanh toán không có sẵn");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkPaymentStatus = async (transaction_id) => {
    try {
      const res = await apiOrderStatus(transaction_id);
      return res?.data?.return_code === 1;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const handleFormSubmit = (data) => {
    paymentMethod === "Chuyển khoản" ? payment(data) : onSubmit(data);
  };

  useEffect(() => {
    setValue("email", accountLogin?.email);
    setValue("user_name", accountLogin?.user_name);
    setValue("phone_number", accountLogin?.phone_number);
    axios
      .get(`https://esgoo.net/api-tinhthanh/1/0.htm`)
      .then((res) => {
        setProvinces(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setValue, accountLogin]);

  return (
    <form id="checkoutForm" onSubmit={handleSubmit(handleFormSubmit)}>
      <header className="pb-6">
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="max-h-36" />
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-6">
          <header>
            <h2 className="font-semibold text-lg mb-3">Thông tin nhận hàng</h2>
          </header>
          <div>
            <div className="col-span-6 sm:col-span-3">
              <input
                type="email"
                {...register("email", { required: true })}
                readOnly
                className="shadow-sm bg-gray-300 border mb-2 border-gray-300 cursor-not-allowed text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Email"
              />
            </div>
            <div className="col-span-6 sm:col-span-3 py-2">
              <input
                type="text"
                {...register("user_name", { required: true })}
                className="shadow-sm bg-gray-300 border border-gray-300 cursor-not-allowed text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Họ và tên"
                readOnly
              />
            </div>
            <div className="col-span-6 sm:col-span-3 py-2">
              <input
                type="number"
                {...register("phone_number", { required: true })}
                className="shadow-sm bg-gray-300 border border-gray-300 cursor-not-allowed text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Số điện thoại (tùy chọn)"
                readOnly
              />
            </div>
            <div className="col-span-6 sm:col-span-3 py-2">
              <input
                type="text"
                {...register("address", { required: true })}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Địa chỉ (tùy chọn)"
              />
            </div>
            <div className="col-span-6 py-2">
              <select
                {...register("province")}
                onChange={handleProvinceChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option value="">Tỉnh thành (Tùy chọn)</option>
                {provinces.map((province, i) => (
                  <option key={i} value={province?.id}>
                    {province?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-6 py-2">
              <select
                {...register("district")}
                onChange={handleDistrictChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value="">Quận huyện (Tùy chọn)</option>
                {districts.map((district, i) => (
                  <option key={i} value={district?.id}>
                    {district?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-6 py-2">
              <select
                {...register("ward")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value="">Phường xã (Tùy chọn)</option>
                {wards.map((ward, i) => (
                  <option key={i} value={ward?.id}>
                    {ward?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="py-2">
              <textarea
                {...register("note_checkout")}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                placeholder="Ghi chú (tùy chọn)"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <header>
            <h2 className="font-semibold text-lg mb-3">Vận chuyển</h2>
          </header>
          <div>
            <div className="border border-gray-300 rounded-md p-3 flex items-center">
              <input
                type="radio"
                checked
                value="delivery"
                className="w-4 h-4 mx-3"
              />
              <label className="flex justify-between w-full pr-4">
                <span className="font-medium">Giao hàng tận nơi</span>
                <span className="text-sm">20.000₫</span>
              </label>
            </div>
          </div>
          <div className="pt-8">
            <header className="text-lg font-semibold mb-3">Thanh toán</header>
            <div className="border border-gray-300 rounded-t-md p-3 flex items-center">
              <input
                type="radio"
                {...register("payment_method", { required: true })}
                value="Chuyển khoản"
                className="w-4 h-4 mx-3"
                onChange={(e) => handlePaymentMethodChange(e)}
              />
              <label className="flex justify-between w-full pr-4">
                <span className="font-medium">Chuyển khoản</span>
                <span className="text-sm">
                  <img src={payment2} alt="payment1" className="w-12" />
                </span>
              </label>
            </div>
            <div className="border border-gray-300 rounded-b-md p-3 flex items-center border-t-0">
              <input
                type="radio"
                {...register("payment_method", { required: true })}
                value="Thu hộ (COD)"
                className="w-4 h-4 mx-3"
                defaultChecked
                onChange={(e) => handlePaymentMethodChange(e)}
              />
              <label className="flex justify-between w-full pr-4">
                <span className="font-medium">Thu hộ (COD)</span>
                <span className="text-sm">
                  <img src={payment1} alt="payment2" className="w-12" />
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
