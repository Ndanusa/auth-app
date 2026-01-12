import { Link } from "react-router-dom";
import logoSrcLight from "../assets/logo-light.svg";
import logoSrcDark from "../assets/logo.svg";
import { useState } from "react";
import { Mail, Key } from "lucide-react";
function Login() {
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");
   const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

   return (
      <>
         <div className="flex h-screen items-center justify-between px-30">
            <div className="">
               <div className="w-16 flex flex-col gap-3">
                  <img src={logoSrcDark} alt="" />
                  <p className="font-semibold">A.Vibe</p>
               </div>
               <div className="form my-7">
                  <h1 className="text-2xl font-bold">Sign in</h1>
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
                              className={`placeholder:text-xs text-sm pl-8 bg-white py-2 px-3 sqc-lg mt-2 w-90 ${
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
                                 } else {
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
                              className={`placeholder:text-xs placeholder:text-zinc-500 text-sm pl-8 bg-white py-2 px-3 sqc-lg mt-2 w-90 ${
                                 passwordError !== ""
                                    ? "text-red-600 focus:outline-0 border-2 border-red-600"
                                    : "text-zinc-900 focus:outline-2 border-0"
                              }`}
                              type="password"
                              name="password"
                              placeholder="Password"
                              onChange={(e) => {
                                 const length = e.target.value.length;
                                 if (length < 8) {
                                    setPasswordError(
                                       "Password must be 8 characters or more"
                                    );
                                 } else setPasswordError("");
                              }}
                           />
                        </div>

                        <p className="text-red-600 text-xs font-normal">
                           {passwordError}
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-zinc-900 rounded-3xl sqc-2xl p-6">
               <div className="relative max-w-md w-full  p-8 overflow-hidden mx-auto">
                  <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-gray-700 rounded-tr-3xl sqc-2xl-tr"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-gray-800 rounded-bl-3xl sqc-2xl-bl"></div>

                  <div className="mb-8">
                     <div className="w-52 h-32 mb-4">
                        <img src={logoSrcLight} alt="" />
                     </div>
                     <h2 className="text-white text-sm font-medium">A.Vibe</h2>
                  </div>

                  <div className="mb-8">
                     <h1 className="text-white text-3xl font-bold mb-3">
                        Welcome to A.Vibe
                     </h1>
                     <p className="text-gray-400 text-sm leading-relaxed">
                        Welcome to A.Vibe, a real-time chatting app not just for
                        chatting, but also for interacting with users worldwide
                     </p>
                     <p className="text-gray-400 text-sm mt-3">
                        More than 17k people joined us, it's your turn
                     </p>
                  </div>

                  <div className="bg-gray-800 rounded-2xl sqc-xl p-6 relative">
                     <h3 className="text-white text-xl font-semibold mb-3">
                        Create your account and start vibing
                     </h3>
                     <p className="text-gray-300 text-sm mb-4">
                        Be among the first to experience the new features
                        brought by us
                     </p>

                     <div className="flex -space-x-2">
                        <div className="w-10 h-10 rounded-full bg-gray-600 border-2 border-gray-800"></div>
                        <div className="w-10 h-10 rounded-full bg-gray-600 border-2 border-gray-800"></div>
                        <div className="w-10 h-10 rounded-full bg-gray-600 border-2 border-gray-800"></div>
                        <div className="w-10 h-10 rounded-full bg-gray-600 border-2 border-gray-800"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default Login;
