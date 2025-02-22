import { createBrowserRouter } from "react-router-dom";
// import ErrorPage from "../Pages/ErrorPage";

import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../Layout/MainLayout";
import Login from "../pages/Login"
import Home from "../pages/Home";
import AddTask from "../pages/AddTask";
import PrivateRoute from "./PrivateRoute";
import TaskManagement from "../pages/TaskManagement";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";

const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage></ErrorPage>,
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: '/',
          element: <Login></Login>
        },
        {
          path: "/home",
          element:<PrivateRoute><Home></Home></PrivateRoute>,   
        },
        
        {
          path: "/about",
          element:<PrivateRoute><AboutUs></AboutUs></PrivateRoute>,   
        },
        {
          path: "/contact",
          element:<PrivateRoute><Contact></Contact></PrivateRoute>,  
        },
        {
            path: "/addTask",
            element:<PrivateRoute><AddTask></AddTask> </PrivateRoute>,  
          },
          {
            path: "/allTask",
             element:<PrivateRoute><TaskManagement></TaskManagement> </PrivateRoute>,   
          },

      
        // {
        //   path: 'signup',
        //   element: <SignUp></SignUp>
        // },
      ]
    },

  
   
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionStatusRevalidation: true
    },
  }
);

  export default router;