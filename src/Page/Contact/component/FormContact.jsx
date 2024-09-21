const FormContact = () => {
  return (
    <>
      <div className="bg-[#F3E7CD] p-3 md:p-6 rounded-md mx-4 md:mx-0">
        <h2 className="mb-4 text-2xl font-bold text-text_header font-quicksand">
          Liên hệ với chúng tôi
        </h2>
        <div className="w-full">
          <div className="p-1 mb-2 text-sm">
            Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng
            tôi sẽ liên lạc lại với bạn sớm nhất có thể.
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-0"
              placeholder="Họ và tên"
              required
            />
            <input
              type="text"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-0"
              placeholder="Email"
              required
            />

            <input
              type="text"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-0"
              placeholder="Điện thoại"
              required
            />
            <textarea
              rows="4"
              className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Nội dung"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Gửi yêu cầu
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormContact;
