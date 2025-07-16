import { createBrowserRouter } from "react-router";
import RootLayout from "../mainlayout/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import DashboardLayout from "../pages/dashboardlayout/DashboardLayout";
import AddProperty from "../pages/agentPage/addProperty/AddProperty";
import ManageUsers from "../pages/adminpage/manageusers/ManageUsers";
import ManageProperties from "../pages/adminpage/manageproperties/ManageProperties";
import AllProperties from "../pages/allproperties/AllProperties";
import PropertyDetails from "../pages/propertydetails/PropertyDetails";
import Wishlist from "../pages/userpage/wishlist/Wishlist";
import MakeOffer from "../pages/userpage/makeoffer/MakeOffer";
import MyProperties from "../pages/agentPage/myproperties/MyProperties";
import UpdateProperty from "../pages/agentPage/updateproperty/UpdateProperty";
import MyReviews from "../pages/userpage/myreviews/MyReviews";
import PropertyBought from "../pages/userpage/propertybought/PropertyBought";
import RequestedProperties from "../pages/agentPage/requestedproperty/RequestedProperties";
import Payment from "../pages/userpage/payment/Payment";
import SoldProperties from "../pages/agentPage/soldProperties/SoldProperties";
import ManageReviews from "../pages/adminpage/managereviews/ManageReviews";
import AdvertiseProperties from "../pages/adminpage/advertiseproperties/AdvertiseProperties";

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
      {
        path: "all-properties",
        element: <AllProperties></AllProperties>,
      },
      {
        path: "property-details/:id",
        element: <PropertyDetails></PropertyDetails>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      // Agent Routes
      {
        path: "add-property",
        element: <AddProperty></AddProperty>,
      },
      {
        path: "my-properties",
        element: <MyProperties></MyProperties>,
      },
      {
        path: "update-property/:id",
        element: <UpdateProperty></UpdateProperty>,
      },
      {
        path: "sold-properties",
        element: <SoldProperties></SoldProperties>,
      },
      {
        path: "requested-properties",
        element: <RequestedProperties></RequestedProperties>,
      },
      // Admin Routes
      {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "manage-properties",
        element: <ManageProperties></ManageProperties>,
      },
      {
        path: "manage-reviews",
        element: <ManageReviews></ManageReviews>,
      },
      {
        path: "advertise-properties",
        element: <AdvertiseProperties></AdvertiseProperties>,
      },
      // User Routes
      {
        path: "wishlist",
        element: <Wishlist></Wishlist>,
      },
      {
        path: "wishlist/make-offer/:id",
        element: <MakeOffer></MakeOffer>,
      },
      {
        path: "my-reviews",
        element: <MyReviews></MyReviews>,
      },
      {
        path: "bought-properties",
        element: <PropertyBought></PropertyBought>,
      },
      {
        path: "payment/:offerId",
        element: <Payment></Payment>,
      },
    ],
  },
]);

export default router;
