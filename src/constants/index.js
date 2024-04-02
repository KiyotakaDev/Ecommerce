import { ArchiveBoxIcon, HomeIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const navLinks = [
  { name: "Dashboard", to: "/admin", icon: HomeIcon },
  { name: "Products", to: "/admin", icon: ArchiveBoxIcon },
  { name: "Admins", to: "/admin/admins", icon: UserGroupIcon },
];

const registerFields = [
  {
    label: "username",
    title: "Username",
    type: "text",
    placeholder: "zorg",
  },
  {
    label: "email",
    title: "Email",
    type: "text",
    placeholder: "email@example.com",
  },
  {
    label: "password",
    title: "Password",
    type: "password",
    placeholder: "*****",
  },
  {
    label: "confirm_password",
    title: "Confirm password",
    type: "password",
    placeholder: "*****",
  },
];
const productFields = [
  {
    label: "product",
    title: "Product",
    type: "text",
    placeholder: "Camera",
  },
];

export { navLinks, registerFields, productFields };
