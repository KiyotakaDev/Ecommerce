import { navLinks } from "@/constants";
import Link from "next/link";

const Nav = () => {

  return (
    <aside className="py-4 pl-4">
      <div className="p-4 font-bold text-xl tracking-wider w-40 gap-2 cursor-default">
        <p>Kiyota</p>
      </div>

      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.to}
            className={`flex gap-2 p-3 rounded-l-lg`}
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
