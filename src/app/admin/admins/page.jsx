'use client'

import Animation from '@/components/Animation'
import DataLayout from '@/components/data-samplers/DataLayout'
import axios from 'axios'
import { useEffect, useState } from 'react'

const AdminsPage = () => {
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const response = await axios.get('/api/admins')
        setAdmins(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    getAdmins()
  }, [])
  
  return (
    <Animation>
      <DataLayout dataProps={{
        pLink: 'admins/new', 
        pTitle: 'Admins', 
        pField: 'Admin', 
        pMapper: admins,
        setMapper: setAdmins
      }} />
    </Animation>
  )
}

export default AdminsPage