"use client";

import { navLinks } from "@/constants";
import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'

const Nav = () => {
  const path = usePathname();

  return (
    <aside className="py-4 pl-4 text-gray-600 font-semibold">
      <div className="p-4 font-bold text-xl tracking-wider w-40 gap-2 cursor-default">
        <p>root</p>
      </div>

      <nav className="flex flex-col gap-2">
        <div>
          <Link
            href={"/admin"}
            className={`navi ${
              path === "/admin" ? "bg-violet-200 text-primary" : ""
            }`}
          >
            <HomeIcon className="icon" />
            Dashboard
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.to}
              className={` navi ${
                path.includes(link.to) ? "bg-violet-200 text-primary" : ""
              }`}
            >
              <link.icon className={`icon ${path.includes(link.to) ? "stroke-indigo-800" : ""}`} />
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
        <div>
          <button className="navi w-full">
            <ArrowLeftStartOnRectangleIcon className="icon" />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Nav;
