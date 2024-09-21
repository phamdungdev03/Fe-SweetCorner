import { FaPhoneVolume } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import { MdEmail, MdPlace } from "react-icons/md";

const InfoContact = () => {
  return (
    <>
      <div className="bg-[#F3E7CD] p-3 md:p-6 rounded-md mx-4 md:mx-0">
        <h2 className="mb-4 text-2xl font-bold text-text_header font-quicksand">
          Cửa hàng SweetCorner
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 flex items-center justify-center border border-[#CD9B32] rounded-full">
              <MdPlace size={24} color="#CD9B32" />
            </div>
            <div>
              <h3 className="font-semibold">Địa chỉ</h3>
              <span className="text-sm">Chung cư k33, Q.Long Biên, Hà Nội</span>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 flex items-center justify-center border border-[#CD9B32] rounded-full">
              <IoTimeSharp size={24} color="#CD9B32" />
            </div>
            <div>
              <h3 className="font-semibold">Thời gian làm việc</h3>
              <span className="text-sm block">8h - 22h</span>
              <span className="text-sm">Từ thứ 2 đến chủ nhật</span>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 flex items-center justify-center border border-[#CD9B32] rounded-full">
              <FaPhoneVolume size={20} color="#CD9B32" />
            </div>
            <div>
              <h3 className="font-semibold">Hotline</h3>
              <span className="text-sm">1900 6750</span>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 flex items-center justify-center border border-[#CD9B32] rounded-full">
              <MdEmail size={24} color="#CD9B32" />
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <span className="text-sm">dungmickey03@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoContact;
