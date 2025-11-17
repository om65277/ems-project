import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { axiosClient } from '../utils/axiosClient'
import EmpCard from './EmpCard'

const AllEmployeePage = () => {

  const [emps, setEmps] = useState([])

  const fecthAllEmployees = async () => {
    try {
      const response = await axiosClient.get('/all-emp', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      })
      const data = await response.data
      setEmps(data)

    } catch (error) {
      toast.error(error.response?.data?.error || error.message)
    }
  }

  useEffect(() => {
    fecthAllEmployees()
  }, [])

  const deleteEmp = async (id) => {
    try {
      const response = await axiosClient.delete('/emp/' + id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      })

      const data = await response.data

      await fecthAllEmployees()

      toast.dismiss()
      toast.success(data.message)

    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
    }
  }

  return (
    <>
      <table className="border w-full table-auto bg-blue-50 py-10">

        {/* FIX: Move table header inside <thead> */}
        <thead>
          <tr>
            <th className="py-5 border-r border-b">ID</th>
            <th className="py-5 border-r border-b">Name</th>
            <th className="py-5 border-r border-b">Email</th>
            <th className="py-5 border-r border-b">Image</th>
            <th className="py-5 border-r border-b">Actions</th>
          </tr>
        </thead>

        <tbody>
          {emps && emps.length > 0 ? (
            emps.map((cur, i) => (
              <EmpCard key={i} data={cur} onDelete={deleteEmp} />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-5 text-gray-600">
                No Employees Found
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </>
  )
}

export default AllEmployeePage
