import Featured from '@/components/client/Featured'
import Header from '@/components/client/Header'
import NewProducts from '@/components/client/NewProducts'

const HomePage = () => {
  return (
    <div className='bg-gray-200'>
      <Header />
      <Featured />
      <NewProducts />
    </div>
  )
}

export default HomePage