import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { HiRefresh } from 'react-icons/hi'
import CustomLoaderbtn from '../components/CustomLoaderbtn'
import { Link, useNavigate } from 'react-router-dom' // <-- Added useNavigate
import { axiosClient } from '../utils/axiosClient'
import { useMainContext } from "../context/mainContext";

const RegisterPage = () => {
  const [isShow, setIsShow] = useState(false)
  const [captcha, setCaptcha] = useState(" ")
  const [captchaAnswer, setCaptchaAnswer] = useState(0)
  const [loading, setLoading] = useState(false)

  const { fetchUserProfile } = useMainContext()
  const navigate = useNavigate() // <-- initialize navigate

  const initialValues = {
    name: '',
    email: '',
    password: '',
    captcha: '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Email must be valid").required("Email is required"),
    password: Yup.string().required("Password is required"),
    captcha: Yup.string().required("Captcha is required"),
  })

  const onSubmitHandler = async (values, helpers) => {
    try {
      setLoading(true)

      // validate captcha
      if (parseInt(values.captcha) !== captchaAnswer) {
        toast.error("Enter Valid Captcha")
        return
      }

      const sendValues = {
        name: values.name,
        email: values.email,
        password: values.password
      }

      const response = await axiosClient.post('/register', sendValues)
      const data = await response.data

      // save token
      localStorage.setItem("token", data.token)
      toast.success(response.data.message)

      // fetch profile
      await fetchUserProfile()

      // redirect to dashboard or home
      navigate("/dashboard") // <-- Added redirect

      // reset form & captcha
      helpers.resetForm()
      generateCaptcha()
      
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
    } finally {
      setLoading(false)
    }
  }

  const CaptchaOperators = ['+', '-', '*', '/']

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10)
    const num2 = Math.floor(Math.random() * 10)
    const operator = CaptchaOperators[Math.floor(Math.random() * CaptchaOperators.length)]
    const str = `${num1} ${operator} ${num2}`
    setCaptcha(str)

    let answer = 0
    switch (operator) {
      case '+': answer = num1 + num2; break
      case '-': answer = num1 - num2; break
      case '*': answer = num1 * num2; break
      case '/': answer = num2 !== 0 ? Math.floor(num1 / num2) : 0; break
      default: answer = 0
    }
    setCaptchaAnswer(answer)
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  return (
    <div className='min-h-screen flex items-center justify-center flex-col py-10'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className='w-[98%] md:w-1/2 lg:w-1/3 border-3 py-10 px-4 rounded border-gray-400'>
            <div className='mb-3'>
              <label htmlFor="name">Name</label>
              <Field
                name="name"
                type="text"
                className="w-full py-2 border border-gray-500 rounded px-3 placeholder:font-medium outline-none"
                placeholder='Enter Your Name'
              />
              <ErrorMessage name='name' className='text-red-500 text-xs' component='p' />
            </div>

            <div className='mb-3'>
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="email"
                className="w-full py-2 border border-gray-500 rounded px-3 placeholder:font-medium outline-none"
                placeholder='Enter Your Email'
              />
              <ErrorMessage name='email' className='text-red-500 text-xs' component='p' />
            </div>

            <div className='mb-3'>
              <label htmlFor="password">Password</label>
              <div className='flex w-full border rounded border-gray-500 items-center justify-between px-4'>
                <Field
                  name="password"
                  type={isShow ? "text" : "password"}
                  className="w-full py-2 placeholder:font-medium outline-none"
                  placeholder='Enter Your Password'
                />
                <button type='button' onClick={() => setIsShow(!isShow)}>
                  {isShow ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <ErrorMessage name='password' className='text-red-500 text-xs' component='p' />
            </div>

            <div className="mb-3 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <p className='text-center w-1/2 font-bold text-lg'>{captcha}</p>
                <button onClick={generateCaptcha} className='text-center w-1/2' type='button'>
                  <HiRefresh />
                </button>
              </div>
              <Field
                placeholder="Enter captcha"
                name="captcha"
                className='w-full py-2 border border-gray-500 rounded px-3 placeholder:font-medium outline-none font-bold'
              />
              <ErrorMessage name='captcha' className='text-red-500 text-xs' component='p' />
            </div>

            <div className='mb-3'>
              <CustomLoaderbtn type='submit' isLoading={loading} text='Register' />
            </div>

            <div className='mb-3'>
              <p className='text-end'>
                Already have an account? <Link to={'/login'} className='font-bold text-indigo-500'>Login</Link>
              </p>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  )
}

export default RegisterPage
