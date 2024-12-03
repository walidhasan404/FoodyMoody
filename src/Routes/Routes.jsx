import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Login/SignUp";
import Dashboard from "../Layout/Dashboard";
import ParcelBooking from "../Pages/Dashboard/ParcelBooking/ParcelBooking";
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AllDeliveryMan from "../Pages/Dashboard/AllDeliveryMan/AllDeliveryMan";
import AllParcel from "../Pages/Dashboard/AllParcel/AllParcel";
import BookedParcel from "../Pages/Dashboard/UserComponents/BookedParcel/BookedParcel";
import UserProfile from "../Pages/Dashboard/UserComponents/Profile/UserProfile";
import AdminRoutes from './AdminRoutes';
import UpdateParcel from "../Pages/Dashboard/UpdateParcel/UpdateParcel";
import DeliveryList from "../Pages/Dashboard/DeliveryMan/DeliveryList/DeliveryList";
import Review from "../Pages/Dashboard/DeliveryMan/Review/Review";
import ReviewForm from "../Pages/Dashboard/UserDashBoard/ReviewForm/ReviewForm";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Coffety from "../Components/Coffeti/Coffety";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  // Dashboard Page Routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ),
    children: [
      // {
      //   path: "/dashboard",
      //   element: <Statastics></Statastics>,
      // },
      // Normal User Routes
      {
        path: "parcelBooking",
        element: <ParcelBooking></ParcelBooking>,
      },
      {
        path: "updateParcel/:id",
        element: <UpdateParcel></UpdateParcel>,
        loader: ({ params }) =>
          fetch(`https://percel-server-seven.vercel.app/parcelsId/${params.id}`),
      },
      {
        path: 'reviewForm',
        element:<ReviewForm></ReviewForm>
      },
      {
        path: 'coffety',
        element: <Coffety></Coffety>
      },
      {
        path: 'payment/:id',
        element: <Payment></Payment>,
           loader: ({ params }) =>
          fetch(`https://percel-server-seven.vercel.app/payment/${params.id}`),
      },
      {
        path: "profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "userParcel",
        element: <BookedParcel></BookedParcel>,
      },
      // Delivery Man Routes
      {
        path: "deliveryList",
        element: <DeliveryList></DeliveryList>,
      },
      {
        path: 'review',
        element:<Review></Review>
      },
      // Admin Routes
      {
        path: "allUsers",
        element: (
          <AdminRoutes>
            <AllUsers></AllUsers>
          </AdminRoutes>
        ),
      },
      {
        path: "allDelivery",
        element: <AllDeliveryMan></AllDeliveryMan>,
      },
      {
        path: "parcels",
        element: <AllParcel></AllParcel>,
      },
    ],
  },
]);