import Link from 'next/link'
import React from 'react'

const Products = () => {
  return (
    <div>
      <Link href={'products/new'} className="app-btn">
        Add Products
      </Link>
    </div>
  )
}

export default Products