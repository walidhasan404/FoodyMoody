import { useContext } from "react";
import { MdContentCopy } from "react-icons/md";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic"; // Added import
import { useQuery } from "@tanstack/react-query";
import { Authcontext } from "../../../../Providers/AuthProviders";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function UserProfile() {
  const { user } = useContext(Authcontext);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic(); // Added initialization
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`allUsers/${user.email}`);
      return res.data;
    },
  });

  console.log(users.email);

  const onSubmit = async (data) => {
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const imageFile = { image: data.image[0] };

    try {
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded successfully", res.data);
      const updateImage = res.data.data.display_url;
      await axiosSecure
        .patch(`/profileUpdate/${user.email}`, { image: updateImage })
        .then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
           Swal.fire({
             title: "Updated!",
             text: `Profile Picture has been updated`,
             icon: "success",
           });
         }
        });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };


  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="mx-9">
      <div>User Info</div>
      <div className="border">
        <p className="border p-3">Basic Info</p>
      </div>
      <div className="flex gap-16  p-3 border flex-col md:flex-row lg:flex-row">
        <div className="avatar online">
          <div className=" w-48 h-48 rounded-full transform transition-transform duration-300 hover:opacity-50">
            <img src={user?.photoURL || users?.image} alt="User Avatar" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <p className="mr-3">{user?.displayName || users?.name}</p>
            <button
              onClick={() => handleCopy(user?.displayName || users?.name)}
            >
              <MdContentCopy />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <p className="mr-3">{user?.email}</p>
            <button onClick={() => handleCopy(user?.email)}>
              <MdContentCopy />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <p className="mr-3">ID: 22</p>
            <button onClick={() => handleCopy("22")}>
              <MdContentCopy />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Upload Image</span>
              </label>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Upload
            </button>
          </form>
        </div>
      </div>

      <div className="mt-4">
        <div className="border">
          <p className="border p-3">Contact Info</p>
        </div>
        <div className=" p-3 border pb-36">
          <div className="flex justify-between">
            <p className="mr-3">
              Name: {user?.displayName ? user?.displayName : users?.name}
            </p>

            <p>Email: {user?.email}</p>
          </div>
          <p>Phone Number: {users?.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
