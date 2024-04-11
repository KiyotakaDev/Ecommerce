import Link from 'next/link'

const Header = () => {
  return (
    <header>
      <Link href={'/'}>Ecommerce</Link>
      <nav>
        <Link href={'/'}>Home</Link>
        <Link href={'/products'}>All products</Link>
        <Link href={'/categories'}>Categories</Link>
        <Link href={'/account'}>Account</Link>
        <Link href={'/cart'}>Cart (0)</Link>
      </nav>
    </header>
  )
}

export default Header