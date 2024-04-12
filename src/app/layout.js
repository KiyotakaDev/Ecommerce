import { Roboto } from "next/font/google";
import "./globals.css";
import CustomApp from "@/components/client/CustomApp";

const roboto = Roboto({
  weight: "500",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ecommerce",
  description: "Bootcamp final project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <CustomApp>{children}</CustomApp>
      </body>
    </html>
  );
}
