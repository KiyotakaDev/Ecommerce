'use client'

import Link from 'next/link'
import { useCartContext } from './CartProvider'

const Header = () => {
  const { cartProducts } = useCartContext()

  return (
    <header className='bg-zinc-900 text-2xl'>
      <div className='wrapper flex justify-between py-6'>
        <Link href={'/'} className='text-white'>Ecommerce</Link>
        <nav className='text-zinc-300 flex gap-6'>
          <Link href={'/'}>Home</Link>
          <Link href={'/products'}>All products</Link>
          <Link href={'/categories'}>Categories</Link>
          <Link href={'/account'}>Account</Link>
          <Link href={'/cart'}>Cart ({cartProducts.length})</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header