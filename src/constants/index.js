import { ArchiveBoxIcon, HomeIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const navLinks = [
  { name: "Dashboard", to: "/admin", icon: HomeIcon },
  { name: "Products", to: "/admin/products", icon: ArchiveBoxIcon },
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
    html: "input",
    type: "text",
    label: "product",
    title: "Product",
    placeholder: "e.g.camera",
  },
  {
    html: "input",
    type: "file",
    label: "image",
    title: "Images",
    placeholder: "",
  },
  {
    html: "textarea",
    type: "text",
    label: "description",
    title: "Description",
    placeholder: "e.g.camera",
  },
  {
    html: "input",
    type: "number",
    label: "price",
    title: "Price (Cents)",
    placeholder: "0",
  },
];

export { navLinks, registerFields, productFields };
