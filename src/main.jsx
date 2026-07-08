import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Home.jsx'
import MovieCard from './MovieCard.jsx'
import MovieDetails from './MovieDetails.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom"

import App from './App.jsx'
import Favorites from './Favorites.jsx'

const router=createBrowserRouter([

  {
    path:"/",
    element:<App></App>
  },
  {
    path:"/details/:id",
    element:<MovieDetails></MovieDetails>

  },
  {
    path:"/My-movie-journal",
    element:<Favorites></Favorites>
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}></RouterProvider>
   
  </StrictMode>,
)
