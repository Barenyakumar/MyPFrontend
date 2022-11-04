import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
)

export default function App() {
  const [user, setUser] = useState()
  const [eventlist, setEventlist] = useState([])
  const [participant, setParticipant] = useState([])
  
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjY3MjIzMzg2LCJqdGkiOiIyZWM1ZWE2Yy03OWUxLTRlNGQtOTllYi1kZmI2MmQ2MDU3MWMiLCJ1c2VyX3V1aWQiOiIzNDI3ZjBmZS0wMjk3LTRjNjAtYmEzYy01MDE1NmIxMGZmOGEifQ.gkwi55WgCmABL4hefYItc_CmpC043rRBc0nAV6lcePF9oA5DmHkSVmEubloReAECHPKpgvrUIiGjkO9AWb2wFg",
    },
  }
  async function getuser() {
    const res = await axios.get("https://api.calendly.com/users/me", options)
    // console.log(res.data);

    setUser({
      uri: res.data.resource.uri,
      organization: res.data.resource.current_organization,
    })

    const organization = await axios.get(
      `https://api.calendly.com/scheduled_events?organization=${res.data.resource.current_organization}&user=${res.data.resource.uri}`,
      options
    )

    setEventlist(organization.data.collection)

    organization.data.collection.forEach(async (event) => {
      const res = await axios.get(`${event.uri}/invitees`, options)
      
      setParticipant(prev=> [...prev, res.data])
      })

    console.log(organization.data)
  }
  
  useEffect(() => {
    getuser()
  },[])


  // async function getinvitee(url) {
  //   const res = await axios.get(`${url}/invitee/`, options);
  //   return res.data;
  // }



  
  const getToken = async () => {
    const authcode = await axios.get(
      "https://auth.calendly.com/oauth/authorize?client_id=mk14IwiNvtWMCQ5a6daDJQeI1TfUave09wf6u0A68F0&response_type=code&redirect_uri=https://www.myparticipants.com/",
      {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        },
        withCredentials: true,
        credentials: "same-origin",
      }
    )

    console.log(authcode.data)
  }
  useEffect(() => {
    getToken()
  }, [])



  // const arr = [1, 2, 3, 4]
  // const getData = arr.map(map => {
  //   getuser();
  //   return (
  //     <li>hi</li>
  //   )
  // })

  
  return (
    <div>
      {participant && eventlist && user
        ? eventlist.map((event, i) => (
            <Card sx={{ minWidth: 275 }} key={i}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {event.name}
                </Typography>
                <Typography variant="h5" component="div">
                  {console.log(participant)}

                  {participant[i]?.collection[0].name}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {participant[i]?.collection[0].email}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {new Date(event.start_time).toString().substring(0, 25)}
                </Typography>
                <Typography variant="body2"></Typography>
              </CardContent>
              <CardActions>
                {event.location.join_url
                &&<Button href={event.location.join_url} size="small">
                  Join
                </Button>}
              </CardActions>
            </Card>
          ))
        : ""}
    </div>
  )
}
