import { useNavigate } from "react-router-dom";

const DialogLogout = ({ handleClickLogout }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="absolute top-full right-0 mt-2 bg-white text-black border rounded shadow-lg w-36">
        <ul>
          <li
            className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
            onClick={() => navigate("/account")}
          >
            Tài khoản
          </li>
          <li
            className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
            onClick={handleClickLogout}
          >
            Đăng xuất
          </li>
        </ul>
        <div className="absolute -top-2 right-0 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-text_header" />
      </div>
    </>
  );
};
export default DialogLogout;
