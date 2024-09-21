import { GrFormNext } from "react-icons/gr";
import background_image from "../../imgs/background.webp";
import InfoContact from "./component/InfoContact";
import FormContact from "./component/FormContact";
import MapContact from "./component/MapContact";

const ContactPage = () => {
  return (
    <>
      <div
        className="relative bg-cover bg-center min-h-96 mb-8"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url(${background_image})`,
        }}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-10 min-h-52 flex justify-center items-center pt-[200px] pb-[50px]">
            <div className="flex flex-col items-center">
              <h3 className="text-center text-5xl m text-text_header font-playball font-semibold">
                Liên hệ
              </h3>
              <ul className="flex py-4 px-3 gap-2 text-center">
                <li className="text-white flex gap-4 items-center hover:text-text_header">
                  Trang chủ
                  <span>
                    <GrFormNext />
                  </span>
                </li>
                <li className="text-text_header font-normal">Liên hệ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-screen-xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <InfoContact />
            <div>
              <FormContact />
            </div>
          </div>
          <div>
            <MapContact />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
