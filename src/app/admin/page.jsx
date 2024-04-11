'use client'

import Animation from '@/components/admin/Animation'
import React from 'react'
import { useDataStore } from '@/store/dataStore'

const AdminPage = () => {
  const { link } = useDataStore()

  return (
    <Animation>
      {link}
    </Animation>
  )
}

export default AdminPage