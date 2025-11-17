import React from 'react'

export default function Footer() {
  return (
    <div className='py-10 bg-gray-200 text-center'>
      <p className='text-center'>Made by omnadarkar@<span>{new Date().getFullYear()}</span></p>
    </div>
  )
}
