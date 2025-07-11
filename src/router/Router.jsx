import { createBrowserRouter } from "react-router";
import RootLayout from "../mainlayout/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import DashboardLayout from "../pages/dashboardlayout/DashboardLayout";
import AddProperty from "../pages/agentPage/addProperty/AddProperty";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "add-property",
        element: <AddProperty></AddProperty>,
      },
    ],
  },
]);

export default router;
