import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { axiosClient } from '../utils/axiosClient'
import ScreenLoaderComponent from '../components/ScreenLoaderComponent'
import { useDispatch } from "react-redux"
import { removeUser, setUser } from "../redux/slice/auth.slice"
import { useNavigate } from 'react-router-dom'

const mainContext = createContext()
export const useMainContext = () => useContext(mainContext)

export const MainContextProvider = ({ children }) => {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () =>{
    localStorage.removeItem("token")
    navigate("/login")
    dispatch(removeUser())
    toast.success("Logout Successfully")
  }


  const fetchUserProfile = async () => {
    try {
      
      const token = localStorage.getItem("token") || ''
      if (!token) return setLoading(false)

      const response = await axiosClient.get('/profile', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })

      const data = response.data
      dispatch(setUser(data))

    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  if (loading) {
    return <ScreenLoaderComponent />
  }

  return (
    <mainContext.Provider value={{ fetchUserProfile,logoutHandler }}>
      {children}
    </mainContext.Provider>
  )
}
