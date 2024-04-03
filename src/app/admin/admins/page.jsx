'use client'

import DataLayout from '@/components/DataLayout'
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
    <>
      <DataLayout dataProps={{
        pLink: 'admins/new', 
        pTitle: 'Admins', 
        pField: 'Admin', 
        pMapper: admins,
        setField: setAdmins
      }} />
    </>
  )
}

export default AdminsPage