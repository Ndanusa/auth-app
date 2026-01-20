import { Link } from "react-router-dom";
import logoSrc from "../assets/logo.svg";
import { useState } from "react";
import { Mail, Key } from "lucide-react";
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
         <div
            className="flex h-screen overflow-y-hidden items-center justify-center px-30"
            style={{
               backgroundImage: `
                  linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
                  linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
      `,
               backgroundSize: "40px 40px",
            }}>
            <div className="flex flex-col items-center justify-between bg-[#f5f5f515] px-10 py-10 sqc-2xl backdrop-blur-xs shadow-xl">
               <div className="w-20 ">
                  <img src={logoSrc} alt="" />
               </div>

               <form className="form" onSubmit={() => event.preventDefault()}>
                  <h1 className="text-4xl font-bold">Sign in</h1>
                  <div className="py-10">
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
                              <Mail
                                 size={18}
                                 color={
                                    emailError !== "" ? "#ff0000" : "#5c5c5c"
                                 }
                                 strokeWidth={2.25}
                              />
                           </span>
                           <input
                              disabled={isLoading}
                              className={`placeholder:text-xs text-sm pl-8 disabled:opacity-70 disabled:bg-gray-400 disabled:text-gray-100 bg-white py-2 px-3 sqc-lg mt-2 w-90 ${
                                 emailError !== ""
                                    ? "text-red-600 focus:outline-0 border-2 border-red-600 placeholder:text-red-500"
                                    : "text-zinc-900 focus:outline-2 border-0 placeholder:text-zinc-500"
                              }`}
                              type="email"
                              name="email"
                              placeholder="Email address"
                              onChange={(e) => {
                                 if (emailRegex.test(e.target.value.trim())) {
                                    setEmailError("");
                                    setEmail(e.target.value);
                                 } else if (e.target.value === "") {
                                    setEmailError("Field cannot be empty");
                                 } else if (
                                    !emailRegex.test(e.target.value.trim())
                                 ) {
                                    setEmailError("Email address is not valid");
                                 }
                              }}
                           />
                        </div>

                        <p className="text-red-600 text-xs font-normal">
                           {emailError}
                        </p>
                     </div>
                     <div className="mt-7">
                        <label htmlFor="email">
                           <p
                              className={`text-xs font-semibold ${
                                 passwordError !== "" ? "text-red-600" : ""
                              }`}>
                              Password
                           </p>
                        </label>
                        <div className="relative flex items-center">
                           <span className="absolute bottom-2 left-2">
                              <Key
                                 size={18}
                                 color={
                                    passwordError !== "" ? "#ff0000" : "#5c5c5c"
                                 }
                                 strokeWidth={2.25}
                              />
                           </span>
                           <input
                              disabled={isLoading}
                              className={`placeholder:text-xs disabled:opacity-70 disabled:bg-gray-400 disabled:text-gray-100 text-sm pl-8 bg-white py-2 px-3 sqc-lg mt-2 w-90 ${
                                 passwordError !== ""
                                    ? "text-red-600 focus:outline-0 border-2 border-red-600 placeholder:text-red-500"
                                    : "text-zinc-900 focus:outline-2 border-0 placeholder:text-zinc-500"
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
                           className="accent-black"
                        />
                     </div>
                     <button
                        disabled={isLoading}
                        onClick={postData}
                        type="submit"
                        className="cursor-pointer mt-5 disabled:bg-gray-400 disabled:text-gray-100 disabled:opacity-70  rounded-lg sqc-lg w-90 text-center bg-zinc-800 text-zinc-100 px-5 py-2 text-sm hover:bg-zinc-300 hover:text-zinc-600 transition-all duration-400 ease-out">
                        Sign In
                     </button>
                     <div className="text-sm">
                        <p className="my-3">
                           Don't have an account?{" "}
                           <span className="underline font-bold">
                              <Link to={"/signup"}>Sign up</Link>
                           </span>
                        </p>

                        <p className="mt-1">
                           I can't remember my details.{" "}
                           <span className="underline font-bold">
                              <Link to={"/account-reset"}>Reset</Link>
                           </span>
                        </p>
                     </div>
                     <div className="flex items-center justify-center gap-12 mt-10">
                        <div className="cursor-pointer hover:bg-zinc-300 transition duration-400 ease-out w-12 h-12 flex items-center justify-center bg-zinc-200 rounded-full">
                           {" "}
                           <img className="w-6" src={google} alt="" />{" "}
                        </div>
                        <div className="cursor-pointer hover:bg-zinc-300 transition duration-400 ease-out w-12 h-12 flex items-center justify-center bg-zinc-200 rounded-full">
                           {" "}
                           <img className="w-6" src={github} alt="" />{" "}
                        </div>
                        <div className="cursor-pointer hover:bg-zinc-300 transition duration-400 ease-out w-12 h-12 flex items-center justify-center bg-zinc-200 rounded-full">
                           {" "}
                           <img className="w-6" src={microsoft} alt="" />{" "}
                        </div>
                        <div className="cursor-pointer hover:bg-zinc-300 transition duration-400 ease-out w-12 h-12 flex items-center justify-center bg-zinc-200 rounded-full">
                           {" "}
                           <img className="w-6" src={twitter} alt="" />{" "}
                        </div>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
}

export default Login;
