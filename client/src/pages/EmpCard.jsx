import React from 'react'
import { Link } from 'react-router-dom'


const EmpCard = ({data, onDelete}) => {



  return (
    <>
        <tr>
            <td className='py-3 px-2 border-b text-center border-r font-bold'>{data.empId}</td>
            <td className='py-3 px-2 border-b text-center border-r'>{data.name}</td>
            <td className='py-3 px-2 border-b text-center border-r'>{data.email}</td>
            <td className="py-3 px-2 border-b border-r">
                <div className="flex justify-center items-center">
                    <img src={data.image} className="w-24 h-24 rounded-full object-cover" alt="" />
                </div>
        </td>
            <td className='text-center border-b'>
                <button onClick={()=>onDelete(data._id)} className='px-4 py-2 mx-2 bg-red-500 text-white rounded'>Delete</button>
                <Link to={'/update-employee/'+data._id} className='px-4 py-2 mx-2 bg-green-500 text-white rounded'>Edit</Link>
            </td>
        </tr>
    </>
  )
}

export default EmpCard

