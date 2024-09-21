import { GrFormNext } from "react-icons/gr";
import background_image from "../../imgs/background.webp";

const IntroducPage = () => {
  return (
    <>
      <div
        className="relative bg-cover bg-center min-h-96 mb-12"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url(${background_image})`,
        }}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-10 min-h-52 flex justify-center items-center pt-[200px] pb-[50px]">
            <div className="flex flex-col items-center">
              <h3 className="text-center text-5xl m text-text_header font-playball font-semibold">
                Giới thiệu
              </h3>
              <ul className="flex py-4 px-3 gap-2 text-center">
                <li className="text-white flex gap-2 items-center hover:text-text_header">
                  Trang chủ
                  <span>
                    <GrFormNext />
                  </span>
                </li>
                <li className="text-text_header font-normal">Giới thiệu</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="my-6 max-w-screen-xl mx-auto max-md:px-3">
        <h2 className="text-4xl font-medium font-quicksand mb-2">Giới thiệu</h2>
        <div className="flex flex-col gap-4 font-quicksand">
          <p>
            SweetCorner là một tiệm bánh nằm ẩn mình giữa phố xá nhộn nhịp của
            thành phố. Với bề dày hơn 10 năm kinh nghiệm trong lĩnh vực làm
            bánh, SweetCorner đã nhanh chóng trở thành điểm đến lý tưởng cho
            những ai đam mê bánh ngọt và muốn thưởng thức những món đặc sản tại
            địa phương.
          </p>
          <p>
            Tiệm bánh nổi tiếng này tự hào sở hữu một đội ngũ nhân viên tận tâm
            và giàu kinh nghiệm. Họ không chỉ đảm bảo mang đến cho khách hàng
            những món bánh được làm tinh tế với sự tỉ mỉ và tình yêu, mà còn
            luôn sẵn lòng lắng nghe và đáp ứng mọi nhu cầu đặc biệt của khách
            hàng.
          </p>
          <p>
            Sự phong phú và đa dạng của thực đơn tại SweetCorner là một điểm
            nhấn đáng chú ý. Khách hàng có thể chọn từ một loạt các loại bánh
            tươi ngon như bánh mousse, bánh su kem, bánh tart, bánh gạo, bánh
            tiramisu, bánh phô mai, bánh cookie và nhiều loại bánh khác nữa. Mỗi
            món bánh đều được chế biến từ những nguyên liệu tươi ngon nhất và
            được trang trí tỉ mỉ, mang lại một trải nghiệm thưởng thức thật
            tuyệt vời.
          </p>
          <p>
            Không chỉ chăm chút vào hương vị, SweetCorner cũng đặc biệt quan tâm
            đến việc thể hiện sự sáng tạo và độc đáo trong từng chi tiết trên
            các món bánh của mình. Bạn có thể tìm thấy những chiếc bánh được
            trang trí tinh tế với hình dáng, màu sắc và hoa văn độc đáo. Những
            điểm nhấn này không chỉ làm cho bánh thêm đẹp mắt mà còn tạo nên một
            phong cách riêng biệt cho SweetCorner.
          </p>
          <p>
            Khách hàng đã trở thành fan hâm mộ của SweetCorner không chỉ vì
            những món bánh ngon mà còn vì không gian ấm cúng và thoải mái tại
            tiệm. Với thiết kế sang trọng nhưng cổ điển, SweetCorner tạo ra một
            môi trường lý tưởng để thư giãn và thưởng thức bánh ngọt. Bạn có thể
            ngồi thoải mái, thưởng thức một ly cà phê nóng và thúc đẩy hương vị
            bánh ngọt bằng những cuộn giấy nhiệt động mời mọc.
          </p>
          <p>
            SweetCorner không chỉ đáng để tham quan mà còn là điểm dừng chân lí
            tưởng để tìm mua những món bánh ngon nhất. Cho dù bạn muốn tổ chức
            một bữa tiệc, mua một chiếc bánh sinh nhật đặc biệt hay đơn giản là
            muốn thưởng thức một chiếc bánh nhỏ đầy mê hoặc, SweetCorner sẽ luôn
            là sự lựa chọn hàng đầu của bạn.
          </p>
          <p>
            Hãy đến với SweetCorner và hãy để những món bánh tuyệt vời của chúng
            tôi làm cho cuộc sống bạn thêm ngọt ngào
          </p>
        </div>
      </section>
    </>
  );
};

export default IntroducPage;
