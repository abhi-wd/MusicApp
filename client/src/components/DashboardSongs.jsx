import React, { useState } from 'react'
import { useEffect } from 'react'

import { NavLink } from 'react-router-dom'
import { IoAdd, IoPause, IoPlay, IoTrash } from 'react-icons/io5'
import { AiOutlineClear } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { getAllSongs } from '../api'
import SongCard from './SongCard'

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState('')
  const [isFocus, setIsFocus] = useState(false)

  const [{ allSongs }, dispatch] = useStateValue()

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then(data => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song
        })
      })
    }
  }, [])

  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      <div className='w-full flex justify-center items-center gap-20'>
        <NavLink
          to='/dashboard/newSong'
          className='lex items-center justify-center bg-gray-800 px-4 py-3 border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer'
        >
          <motion.div whileTap={{ scale: 0.75 }} onClick=''>
            <IoAdd className='text-2xl text-red-500 hover:text-red-600' />
          </motion.div>
        </NavLink>

        <input
          type='text'
          className={`w-52 px-4 py-2 border ${
            isFocus ? 'border-gray-500 shadow-md' : 'border-gray-300'
          } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base font-semibold`}
          placeholder='Search...'
          value={songFilter}
          onChange={e => setSongFilter(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />

        <i>
          <AiOutlineClear className='text-3xl text-red-500 hover:text-red-600 cursor-pointer' />
        </i>
      </div>

      {/* songs container */}

      <div className='relative w-full min-h-[480px] my-4 p-4 py-16 border bg-gray-600 border-gray-800 rounded-md'>
        {/* count */}

        <div className='absolute top-4 left-4'>
          <p className='text-l font-semibold'>
            Count{' : '}
            <span className='text-l font-bold text-white'>
              {allSongs?.length}
            </span>
          </p>
        </div>

        {/* song container */}
        <SongContainer data={allSongs} />
      </div>
    </div>
  )
}

export const SongContainer = ({ data }) => {
  return (
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
      {data &&
        data.map((song, i) => (
          <SongCard key={song._id} data={song} index={i} type="song" />
        ))}
    </div>
  )
}

export default DashboardSongs
