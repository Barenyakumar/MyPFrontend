import React,{useEffect} from 'react'
import axios from 'axios'
import { Button } from '@mui/material'

export default function Oath() {
  
  // const getToken = async() => {
    
  //   const authcode = await axios.get('https://auth.calendly.com/oauth/authorize?client_id=mk14IwiNvtWMCQ5a6daDJQeI1TfUave09wf6u0A68F0&response_type=code&redirect_uri=https://www.myparticipants.com/')

  //   console.log(authcode.data)
  // } 
  // useEffect(() => {
  //   getToken()
    
  // }, [])
  

  return (
    <Button
      href="https://auth.calendly.com/oauth/authorize?client_id=mk14IwiNvtWMCQ5a6daDJQeI1TfUave09wf6u0A68F0&response_type=code&redirect_uri=http://localhost:3000/&code_challenge_method=S256&code_challenge=CODE_CHALLENGE"
    >
      Connect
    </Button>
  )
}

