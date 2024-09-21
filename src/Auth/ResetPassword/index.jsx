import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiTwotoneMail } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { apiVerifyOtp } from "../../Services/Accounts";
import { useDispatch } from "react-redux";
import { showToast } from "../../ReduxToolkit/sildes/ToastSlide";

const ResetPassword = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [otpValid, setOtpValid] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const { register, handleSubmit, watch, setFocus } = useForm({
    defaultValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    },
  });

  const onSubmitOTP = async (data) => {
    const code = [data.otp1, data.otp2, data.otp3, data.otp4].join("");

    try {
      const res = await apiVerifyOtp({ email: email, otp: code });
      setOtpValid(true);
      dispacth(showToast({ message: res?.data?.message, type: "success" }));
    } catch (error) {
      setMessage("Lỗi kết nối đến server. Vui lòng thử lại.");
    }
  };

  const onSubmitResetPassword = async (data) => {
    const { password, password2 } = data;
    if (password !== password2) {
      setMessage("Mật khẩu không khớp.");
      return;
    }
    try {
      const res = await apiVerifyOtp({
        email: email,
        password: data?.password,
      });
      dispacth(showToast({ message: res?.data?.message, type: "success" }));
      navigate("/login");
    } catch (error) {
      setMessage("Lỗi kết nối đến server. Vui lòng thử lại.");
    }
  };

  const otpValues = watch(["otp1", "otp2", "otp3", "otp4"]);

  useEffect(() => {
    otpValues.forEach((value, index) => {
      if (value.length === 1 && index < 3) {
        setFocus(`otp${index + 2}`);
      }
    });
  }, [otpValues, setFocus]);
  return (
    <>
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
            <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              {!otpValid ? (
                <form
                  onSubmit={handleSubmit(onSubmitOTP)}
                  className="space-y-4"
                >
                  <div className="mb-8 text-center">
                    <h3 className="text-gray-800 text-3xl font-bold">
                      Email Verification
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                      We have sent a code to your email
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-3">
                      <input
                        {...register("otp1", { required: true, maxLength: 1 })}
                        type="text"
                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        maxLength="1"
                      />
                      <input
                        {...register("otp2", { required: true, maxLength: 1 })}
                        type="text"
                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        maxLength="1"
                      />
                      <input
                        {...register("otp3", { required: true, maxLength: 1 })}
                        type="text"
                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        maxLength="1"
                      />
                      <input
                        {...register("otp4", { required: true, maxLength: 1 })}
                        type="text"
                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        maxLength="1"
                      />
                    </div>
                  </div>

                  <div className="!mt-8">
                    <button
                      type="submit"
                      className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                      Xác nhận mã OTP
                    </button>
                  </div>
                  <div className="text-sm text-slate-500 mt-4">
                    Bạn không nhận được OTP?{" "}
                    <a
                      className="font-medium text-indigo-500 hover:text-indigo-600"
                      href="/forgot-password"
                    >
                      Gửi lại{" "}
                    </a>{" "}
                  </div>
                </form>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmitResetPassword)}
                  className="space-y-4"
                >
                  <div className="mb-8">
                    <h3 className="text-gray-800 text-2xl font-quicksand font-extrabold">
                      Tạo mật khẩu mới
                    </h3>
                    <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                      Mật khẩu mạnh giúp bạn bảo vệ tài khoản tốt hơn
                    </p>
                  </div>
                  {/* Password */}
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Nhập mật khẩu mới
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...register("password", { required: true })}
                      />
                      <AiTwotoneMail
                        className="w-[18px] h-[18px] absolute right-4"
                        color="#bbb"
                      />
                    </div>
                  </div>
                  {/* Password */}
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Xác nhận mật khẩu mới
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="password"
                        placeholder="Xác nhận mật khẩu mới"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...register("password2", { required: true })}
                      />
                      <AiTwotoneMail
                        className="w-[18px] h-[18px] absolute right-4"
                        color="#bbb"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex text-sm items-center">
                      {message && <i className="text-red-500 ">{message}</i>}
                    </div>
                  </div>

                  <div className="!mt-4">
                    <button
                      type="submit"
                      className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                      Tạo mật khẩu mới
                    </button>
                  </div>
                </form>
              )}
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

export default ResetPassword;
