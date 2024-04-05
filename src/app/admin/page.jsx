'use client'

import Animation from '@/components/Animation'
import React from 'react'
import { useDataStore } from '@/store/store'

const AdminPage = () => {
  const { link } = useDataStore()

  return (
    <Animation>
      {link}
    </Animation>
  )
}

export default AdminPage