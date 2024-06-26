import "./admin.css";
import Nav from "@/components/admin/Nav";

export const metadata = {
  title: "Ecommerce-Admin",
  description: "Bootcamp final project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-violet-50 h-screen flex overflow-hidden">
          <Nav />
          <div className="bg-white flex-grow my-4 mr-4 rounded-lg p-12">
            <div className="h-full p-4 overflow-y-scroll">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
