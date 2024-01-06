import React from 'react'

import AdminLayout from '@/layout/AdminLayout'
import BookListAdmin from '@/components/book/BookListAdmin'

type Props = {}

export default function index({}: Props) {
  return (
    <AdminLayout>
        <BookListAdmin/>
    </AdminLayout>
  )
}