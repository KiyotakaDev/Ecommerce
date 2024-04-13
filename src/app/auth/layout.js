import './auth.css'

export const metadata = {
  title: 'Admin',
  description: 'Admin authentication',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
