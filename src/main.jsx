import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import Home from './pages/Home.jsx'
import AddPost from './pages/AddPost.jsx'
import Login from './pages/Login.jsx'
import Layout from './Layout.jsx'
import Signup from './pages/Signup.jsx'
import ProtectedRoute from './Utils/ProtectedRoute.jsx'

const router = createBrowserRouter([{
  path:'/',
  element: <Layout/>,
  children:[
    {
      element:<ProtectedRoute/>,
      children:[
        {
          path:'/add-pin',
          element:<AddPost/>
        },
        {
          path:'/',
          element:<Home/>
        }
      ]
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/signup',
      element:<Signup/>
    }
  ]
}])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
