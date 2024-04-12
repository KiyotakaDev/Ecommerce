import Featured from '@/components/client/Featured'
import NewProducts from '@/components/client/NewProducts'

const HomePage = () => {
  return (
    <div className='bg-gray-200'>
      <Featured />
      <NewProducts />
    </div>
  )
}

export default HomePage