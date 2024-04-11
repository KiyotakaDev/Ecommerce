import Link from 'next/link'

const Header = () => {
  return (
    <header className='bg-zinc-900 text-2xl'>
      <div className='wrapper flex justify-between py-6'>
        <Link href={'/'} className='text-white'>Ecommerce</Link>
        <nav className='text-zinc-300 flex gap-6'>
          <Link href={'/'}>Home</Link>
          <Link href={'/products'}>All products</Link>
          <Link href={'/categories'}>Categories</Link>
          <Link href={'/account'}>Account</Link>
          <Link href={'/cart'}>Cart (0)</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header