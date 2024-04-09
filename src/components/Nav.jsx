"use client";

import { navLinks } from "@/constants";
import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const path = usePathname();

  return (
    <aside className="py-4 pl-4">
      <div className="p-4 font-bold text-xl tracking-wider w-40 gap-2 cursor-default">
        <p>root</p>
      </div>

      <nav className="flex flex-col gap-2">
        <Link
          href={"/admin"}
          className={`flex gap-2 p-3 rounded-l-lg ${
            path === "/admin" ? "bg-slate-200" : ""
          }`}
        >
          <HomeIcon className="w-6 h-6" />
          Dashboard
        </Link>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.to}
            className={`flex gap-2 p-3 rounded-l-lg ${
              path.includes(link.to) ? "bg-slate-200" : ""
            }`}
          >
            <link.icon className="h-6 w-6" />
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Nav;
