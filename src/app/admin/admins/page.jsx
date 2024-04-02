import Link from 'next/link'

const AdminsPage = () => {
  return (
    <div>
      <Link href="admins/new" className='app-btn'>
        Add admin
      </Link>
    </div>
  )
}

export default AdminsPage