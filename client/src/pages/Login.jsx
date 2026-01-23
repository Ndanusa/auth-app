import { Link } from "react-router-dom";
import logoSrc from "../assets/logo.svg";
import { useEffect, useState } from "react";
import { Mail, Key } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
   Mail01Icon,
   CirclePasswordIcon,
   Login02Icon,
} from "@hugeicons/core-free-icons";
import google from "../assets/google.png";
import twitter from "../assets/twitter.png";
import github from "../assets/github.png";
import microsoft from "../assets/microsoft.png";
import { BACKEND_URL } from "../config/config";
function Login() {
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
   useEffect(() => {
      const div = document.querySelector(".form");
      isLoading
         ? (div.style.cursor = "not-allowed")
         : (div.style.cursor = "default");
   }, [isLoading]);
   function postData() {
      if (emailError !== "") return;
      if (passwordError !== "") return;
      const body = JSON.stringify({
         email,
         password,
      });
      try {
         setIsLoading(true);
         fetch(`${BACKEND_URL}/api/v1/auth/sign-in`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body,
         })
            .then((res) => res.json())
            .then((data) => {
               if (data.type === "password") {
                  setPasswordError(data.error);
                  return;
               }
               if (data.type === "email") {
                  setEmailError(data.error);
                  return;
               }
               if (data.data.token) {
                  localStorage.setItem("token", data.data.token);
                  localStorage.setItem("user", JSON.stringify(data.data.user));
                  window.location.href = "/";
               }
            })
            .finally(() => setIsLoading(false));
      } catch (error) {
         throw error;
      }
   }

   return (
      <>
         <div className="flex h-screen overflow-y-hidden items-center justify-center px-30">
            <div className="flex flex-col items-center">
               <div className="flex flex-col items-center justify-between bg-[#d2d2d215] px-10 py-3 sqc-2xl backdrop-blur-xs border border-[#cfccdc] z-9999">
                  <form
                     className="form pt-5"
                     onSubmit={() => event.preventDefault()}>
                     <div className="flex items-center gap-2 py-1 px-4 bg-[#e7e7e7] w-fit sqc-lg">
                        <h1>Login</h1>
                        <HugeiconsIcon
                           icon={Login02Icon}
                           size={20}
                           color="currentColor"
                           strokeWidth={1.9}
                        />
                     </div>
                     <div className="py-5">
                        <div>
                           <label htmlFor="email">
                              <p
                                 className={`text-xs font-semibold ${
                                    emailError !== "" ? "text-red-600" : ""
                                 }`}>
                                 Email Address
                              </p>
                           </label>
                           <div className="relative flex items-center">
                              <span className="absolute bottom-2 left-2">
                                 <HugeiconsIcon
                                    icon={Mail01Icon}
                                    color={
                                       emailError !== "" ? "#ff0000" : "#745cff"
                                    }
                                    size={`18`}
                                    strokeWidth={`1.5`}
                                 />
                              </span>
                              <input
                                 disabled={isLoading}
                                 className={`placeholder:text-xs text-sm pl-8 disabled:opacity-70 disabled:bg-gray-400 disabled:text-gray-100 bg-[#e7e4f1] py-2 px-3 sqc-lg mt-2 w-90 ${
                                    emailError !== ""
                                       ? "text-red-600 focus:outline-0 border-2 border-red-600 placeholder:text-red-500"
                                       : "text-[#4323fe] focus:outline-2 focus:outline-[#2600ff] border-0 placeholder:text-[#a197d7]"
                                 }`}
                                 type="email"
                                 name="email"
                                 placeholder="Email address"
                                 onChange={(e) => {
                                    if (
                                       emailRegex.test(e.target.value.trim())
                                    ) {
                                       setEmailError("");
                                       setEmail(e.target.value);
                                    } else if (e.target.value === "") {
                                       setEmailError("Field cannot be empty");
                                    } else if (
                                       !emailRegex.test(e.target.value.trim())
                                    ) {
                                       setEmailError(
                                          "Email address is not valid",
                                       );
                                    }
                                 }}
                              />
                           </div>

                           <p className="text-red-600 text-xs font-normal">
                              {emailError}
                           </p>
                        </div>
                        <div className="mt-3">
                           <label
                              htmlFor="email"
                              className="flex items-center justify-between">
                              <p
                                 className={`text-xs font-semibold ${
                                    passwordError !== "" ? "text-red-600" : ""
                                 }`}>
                                 Password
                              </p>
                              <p>
                                 <span className="font-bold flex text-xs hover:underline">
                                    <Link to={"/account-reset"}>
                                       Forgot password?
                                    </Link>
                                 </span>
                              </p>
                           </label>
                           <div className="relative flex items-center">
                              <span className="absolute bottom-2 left-2">
                                 <HugeiconsIcon
                                    icon={CirclePasswordIcon}
                                    size={20}
                                    color={
                                       passwordError !== ""
                                          ? "#ff0000"
                                          : "#745cff"
                                    }
                                    strokeWidth={1.5}
                                 />
                              </span>
                              <input
                                 disabled={isLoading}
                                 className={`placeholder:text-xs disabled:opacity-70 disabled:bg-gray-400 disabled:text-gray-100 text-sm pl-8 bg-[#e7e4f1]  py-2 px-3 sqc-lg mt-2 w-90 ${
                                    passwordError !== ""
                                       ? "text-red-600 focus:outline-0 border-2 border-red-600 placeholder:text-red-500"
                                       : "text-[#4323fe] focus:outline-2 focus:outline-[#2600ff] border-0 placeholder:text-[#a197d7]"
                                 }`}
                                 type="password"
                                 name="password"
                                 placeholder="Password"
                                 onChange={(e) => {
                                    if (e.target.value.length === 0) {
                                       return setPasswordError(
                                          "Field cannot be empty",
                                       );
                                    }
                                    if (e.target.value.length < 8) {
                                       return setPasswordError(
                                          "Password must be between 8 characters or more",
                                       );
                                    }
                                    setPasswordError("");
                                    setPassword(e.target.value);
                                 }}
                              />
                           </div>

                           <p className="text-red-600 text-xs font-normal">
                              {passwordError}
                           </p>
                        </div>
                        <div className="flex items-center gap-2 mt-3 text-sm">
                           <label htmlFor="remember">Remember me</label>
                           <input
                              type="checkbox"
                              name="remember"
                              className="accent-[#5b4d94]"
                           />
                        </div>
                        <button
                           disabled={isLoading}
                           onClick={postData}
                           type="submit"
                           className="cursor-pointer mt-5 disabled:bg-gray-400 disabled:text-gray-100 disabled:opacity-70  rounded-lg sqc-lg w-90 text-center bg-[#5b4d94] text-zinc-100 px-5 py-2 text-sm hover:bg-[#bab4d3] hover:text-zinc-800 transition-all duration-400 ease-out">
                           Sign In
                        </button>
                        <div className="flex items-center justify-center gap-2 mt-5">
                           <div className="border w-full rounded-2xl border-gray-300"></div>
                           <p className="text-gray-500">OR</p>
                           <div className="border w-full rounded-2xl border-gray-300"></div>
                        </div>
                        <div className="flex flex-col gap-3 mt-5">
                           <div className="cursor-pointer hover:bg-[#c3bed7] transition duration-400 ease-out w-full h-9 flex items-center justify-center bg-[#dfdde7] sqc-lg">
                              {" "}
                              <img className="w-4" src={google} alt="" />{" "}
                           </div>
                           <div className="cursor-pointer hover:bg-[#c3bed7] transition duration-400 ease-out w-full h-9 flex items-center justify-center bg-[#dfdde7] sqc-lg">
                              {" "}
                              <img className="w-4" src={github} alt="" />{" "}
                           </div>
                           <div className="cursor-pointer hover:bg-[#c3bed7] transition duration-400 ease-out w-full h-9 flex items-center justify-center bg-[#dfdde7] sqc-lg">
                              {" "}
                              <img
                                 className="w-4"
                                 src={microsoft}
                                 alt=""
                              />{" "}
                           </div>
                           <div className="cursor-pointer hover:bg-[#c3bed7] transition duration-400 ease-out w-full h-9 flex items-center justify-center bg-[#dfdde7] sqc-lg">
                              {" "}
                              <img className="w-4" src={twitter} alt="" />{" "}
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
               <div className="text-sm bg-[#d2d2d215] w-full flex items-center justify-center z-0 h-20 relative border border-[#cfccdc] sqc-2xl-br sqc-2xl-bl py-10 -top-8">
                  <p className="my-3 absolute top-8">
                     Don't have an account?{" "}
                     <span className="underline font-bold">
                        <Link to={"/signup"}>Sign up</Link>
                     </span>
                  </p>
               </div>
            </div>
         </div>
      </>
   );
}

export default Login;
