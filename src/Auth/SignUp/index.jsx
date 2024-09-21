import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaPhone, FaUserTie } from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import { useState } from "react";
import { apiSignUp } from "../../Services/Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../../ReduxToolkit/sildes/ToastSlide";
const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      await apiSignUp(data);
      navigate("/login");
      dispatch(
        showToast({ message: "Tạo tài khoản thành công", type: "info" })
      );
    } catch (err) {
      dispatch(showToast({ message: err.message, type: "error" }));
      console.log("Error: ", err);
    }
  };
  return (
    <>
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
            <div className="border border-gray-300 rounded-lg p-6 max-w-xl shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="mb-8">
                  <h3 className="text-gray-800 text-3xl font-bold">
                    Create your Account
                  </h3>
                  <span className="text-gray-500 text-sm mt-4 leading-relaxed">
                    Start your website in seconds. Already have an account?
                    <a
                      href="/login"
                      className="text-blue-600 hover:underline font-semibold ml-2"
                    >
                      Login here
                    </a>
                  </span>
                </div>

                <div className="grid grid-cols-6 gap-6">
                  {/* email */}
                  <div className="col-span-6 sm:col-span-3 relative">
                    <label className="text-sm font-medium text-gray-900 block mb-2">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      id="email"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      placeholder="example@company.com"
                      {...register("email")}
                    />
                    <AiTwotoneMail
                      className="w-[18px] h-[18px] absolute right-4 top-10"
                      color="#bbb"
                    />
                  </div>
                  {/* User name */}
                  <div className="col-span-6 sm:col-span-3 relative">
                    <label className="text-sm font-medium text-gray-900 block mb-2">
                      User Name
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      id="user_name"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      placeholder="Bonnie"
                      required
                      {...register("user_name")}
                    />
                    <FaUserTie
                      className="w-[18px] h-[18px] absolute right-4 top-10"
                      color="#bbb"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3 relative">
                    <label className="text-sm font-medium text-gray-900 block mb-2">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="phone-number"
                      id="phone-number"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      placeholder="e.g. +(12)3456 789"
                      required
                      {...register("phone_number")}
                    />
                    <FaPhone
                      className="w-[18px] h-[18px] absolute right-4 top-10"
                      color="#bbb"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3 relative">
                    <label className="text-sm font-medium text-gray-900 block mb-2">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      placeholder="*******"
                      required
                      {...register("password")}
                    />
                    <span
                      className="w-[18px] h-[18px] absolute right-4 top-10"
                      onClick={handleShowPassword}
                    >
                      {showPassword ? (
                        <FaEye color="#bbb" size={18} />
                      ) : (
                        <FaEyeSlash color="#bbb" size={18} />
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center w-full mt-8">
                  <div className="bg-slate-200 w-full h-0.5"></div>
                  <span className="px-5 text-gray-400">or</span>
                  <div className="bg-slate-200 w-full h-0.5"></div>
                </div>

                <div>
                  <input type="checkbox" id="agree" required />
                  <label htmlFor="agree" className="text-gray-500 text-sm ml-1">
                    By signing up, you are creating a account, and you agree to{" "}
                    <p className="inline text-blue-500 font-semibold">
                      Terms of Use
                    </p>{" "}
                    and
                    <p className="text-blue-500 font-semibold">
                      Privacy Policy.
                    </p>
                  </label>
                </div>

                <div className="!mt-4">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    Create an account
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

export default SignUp;
