import React, { useEffect, useState } from 'react'
import Header from './Header'

import { NavLink } from 'react-router-dom'
import { IoAdd, IoPause, IoPlay, IoTrash } from 'react-icons/io5'
import { AiOutlineClear } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { getAllSongs } from '../api'
import SongCard from './SongCard'
import DashboardSongs from './DashboardSongs'

const Home = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-gray-800 text-red-400'>
      {/* color change */}
      <Header />
      <DashboardSongs />
    </div>
  )
}



export default Home



