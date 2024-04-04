'use client'

import DataLayout from '@/components/DataLayout'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get('/api/products')
        setProducts(response.data)
      } catch (error) {
        console.log(error.message);
      }
    }
    getProducts()
  }, [])
  
  return (
    <>
      <DataLayout dataProps={{
        pLink: 'products/new', 
        pTitle: 'Products', 
        pField: 'Product', 
        pMapper: products,
        setMapper: setProducts
      }} />
    </>
  )
}

export default Products