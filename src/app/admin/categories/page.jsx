import Animation from '@/components/Animation'
import FormLayout from '@/components/form/FormLayout'
import { addCategoryFields } from '@/constants'
import React from 'react'

const CategoriesPage = () => {
  return (
    <Animation>
      <FormLayout
        formProps={{
          id: "categories",
          pTitle: "Categories",
          pMapper: addCategoryFields,
        }}
      />
      <table>
        <thead>
          <tr>
            <td>Category name</td>
          </tr>
        </thead>
      </table>
    </Animation>
  )
}

export default CategoriesPage