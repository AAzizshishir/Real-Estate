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
import PrivateRoutes from "../routes/PrivateRoutes";
import AdminRoutes from "../routes/AdminRoutes";
import AgentRoutes from "../routes/AgentRoutes";
import PageNotFound from "../pages/pagenotfound/PageNotFound";
import UserProfile from "../pages/userpage/userprofile/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <PageNotFound></PageNotFound>,
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
        element: (
          <PrivateRoutes>
            <AllProperties></AllProperties>
          </PrivateRoutes>
        ),
      },
      {
        path: "property-details/:id",
        element: (
          <PrivateRoutes>
            <PropertyDetails></PropertyDetails>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    children: [
      // Agent Routes
      {
        path: "add-property",
        element: (
          <AgentRoutes>
            <AddProperty></AddProperty>
          </AgentRoutes>
        ),
      },
      {
        path: "my-properties",
        element: (
          <AgentRoutes>
            <MyProperties></MyProperties>
          </AgentRoutes>
        ),
      },
      {
        path: "update-property/:id",
        element: (
          <AgentRoutes>
            <UpdateProperty></UpdateProperty>
          </AgentRoutes>
        ),
      },
      {
        path: "sold-properties",
        element: (
          <AgentRoutes>
            <SoldProperties></SoldProperties>
          </AgentRoutes>
        ),
      },
      {
        path: "requested-properties",
        element: (
          <AgentRoutes>
            <RequestedProperties></RequestedProperties>
          </AgentRoutes>
        ),
      },
      // Admin Routes
      {
        path: "manage-users",
        element: (
          <AdminRoutes>
            <ManageUsers></ManageUsers>
          </AdminRoutes>
        ),
      },
      {
        path: "manage-properties",
        element: (
          <AdminRoutes>
            <ManageProperties></ManageProperties>
          </AdminRoutes>
        ),
      },
      {
        path: "manage-reviews",
        element: (
          <AdminRoutes>
            <ManageReviews></ManageReviews>
          </AdminRoutes>
        ),
      },
      {
        path: "advertise-properties",
        element: (
          <AdminRoutes>
            <AdvertiseProperties></AdvertiseProperties>
          </AdminRoutes>
        ),
      },
      // User Routes
      {
        path: "user-profile",
        element: <UserProfile></UserProfile>,
      },
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
