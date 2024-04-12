"use client";

import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Nav from "./Nav";

const ToggleNav = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="z-10 absolute right-0 lg:hidden">
        <button onClick={() => setToggle(!toggle)}>
          <Bars3CenterLeftIcon className="w-12 h-12" />
        </button>
      </div>

      <Nav show={toggle} />
    </>
  );
};

export default ToggleNav;
