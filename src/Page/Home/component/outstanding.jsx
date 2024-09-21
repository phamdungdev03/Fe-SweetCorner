import { CardProduct } from "../../../Component";
import title from "../../../imgs/title.webp";

const ProductOutstandingHome = (props) => {
  const { productOutStanding } = props;
  return (
    <>
      <section className="max-w-screen-xl mx-auto mb-12">
        <div className="p-2 rounded-lg">
          <h3 className="flex flex-col items-center text-5xl font-playball font-medium mb-2">
            <a href="/" className="hover:text-text_header">
              Được mua nhiều nhất
            </a>
            <img src={title} alt="title" className="mt-4" />
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
            {productOutStanding.map((product, i) => (
              <div key={i} className="col-span-1">
                <CardProduct
                  {...{
                    product_id: product.product_id,
                    productImg: product?.default_image,
                    product_name: product?.product_name,
                    product_price: product?.product_price,
                    product_sale: product?.product_sale,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductOutstandingHome;
