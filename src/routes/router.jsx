import { createBrowserRouter } from "react-router-dom";
// import ErrorPage from "../Pages/ErrorPage";

import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import AddTask from "../pages/AddTask";
import AllTasks from "../pages/AllTasks";

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
            path: "/add-task",
            element:<AddTask></AddTask>,   
          },
          {
            path: "/all-tasks",
            element:<AllTasks></AllTasks>,   
          },

        // {
        //   path: 'login',
        //   element: <Login></Login>
        // },
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