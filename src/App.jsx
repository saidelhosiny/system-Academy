import React from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './component/layout/Layout'
import Front from './component/Front/Front'
import Back from './component/Back/Back'
import toast, { Toaster } from 'react-hot-toast';

export default function App() {

 let router = createHashRouter([{
    path:"/",element:<Layout/>,children:[
      {path:"front",element:<Front/>},
      {path:"back",element:<Back/>},
    ]
  }])
  return <>
    <RouterProvider router={router}/>
    <Toaster />
  </> 
}
