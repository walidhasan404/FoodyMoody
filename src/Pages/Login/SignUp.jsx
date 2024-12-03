import { useForm } from "react-hook-form";
import loginImg from "../../assets/Login/signup.png";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "../../Providers/AuthProviders";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

function SignUp() {
  const { createUser, googleSignIn } = useContext(Authcontext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          email: result?.user?.email,
          name: result?.user?.displayName,
          role: "user",
        };
        axiosPublic.post("/users", userInfo).then(() => navigate("/"));
      })
      .catch((error) => {
        console.error("Google Login Error: ", error);
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: "Unable to log in with Google. Please try again.",
        });
      });
  };

  const onSubmit = async (data) => {
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        role: data.role,
        image: data.image, // Direct image URL from the form
        phoneNumber: data.phoneNumber,
      };

      await createUser(data.email, data.password);
      await axiosPublic.post("/users", userInfo);
      reset();
      navigate("/");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully registered.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Registration Error: ", error);

      let errorMessage = "An error occurred. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email already registered.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      }

      Swal.fire({
        position: "top-end",
        icon: "error",
        title: errorMessage,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>DelivTract | SignUp</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-100 my-4">
        <div className="hero-content flex-col gap-20 lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <img src={loginImg} alt="Signup" className="w-[90%]" />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className={`input input-bordered ${
                    errors.name ? "input-error" : ""
                  }`}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="text-error">{errors.name.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className={`input input-bordered ${
                    errors.email ? "input-error" : ""
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-error">{errors.email.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input
                  {...register("image", { required: "Image URL is required" })}
                  type="url"
                  placeholder="Enter direct image link"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>

              <div className="form-control">
                <select
                  defaultValue="default"
                  {...register("role", { required: "Role is required" })}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option disabled value="default">
                    Register Type
                  </option>
                  <option value="user">User</option>
                  <option value="DeliveryMan">Delivery Man</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  className={`input input-bordered ${
                    errors.phoneNumber ? "input-error" : ""
                  }`}
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                />
                {errors.phoneNumber && (
                  <span className="text-error">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className={`input input-bordered ${
                    errors.password ? "input-error" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-error">{errors.password.message}</span>
                )}
              </div>

              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="SignUp"
                  className="btn btn-primary"
                />
              </div>
            </form>

            <div className="text-center mb-4 space-y-2">
              <div>
                Already registered?
                <Link to={"/login"}>
                  <span className="text-purple-500"> Login</span>
                </Link>
                <div className="divider">OR</div>
              </div>
              <p>Sign Up with</p>
              <p className="flex gap-3 justify-center">
                <button
                  className="flex items-center gap-2 p-2 border-2 rounded-lg hover:drop-shadow-xl"
                  onClick={handleGoogleLogin}
                >
                  <FcGoogle className="text-2xl" />
                  Google
                </button>
                <span className="flex items-center gap-2 p-2 border-2 rounded-lg">
                  <FaFacebook className="text-2xl"></FaFacebook> Facebook
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
