'use client'

import Animation from '@/components/Animation'
import DataLayout from '@/components/data-samplers/DataLayout'
import axios from 'axios'
import { useEffect } from 'react'
import { useDataStore } from '@/store/store'

const AdminsPage = () => {
  const { setData, setMapper } = useDataStore()

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const response = await axios.get('/api/admins')
        const admins = response.data
        const dataToStore = {
          link: "admins/new",
          field: "Admin"
        }
        setData(dataToStore)
        setMapper(admins)
      } catch (error) {
        console.log(error);
      }
    }
    getAdmins()
  }, [setData])
  
  return (
    <Animation>
      <DataLayout />
    </Animation>
  )
}

export default AdminsPage