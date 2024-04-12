'use client'

import Animation from '@/components/Animation'
import React from 'react'
import { useAdminStore } from '@/store/adminStore'

const AdminPage = () => {
  const { adminData } = useAdminStore()

  return (
    <Animation>
      Welcome {adminData.name} your email is {adminData.email}
    </Animation>
  )
}

export default AdminPage