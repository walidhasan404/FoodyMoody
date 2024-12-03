import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from './../../../Hooks/useAxiosSecure';
import TabularUser from "./TabularUser";

function AllUsers() {
  const axiosSecure = useAxiosSecure();
  const { data: users=[],refetch} = useQuery({
    queryKey:[ 'users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/allUsers')
      return res.data
    
    }
  })
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Action</th>
              <th>Action</th>
             
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {users.map((user, index) => (
              <TabularUser key={user._id}  user={user} index={index + 1} refetch={refetch} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AllUsers