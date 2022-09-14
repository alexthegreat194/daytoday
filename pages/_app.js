import '../styles/globals.css'
import Navbar from '../components/Navbar'
import { Toaster } from 'react-hot-toast'
import React, { useEffect, useState } from 'react'
import cookieCutter, { get } from 'cookie-cutter'
import axios from 'axios'

export const TokenContext = React.createContext(null);

function MyApp({ Component, pageProps }) {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = get('token')
    if (token) {
      setToken(token)
    }
  }, [])

  return (
    <>
      <TokenContext.Provider value={[token, setToken]}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </TokenContext.Provider>
    </>
  )
}

export default MyApp
