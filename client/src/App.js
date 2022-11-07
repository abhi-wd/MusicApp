import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Login, Dashboard } from './components'
import { app } from './config/firebase.config';
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion'
import { validateUser } from './api'
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';



const App = () => {

    const firebaseAuth = getAuth(app);
    const navigate = useNavigate();

    const [{ user }, dispatch] = useStateValue();


    const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true")


    useEffect(() => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if (userCred) {
                userCred.getIdToken().then((token) => {
                    // console.log(token);
                    validateUser(token).then((data) => {
                        dispatch({
                            type: actionType.SET_USER,
                            user: data,
                        })
                    });
                })
            } else {
                setAuth(false);
                window.localStorage.setItem("auth", "false");
                dispatch({
                    type: actionType.SET_USER,
                    user: null,
                })
                navigate("/login");
            }
        })
    }, [])




    return (
        <AnimatePresence mode='wait'>

            <div className='min-w-[600px] h-auto bg-slate-700 text-red-400 flex justify-center items-center'>
                <Routes>
                    <Route path='/login' element={<Login setAuth={setAuth} />} />
                    <Route path='/*' element={<Home />} />
                    <Route path='/dashboard/*' element={<Dashboard />} />

                </Routes>
            </div>

        </AnimatePresence>
    )
}

export default App
