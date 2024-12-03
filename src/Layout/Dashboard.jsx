import { FaHome, FaRegGrinStars } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom"
import useAdmin from "../Hooks/useAdmin";
import { CgProfile } from "react-icons/cg";
import { MdAddShoppingCart } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { TiTickOutline } from "react-icons/ti";
import useDeliveryMan from "../Hooks/useDeliveryMan";

function Dashboard() {
  const { isAdmin } = useAdmin();
  const { isDeliveryMan } = useDeliveryMan();
// console.log(isDeliveryMan);
  return (
    <div className="flex">
      <div className="bg-orange-300 px-2 min-h-screen">
        <ul className=" text-blue-800 p-4 space-y-2">
          {isAdmin && !isDeliveryMan && (
            <>
              <li>
                <NavLink to={"parcels"}>All Parcels</NavLink>
              </li>
              <li>
                <NavLink to={"allUsers"}>All Users</NavLink>
              </li>
              <li>
                <NavLink to={"allDelivery"}>All Delivery Men</NavLink>
              </li>
              <li>
                <NavLink to={"statistics"}>Statistics</NavLink>
              </li>
            </>
          )}
          {isDeliveryMan && !isAdmin && (
            <>
              <li>
                <NavLink to={"/dashboard/deliveryList"}>
                  <div className="flex items-center gap-2">
                    <TiTickOutline className="text-3xl" />
                    My Delivery List
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/review"}>
                  <div className="flex items-center gap-2">
                    <FaRegGrinStars className="text-2xl" />
                    My Review
                  </div>
                </NavLink>
              </li>
            </>
          )}
          {!isAdmin && !isDeliveryMan && (
            <>
              <li>
                <NavLink to={"/dashboard/profile"}>
                  <div className="flex items-center gap-2">
                    <CgProfile className="text-2xl" />
                    My Profile
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/parcelBooking"}>
                  <div className="flex items-center gap-2">
                    <MdAddShoppingCart className="text-2xl" />
                    Book an Order
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/userParcel"}>
                  <div className="flex items-center gap-2">
                    <CiDeliveryTruck className="text-2xl" />
                    My Orders
                  </div>
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <NavLink to={"/"} className="flex gap-2 items-center">
              <FaHome className="text-2xl" />
              Home
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
export default Dashboard