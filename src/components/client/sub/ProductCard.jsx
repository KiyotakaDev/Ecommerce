import Link from "next/link";
import { useCartContext } from "../CartProvider";

const ProductCard = ({ id, product: name, price, imagesPath: images }) => {
  const { addProductToCart, setProductID } = useCartContext();

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="bg-white flex justify-center items-center h-44 rounded-lg">
          <Link onClick={() => setProductID(id)} href={`/ecommerce/product/${name}`}>
            <img
              src={images[0]}
              alt=""
              className="max-w-full max-h-36 hover:-translate-y-4 transition-all duration-300 ease-out"
            />
          </Link>
        </div>
        <p className="mt-2">{name}</p>
      </div>
      <div className="flex justify-between pt-4">
        <span className="text-2xl font-bold">${price / 100}</span>
        <button
          onClick={() => addProductToCart(id)}
          className="border-2 border-violet-800 bg-transparent hover:bg-violet-600/20 px-3 py-1 rounded-lg transition-colors duration-200 ease-in-out text-violet-800"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
