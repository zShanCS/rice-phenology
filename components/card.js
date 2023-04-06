import React from 'react'
import {BsFire} from 'react-icons/bs'
import {BiTimeFive} from 'react-icons/bi'
import {MdDone} from 'react-icons/md'
import {WiHail} from 'react-icons/wi/'

export default function Card({title, number, icon}) {
  return (
<div className="bg-black bg-opacity-50 rounded-lg shadow-xl text-white font-sans py-10 px-5 mb-6 mt-5  w-full">
    <div className='flex w-full justify-between'>
        <p className='font-bold text-lg'>{title}</p>
        {icon &&
        <div className='bg-white bg-opacity-30 flex justify-center items-center p-1 rounded-md'>
        {icon === 'fire' && <BsFire className="text-xl text-blue-500" />}
        {icon === 'time' && <BiTimeFive className="text-xl text-yellow-400" />}
        {icon === 'done' && <MdDone className="text-xl text-green-400" />}
        {icon === 'ppt' && <WiHail className="text-xl text-green-400" />}
        </div>
        }
    </div>
    <div>
        <p className="text-xl font-bold">{number}</p>
    </div>
</div>

  )
}
