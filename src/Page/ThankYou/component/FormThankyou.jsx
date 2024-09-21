import { useNavigate } from "react-router-dom";
import { Success } from "../../../Component";

const FormThankYou = ({ data, shipping_address }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex gap-5 items-start mb-6">
        <Success />
        <div className="flex flex-col flex-1">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Cảm ơn bạn đã đặt hàng!
          </h2>
          <p className="text-sm text-gray-600">
            Một email xác nhận đã được gửi tới
            <span className="font-medium"> {data?.email}</span>.
          </p>
          <p className="text-sm text-gray-600">
            Xin vui lòng kiểm tra email của bạn.
          </p>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">
              Thông tin người mua
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>{data?.user_name}</li>
              <li>{data?.email}</li>
              <li>{data?.phone_number}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">
              Địa chỉ nhận hàng
            </h4>
            <p className="text-sm text-gray-600">{shipping_address}</p>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">
              Phương thức thanh toán
            </h4>
            <p className="text-sm text-gray-600">{data?.payment_method}</p>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">
              Phương thức vận chuyển
            </h4>
            <p className="text-sm text-gray-600">Giao hàng tận nơi</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="px-6 py-3 bg-amber-500 text-white rounded-full text-sm font-semibold hover:bg-amber-600 transition duration-300 ease-in-out"
        >
          Tiếp tục mua hàng
        </button>
      </div>
    </>
  );
};

export default FormThankYou;
