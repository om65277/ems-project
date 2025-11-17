import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AuthSlicePath } from '../redux/slice/auth.slice'
import { FaUser, FaUsers } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
import clsx from 'clsx'

const SidebarItemList = [
  { name: 'Dashboard', link: '/dashboard', Icon: MdDashboard },
  { name: 'Add Employee', link: '/add-employee', Icon: FaUser },
  { name: 'All Employee', link: '/all-employee', Icon: FaUsers }
]

const ProtectedLayout = () => {
  const user = useSelector(AuthSlicePath)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    } else {
      setLoading(false)
    }
  }, [user, navigate])

  if (loading) return <div>Loading...</div>

  return (
    <>
      <div className='flex w-[90%] mx-auto flex-col lg:flex-row py-10 gap-x-1 items-start gap-y-6 '>

        {/* Desktop Sidebar */}
        <div className="w-1/4 hidden lg:flex flex-col min-h-[70vh] bg-gray-200 py-4 font-bold">
          {SidebarItemList.map((cur, i) => (
            <SidebarMenuItem item={cur} key={i} />
          ))}
        </div>

        {/* Mobile Menu */}
        <ul className="flex lg:hidden items-center">
          {SidebarItemList.map((cur, i) => (
            <li
              key={i}
              className={clsx(
                'bg-gray-200 px-5 py-2 text-xs font-medium hover:bg-gray-300',
                cur.link === pathname && "bg-gray-300"
              )}
            >
              <Link to={cur.link} className='flex items-center gap-x-1'><cur.Icon className='text-lg' /><span>{cur.name?.split(" ")}</span></Link>
            </li>
          ))}
        </ul>

        {/* Main Content */}
        <section className='w-full'>
          <Outlet />
        </section>

      </div>
    </>
  )
}

export default ProtectedLayout

// Sidebar Component
const SidebarMenuItem = ({ item }) => {
  const { pathname } = useLocation()

  return (
    <Link
      to={item.link}
      className={clsx(
        'w-full py-3 px-3 flex justify-start gap-x-3 items-center hover:bg-gray-300',
        item.link === pathname && "bg-gray-300"
      )}
    >
      <item.Icon className='text-2xl text-blue-600' />
      <span>{item.name}</span>
    </Link>
  )
}
