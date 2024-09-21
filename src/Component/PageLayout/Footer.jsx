import logoShop from "../../imgs/SweetCorner.png";
import payment1 from "../../imgs/payment_1.webp";
import payment2 from "../../imgs/payment_2.webp";
import payment3 from "../../imgs/payment_3.webp";
import link1 from "../../imgs/shopee.webp";
import link2 from "../../imgs/lazada.webp";
import link3 from "../../imgs/tiki.webp";
import link4 from "../../imgs/sendo.webp";
import zalo from "../../imgs/zalo.webp";
import facebook from "../../imgs/facebook.webp";
import youtube from "../../imgs/youtube.webp";
import google from "../../imgs/google.webp";

const Footer = () => {
  return (
    <footer className="bg-[#f3e7cd] text-black py-[50px]">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-12 gap-4">
          {/* Logo và mô tả */}
          <div className="col-span-12 lg:col-span-4">
            <img src={logoShop} alt="logoShop" className="mb-4 max-w-[100px]" />
            <p className="text-sm mb-3">
              Hãy đến với Sweet Corner và hãy để những món bánh tuyệt vời của
              chúng tôi làm cho cuộc sống bạn thêm ngọt ngào
            </p>
            <h3 className="uppercase text-xl font-semibold text-text_header mb-5">
              Hình thức thanh toán
            </h3>
            <ul className="flex gap-2">
              <li>
                <img src={payment1} alt="" className="max-h-7" />
              </li>
              <li>
                <img src={payment2} alt="" className="max-h-7" />
              </li>
              <li>
                <img src={payment3} alt="" className="max-h-7" />
              </li>
            </ul>
          </div>

          {/* Liên kết nhanh */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-2">
            <h3 className="font-bold mb-4 text-xl text-text_header uppercase">
              Chính sách
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-text_header text-base">
                  Chính sách thành viên
                </a>
              </li>
              <li>
                <a
                  href="/introduce"
                  className="hover:text-text_header text-base"
                >
                  Chính sách thanh toán
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="hover:text-text_header text-base"
                >
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-text_header text-base">
                  Quà tặng tri ân
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-text_header text-base">
                  Bảo mật thông tin cá nhân
                </a>
              </li>
            </ul>
          </div>

          {/* Dịch vụ khách hàng */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <h3 className="font-bold mb-4 text-xl text-text_header">
              Thông tin chung
            </h3>
            <ul className="space-y-2 mb-5">
              <li>
                <b className="text-text_header font-bold text-base">
                  Địa chỉ:{" "}
                </b>
                <span className="text-base text-black">
                  Quận Long Biên, Hà Nội
                </span>
              </li>
              <li>
                <b className="text-text_header font-bold text-base">
                  Điện thoại:{" "}
                </b>
                <span className="text-base text-black">0352714499</span>
              </li>
              <li>
                <b className="text-text_header font-bold text-base">Email: </b>
                <span className="text-base text-black">
                  dungmickey03@gmail.com
                </span>
              </li>
            </ul>
            <h4 className="text-text_header font-bold text-[18px] uppercase mb-5">
              Liên kết sàn
            </h4>
            <ul className="flex gap-4">
              <li>
                <img src={link1} alt="" className="max-h-7" />
              </li>
              <li>
                <img src={link2} alt="" className="max-h-7" />
              </li>
              <li>
                <img src={link3} alt="" className="max-h-7" />
              </li>
              <li>
                <img src={link4} alt="" className="max-h-7" />
              </li>
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div className="col-span-12 lg:col-span-3">
            <h3 className="font-bold mb-3 uppercase text-text_header text-[18px]">
              Hỗ trợ
            </h3>
            <ul className="space-y-2">
              <li className="flex flex-col mb-3">
                <span className="font-semibold text-sm">
                  MUA ONLINE(08:00 - 21:00 mỗi ngày)
                </span>
                <a href="/" className="text-text_header text-xl font-bold">
                  0352714499
                </a>
                <span className="italic">
                  Tất cả các ngày trong tuần (Trừ tết Âm Lịch)
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-sm font-semibold">
                  GÓP Ý & KHIẾU NẠI (08:30 - 20:30)
                </span>
                <a href="/" className="text-text_header text-xl font-bold">
                  0352714499
                </a>
                <span className="italic">
                  Tất cả các ngày trong tuần (Trừ tết Âm Lịch)
                </span>
              </li>
            </ul>
            <h4 className="text-text_header text-xl font-bold mb-5 mt-2">
              Mạng xã hội
            </h4>
            <ul className="flex gap-4">
              <li>
                <img src={zalo} alt="" className="max-h-7" />
              </li>
              <li>
                <img src={facebook} alt="" className="max-h-7" />
              </li>
              <li>
                <img src={youtube} alt="" className="max-h-7" />
              </li>
              <li>
                <img src={google} alt="" className="max-h-7" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
