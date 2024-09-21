import { useLocation } from "react-router-dom";
import logo from "../../imgs/SweetCorner.png";
import FormThankYou from "./component/FormThankyou";
import OrderDetails from "./component/OrderDetails";

const ThankYouCheckOut = () => {
  const location = useLocation();
  const { products, data, shipping_address } = location.state || {};
  console.log("products: ", products);
  return (
    <>
      <section className="bg-[#F4F5F7] max-w-screen min-h-screen flex justify-center">
        <aside className="rounded-lg mx-auto max-w-5xl w-full">
          <div className="w-full flex justify-center mb-8">
            <img src={logo} alt="Logo" className="w-36" />
          </div>

          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-7">
              <FormThankYou {...{ data, shipping_address }} />
            </div>

            <div className="col-span-5 rounded-lg">
              <OrderDetails {...{ products }} />
            </div>
          </div>
        </aside>
      </section>
    </>
  );
};

export default ThankYouCheckOut;
