"use client";

import Link from "next/link";
import { useCartContext } from "./CartProvider";
import { useAdminStore } from "@/store/adminStore";

const Header = () => {
  const { cartProducts } = useCartContext();
  const { adminData } = useAdminStore();

  return (
    <header className="bg-zinc-900 text-2xl">
      <div className="wrapper flex justify-between py-6">
        <Link href={"/ecommerce"} className="text-white">
          Ecommerce
        </Link>
        <nav className="text-zinc-300 flex gap-6">
          {adminData && <Link href={"/admin"}>Admin</Link>}
          <Link href={"/ecommerce/products"}>All products</Link>
          <Link href={"/ecommerce/categories"}>Categories</Link>
          <Link href={"/ecommerce/account"}>Account</Link>
          <Link href={"/ecommerce/cart"}>Cart ({cartProducts.length})</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
