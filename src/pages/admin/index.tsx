
import Link from 'next/link';




//import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import AdminLayout from '@/layout/AdminLayout';
import BooksDashboard from '@/components/admin/BooksDashboard';





export default function admin() {


  return (

    <AdminLayout>
      <div>
        <BooksDashboard/>

      </div>

    </AdminLayout>

  )
}
