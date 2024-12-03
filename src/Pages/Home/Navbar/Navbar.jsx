import { Link } from "react-router-dom";
import logo from '../../../assets/Logo/logo.png';
import './Navbar.css'

import { IoIosNotificationsOutline } from "react-icons/io";
import { useContext } from "react";
import { Authcontext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
function Navbar() {
  const { user, logOut } = useContext(Authcontext);
  const axiosSecure = useAxiosSecure();
  const { data: DBusers = [], refetch } = useQuery({
    queryKey: ["DBusers"],
    enabled:!!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`allUsers/${user.email}`);
      //  console.log(res.data);
      
      return res.data;
      
    },
  });
  console.log(DBusers);
   const handleLogOut = () => {
     logOut()
      //  .then(() => {
      //    Swal.fire({
      //      position: "top-end",
      //      icon: "success",
      //      title: "Successfully Logged Out",
      //      showConfirmButton: false,
      //      timer: 1500,
      //    });
      //  })
      //  .catch((err) => {
      //    console.error("Logout Error:", err);
      //    Swal.fire({
      //      position: "top-end",
      //      icon: "error",
      //      title: "Logout Failed. Please try again.",
      //      showConfirmButton: false,
      //      timer: 1500,
      //    });
      //  });
   };
    const Navlinks = (
      <>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/dashboard"}>Dashboard</Link>
        </li>
            {user ? (
                
          <li>
            <button className="" onClick={handleLogOut}>LogOut</button>
          </li>
                )
                :(
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        )  }
        <li>
          <Link>
            <IoIosNotificationsOutline className=" text-2xl" />
          </Link>
        </li>
      </>
    );
  return (
    <div>
      <div className="navbar bg-base-200  text-orange-400 bg-none z-20 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 space-x-3 rounded-box w-52"
            >
              {Navlinks}
            </ul>
          </div>
          <img src={logo} className="w-20" alt="logo" />
          <a className="btn btn-ghost text-orange-400 text-2xl"><span>Foody<span className="text-black">Moody</span></span></a>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu-horizontal items-center px-1 space-x-12">
            {Navlinks}
          </ul>
        </div>
        <div className="navbar-end">
          {refetch() && user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="m-1">
                {user.photoURL || DBusers?.image ? (
                  <img
                    src={user?.photoURL || DBusers?.image} //Put herer
                    alt="User"
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12  rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-sm">
                      {user.displayName?.[0] || DBusers?.name}
                    </span>
                  </div>
                )}
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 space-y-1 rounded-box w-52"
              >
                <h1 className="text-center text-xl">{DBusers?.name}</h1>
                <li>
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                <li></li>
                <li>
                  <button className="" onClick={handleLogOut}>
                    LogOut
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Navbar