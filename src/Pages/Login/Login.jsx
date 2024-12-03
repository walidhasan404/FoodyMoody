import { useForm } from "react-hook-form";
import loginImg from '../../assets/Login/login.png'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { Authcontext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { signIn } = useContext(Authcontext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


const onSubmit = (data) => {
  signIn(data.email, data.password)
    .then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful.",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    })
    .catch((err) => {
      

      let errorMessage = "An error occurred. Please try again.";

      if (err.code === "auth/user-not-found") {
        errorMessage = "No user found with this email.";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      }
      else if (err.code === "auth/invalid-credential") {
        errorMessage="Invalid email or password."
      }
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500,
        });
    });
  
  
};


  return (
    <>
      <Helmet>
        <title>FoodyMoody | Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left animate__animated animate__fadeInRight">
            <img src={loginImg} alt="" className="w-[90%]" />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 animate__animated animate__fadeInLeft">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className={`input input-bordered ${
                    errors.email ? "input-error" : ""
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Entered value does not match email format",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-error">{errors.email.message}</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className={`input input-bordered ${
                    errors.password ? "input-error" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must have at least 6 characters",
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
                  value="Login"
                  className="btn btn-primary"
                />
              </div>
            </form>
            <div className="text-center mb-4 space-y-2">
              <p>
                New to <span className=" text-orange-500 font-semibold">Foody<span className="text-black">Moody</span> ? </span>
                <Link to={"/signup"}>
                  <span className="text-purple-500">Register</span>
                </Link>
                {/* <div className="divider">OR</div> */}
              </p>
              {/* <p>Sign Up with</p>
              <p className="flex gap-3 justify-center">
                <span className="flex items-center gap-2 p-2 border-2 rounded-lg hover:drop-shadow-xl">
                  <FcGoogle className="text-2xl" />
                  Google
                </span>
                <span className="flex items-center gap-2 p-2 border-2  rounded-lg">
                  <FaFacebook className="text-2xl"></FaFacebook>Facebook
                </span>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
