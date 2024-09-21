import { AiTwotoneMail } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { apiForgotPassword } from "../../Services/Accounts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../../ReduxToolkit/sildes/ToastSlide";
import { useState } from "react"; // Import useState

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await apiForgotPassword(data);
      navigate("/reset-password", { state: { email: data?.email } });
      dispatch(showToast({ message: res?.data?.message, type: "success" }));
    } catch (err) {
      setMessage("Vui lòng thử lại.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
            <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-8">
                  <h3 className="text-gray-800 text-2xl font-quicksand font-extrabold">
                    Yêu cầu thay đổi mật khẩu
                  </h3>
                  <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                    Nhập email liên kết với tài khoản của bạn, chúng tôi sẽ gửi
                    cho bạn email với hướng dẫn để cài đặt lại mật khẩu
                  </p>
                </div>
                {/* Email */}
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Email
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="email"
                      type="email"
                      className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                      placeholder="Enter email"
                      required
                      {...register("email")}
                    />
                    <AiTwotoneMail
                      className="w-[18px] h-[18px] absolute right-4"
                      color="#bbb"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    {message && (
                      <i className="text-red-500 text-sm">{message}</i>
                    )}
                  </div>
                </div>

                <div className="!mt-4">
                  <button
                    type="submit"
                    className={`w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white focus:outline-none`}
                    disabled={loading}
                  >
                    {loading ? "Đang xử lý..." : "Gửi yêu cầu"}
                  </button>
                </div>
              </form>
            </div>
            <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
              <img
                src="https://readymadeui.com/login-image.webp"
                className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
                alt="Dining Experience"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
