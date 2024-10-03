import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { axiosLogin } from "../../ReduxToolkit/sildes/loginSlide";
import { useNavigate } from "react-router-dom";
import { AiTwotoneMail } from "react-icons/ai";
import axios from "axios";
// import FacebookLogin from "react-facebook-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const { loading, error, accessToken } = useSelector(
    (state) => state?.loginReducer || {}
  );

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(axiosLogin(data));
    } catch (err) {
      console.log("Error Login: ", err);
    }
  };

  const handleGoogleSignIn = async (response) => {
    const idToken = response.credential;
    if (!idToken) {
      console.error(
        "idToken is undefined. Check Google Sign-In initialization."
      );
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/api/google",
        { token: idToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;

      if (data.success) {
        sessionStorage.setItem("accessToken", data.accessToken);
        navigate("/");
      } else {
        console.log("Đăng nhập Google thất bại", data.message);
      }
    } catch (error) {
      console.log("Error during Google Sign-In:", error);
    }
  };

  const handleResponseFacebook = async (response) => {
    const { accessToken, userID } = response;

    if (accessToken && userID) {
      try {
        const res = await axios.post("http://localhost:8080/api/api/facebook", {
          accessToken,
          userID,
        });

        const data = res.data;
        if (data.success) {
          sessionStorage.setItem("accessToken", data.accessToken);
          navigate("/");
        } else {
          console.log("Đăng nhập Facebook thất bại", data.message);
        }
      } catch (error) {
        console.log("Error during Facebook login:", error);
      }
    } else {
      console.log("Facebook login failed: No access token or user ID");
    }
  };

  useEffect(() => {
    if (!loading && !error && accessToken) {
      navigate("/");
    }
  }, [loading, error, accessToken, navigate]);

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "177734774574-jnp8lh1di19gkb0kep9p28drv5fr2se5.apps.googleusercontent.com",
      callback: handleGoogleSignIn,
      prompt: "select_account",
      ux_mode: "popup", // Hiển thị dưới dạng popup
    });
    google.accounts.id.renderButton(
      document.getElementById("google-signin-btn"),
      {
        theme: "outline",
        size: "large",
        text: "signin_with", // Chỉ hiển thị icon Google
        logo_alignment: "left", // Icon Google căn trái
      }
    );
  }, []);

  return (
    <>
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
            <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="mb-8">
                  <h3 className="text-gray-800 text-3xl font-extrabold">
                    Đăng nhập
                  </h3>
                  <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                    Đăng nhập tài khoản của bạn ở đây.
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
                      {...register("email")}
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
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                      placeholder="Enter password"
                      {...register("password")}
                      autoComplete="current-password"
                    />

                    <span
                      className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
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
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                  </div>

                  <div className="text-sm">
                    <a
                      href="/forgot-password"
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Quên mật khẩu?
                    </a>
                  </div>
                </div>

                <div className="!mt-4">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    {loading ? "Loading in ..." : "Đăng nhập"}
                  </button>
                </div>

                <p className="text-sm !mt-8 text-center text-gray-800">
                  Bạn chưa có tài khoản?
                  <a
                    href="/sign_up"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    {" "}
                    Đăng ký ngay
                  </a>
                </p>
              </form>

              {/* đăng nhập bằng Google */}
              <div
                id="google-signin-btn"
                className="!mt-4 flex justify-center"
              ></div>

              {/* đăng nhập bằng Facebook */}
              <div className="flex justify-center mt-2">
                <FacebookLogin
                  appId="890691102929999"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={handleResponseFacebook}
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      <FaFacebook /> Facebook
                    </button>
                  )}
                />
              </div>
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

export default Login;
