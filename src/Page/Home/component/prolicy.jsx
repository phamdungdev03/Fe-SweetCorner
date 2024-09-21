import policyImage1 from "../../../imgs/chinhsach_1.webp";
import policyImage2 from "../../../imgs/chinhsach_2.webp";
import policyImage3 from "../../../imgs/chinhsach_3.webp";
import policyImage4 from "../../../imgs/chinhsach_4.webp";

const Policy = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto mt-12 mb-12">
        <div className="grid grid-cols-4 gap-5">
          <div className="flex items-center max-md:col-span-4 max-lg:col-span-2">
            <img src={policyImage1} alt="" className="w-10 h-10" />
            <div className="pl-3">
              <span className="font-semibold text-base text-black block">
                Miễn phí vận chuyển
              </span>
              <span className="text-sm">
                Áp dụng free shop cho tất cả đơn hàng từ 300 nghìn
              </span>
            </div>
          </div>
          <div className="flex items-center max-md:col-span-4 max-lg:col-span-2">
            <img src={policyImage2} alt="" className="w-10 h-10" />
            <div className="pl-3">
              <span className="font-semibold text-base text-black block">
                Đổi trả dễ dàng
              </span>
              <span className="text-sm">
                Đổi ngay trong ngày nếu như bánh không đúng yêu cầu
              </span>
            </div>
          </div>
          <div className="flex items-center max-md:col-span-4 max-lg:col-span-2">
            <img src={policyImage3} alt="" className="w-10 h-10" />
            <div className="pl-3">
              <span className="font-semibold text-base text-black block">
                Hỗ trợ nhanh chóng
              </span>
              <span className="text-sm">
                Gọi hotline: 19008999 để được hỗ trợ ngay
              </span>
            </div>
          </div>
          <div className="flex items-center max-md:col-span-4 max-lg:col-span-2">
            <img src={policyImage4} alt="" className="w-10 h-10" />
            <div className="pl-3">
              <span className="font-semibold text-base text-black block">
                Thanh toán đa dạng
              </span>
              <span className="text-sm">
                Thanh toán khi nhận hàng, Napas, Visa, Chuyển khoản
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Policy;
