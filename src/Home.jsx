import React, { useState, useEffect } from "react"
import axios from "axios"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useSearchParams } from "react-router-dom"

function Home() {
  const [user, setUser] = useState()
  const [eventlist, setEventlist] = useState([])
  const [participant, setParticipant] = useState([])

  const [searchParams, setSearchParams] = useSearchParams()

  async function gettoken() {
    var data = {
      grant_type: "authorization_code",
      // code: `5WZ3UnK2sqJeuF41w9zaLiMp5vNvvDUbvggBRC_XE5I`,
      code: `${searchParams.get("code")}`,
      redirect_uri: "http://localhost:3000/",
    };

    var config = {
      method: "post",
      url: "https://auth.calendly.com/oauth/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        Authorization:
          "Basic mk14IwiNvtWMCQ5a6daDJQeI1TfUave09wf6u0A68F0:lRdd_Pe6grEPb9uFVwzUjnts0qdnCxKzqEYeBOf3cbI",
        // "Access-Control-Allow-Methods": "post",
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  console.log(searchParams.get("code"))
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

      setParticipant((prev) => [...prev, res.data])
    })

    console.log(organization.data)
  }

  useEffect(() => {
    gettoken()
  }, [])

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
                {event.location.join_url && (
                  <Button href={event.location.join_url} size="small">
                    Join
                  </Button>
                )}
              </CardActions>
            </Card>
          ))
        : ""}
    </div>
  )
}

export default Home
