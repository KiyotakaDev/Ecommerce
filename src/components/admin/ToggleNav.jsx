"use client";

import { navLinks } from "@/constants";
import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/adminStore";

const ToggleNav = (props) => {
  const path = usePathname();
  const { setAdminData } = useAdminStore();
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    setAdminData(props.user);
  }, []);

  return (
    <>
      <div className="z-10 absolute right-0 lg:hidden">
        <button onClick={() => setToggle(!toggle)}>
          <Bars3CenterLeftIcon className="w-12 h-12" />
        </button>
      </div>

      <aside className="py-4 pl-4 text-gray-600 font-semibold">
        <div className="p-4 font-bold text-xl tracking-wider w-40 gap-2 cursor-default">
          <p>{props.user.name}</p>
        </div>

        <nav className="flex flex-col gap-2">
          <div>
            {navLinks.map((link) => (
              <>
                <Link
                  key={link.name}
                  href={link.to}
                  className={` navi ${
                    path.includes(link.to) ? "bg-violet-200 text-primary" : ""
                  }`}
                >
                  <link.icon
                    className={`icon ${
                      path.includes(link.to) ? "stroke-indigo-800" : ""
                    }`}
                  />
                  <span>{link.name}</span>
                </Link>
                {link.name === "Ecommerce" ? (
                  <Link
                    href={"/admin"}
                    className={`navi ${
                      path === "/admin" ? "bg-violet-200 text-primary" : ""
                    }`}
                  >
                    <HomeIcon className="icon" />
                    Dashboard
                  </Link>
                ) : null}
              </>
            ))}
          </div>
          <div>
            <button onClick={signOut} className="navi w-full">
              <ArrowLeftStartOnRectangleIcon className="icon" />
              Logout
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default ToggleNav;
