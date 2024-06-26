import {
  ShoppingBagIcon,
  ArchiveBoxIcon,
  UserGroupIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

const navLinks = [
  { name: "Ecommerce", to: "/ecommerce", icon: ShoppingBagIcon },
  { name: "Products", to: "/admin/products", icon: ArchiveBoxIcon },
  { name: "Categories", to: "/admin/categories", icon: ListBulletIcon },
  { name: "Admins", to: "/admin/admins", icon: UserGroupIcon },
];

const addAdminFields = [
  {
    html: "input",
    label: "username",
    title: "Username",
    type: "text",
    placeholder: "zorg",
  },
  {
    html: "input",
    label: "email",
    title: "Email",
    type: "text",
    placeholder: "email@example.com",
  },
  {
    html: "input",
    label: "password",
    title: "Password",
    type: "password",
    placeholder: "*****",
  },
  {
    html: "input",
    label: "confirm_password",
    title: "Confirm password",
    type: "password",
    placeholder: "*****",
  },
];
const addProductFields = [
  {
    html: "input",
    type: "text",
    label: "product",
    title: "Product",
    placeholder: "e.g.camera",
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
const addCategoryFields = [
  {
    html: "input",
    type: "text",
    label: "category",
    title: "New category",
    placeholder: "Category name",
  },
];

const adminLogin = [
  {
    title: "Username",
    type: "text",
    placeholder: "jsmith",
  },
  {
    title: "Password",
    type: "password",
    placeholder: "****",
  },
];

export {
  navLinks,
  addAdminFields,
  addProductFields,
  addCategoryFields,
  adminLogin,
};
