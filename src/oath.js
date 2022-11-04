import React,{useEffect} from 'react'
import axios from 'axios'

export default function Oath() {
  
  const getToken = async() => {
    
    const authcode = await axios.get('https://auth.calendly.com/oauth/authorize?client_id=mk14IwiNvtWMCQ5a6daDJQeI1TfUave09wf6u0A68F0&response_type=code&redirect_uri=https://www.myparticipants.com/')

    console.log(authcode.data)
  } 
  useEffect(() => {
    getToken()
    
  }, [])
  

  return (
    <div>oath</div>
  )
}
