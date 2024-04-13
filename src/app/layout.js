export const metadata = {
  title: "Ecommerce",
  description: "Bootcamp final project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
