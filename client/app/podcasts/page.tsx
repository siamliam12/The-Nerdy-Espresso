import Image from 'next/image'
import React from 'react'

const Podcast = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image src="/construct-construction.gif" alt="Under construction" width={400} height={200}/>
      <p className="mt-4 text-2xl font-semibold">This page is under construction. Stay tuned!</p>
    </div>
  )
}

export default Podcast