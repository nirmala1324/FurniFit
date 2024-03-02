import React from 'react'

export const Deploy = ({prop}) => {
  return (
    <div className='grid h-[200PX] bg-red-600'><h1 className="place-self-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">{prop.flask}</h1></div>
  )
}