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
import SearchBar from './SearchBar'
import Filter from "./Filter";

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState('')
  const [isFocus, setIsFocus] = useState(false)

  const [
    {
      searchTerm,
      allSongs,
      artistFilter,
      filterTerm,
      albumFilter,
      languageFilter,
    },
    dispatch,
  ] = useStateValue();

  const [filteredSongs, setFilteredSongs] = useState(null);


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

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = allSongs.filter(
        (data) =>
          data.artist.toLowerCase().includes(searchTerm) ||
          data.language.toLowerCase().includes(searchTerm) ||
          data.name.toLowerCase().includes(searchTerm) ||
          data.artist.includes(artistFilter)
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.artist === artistFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [artistFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.category.toLowerCase() === filterTerm
    );
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [filterTerm]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.album === albumFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [albumFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.language === languageFilter
    );
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [languageFilter]);


  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>

      {/* chnage */}
      <SearchBar />

      {searchTerm.length > 0 && (
        <p className="my-4 text-base text-white">
          Searched for :
          <span className="text-xl text-red-400 font-semibold">
            {searchTerm}
          </span>
        </p>
      )}

      <Filter setFilteredSongs={setFilteredSongs} />

      {/* change */}

      <div className='w-full flex justify-center items-center gap-20'>
        <NavLink
          to='/dashboard/newSong'
          className='flex items-center justify-center bg-gray-800 px-4 py-3 border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer'
        >
          <motion.div whileTap={{ scale: 0.75 }} onClick=''>
            <IoAdd className='text-2xl text-red-500 hover:text-red-600' />
          </motion.div>
        </NavLink>
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
        <SongContainer data={filteredSongs ? filteredSongs : allSongs} />
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
