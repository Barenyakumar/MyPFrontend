import React from 'react'
import { Navigate, useRoutes } from "react-router-dom"
import Home from './Home'

import Oath from './oath'

export default function App() {


  function AppRoutes() {
    const routes = useRoutes([
      {
        path: "/connect",
        element: (
          <Oath/>
        ),
      },
      {
        path: "/",
        element: (
          <Home />
        )
      }
     
    ])
    return routes
  }
  
  // const {code} = 

  
  return (
      <AppRoutes />
  )
}
