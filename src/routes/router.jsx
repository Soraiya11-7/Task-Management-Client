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
          path: "/",
          element:<Home></Home>,   
        },
        {
          path: "/about",
          element:<AboutUs></AboutUs>,   
        },
        {
          path: "/contact",
          element:<Contact></Contact>,  
        },
        {
            path: "/add-task",
            element:<PrivateRoute><AddTask></AddTask> </PrivateRoute>,  
          },
          {
            path: "/all-tasks",
             element:<PrivateRoute><TaskManagement></TaskManagement> </PrivateRoute>,   
          },

        {
          path: 'login',
          element: <Login></Login>
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