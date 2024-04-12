import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import ToggleNav from "./ToggleNav";

const Nav = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <ToggleNav {...session} />
    </>
  );
};

export default Nav;
