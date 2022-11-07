import React from 'react'
import { motion } from 'framer-motion'
import { IoAdd, IoPause, IoPlay, IoTrash } from 'react-icons/io5'
import { useState } from 'react'

const SongCard = ({ data, index }) => {
  const [isDelete, setIsDelete] = useState(true)
  return (
    <motion.div className='relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-gray-700 bg-gray-600 shadow-md rounded-lg flex flex-col items-center '>
      <motion.div className='w-40 min-w-[160px] min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden'>
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.imageURL}
          className='w-full h-full rounded-lg object-cover'
        />
      </motion.div>

      <p className='font-semibold my-2 text-center'>
        {data.name.length > 25 ? `${data.name.slice(0, 25)}...` : data.name}

        {data.artist && (
          <span className='block text-sm text-gray-400 my-1'>
            {data.artist.length > 25
              ? `${data.artist.slice(0, 25)}...`
              : data.artist}
          </span>
        )}
      </p>

      <div className='w-full absolute bottom-2 right-2 flex items-center justify-between px-4'>
        <motion.i
          whileTap={{ scale: 0.75 }}
          className='text-base text-red-400 drop-shadow-md hover:text-red-500'
        >
          <IoTrash />
        </motion.i>
      </div>
    </motion.div>
  )
}

export default SongCard
