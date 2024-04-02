export const metadata = {
  title: "Ecommerce-Admin",
  description: "Bootcamp final project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-slate-400 h-screen flex overflow-hidden">
          <div className="bg-slate-200 flex-grow my-4 mr-4 rounded-lg p-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
