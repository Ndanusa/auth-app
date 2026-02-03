import { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
   Mail01Icon,
   CirclePasswordIcon,
   Login02Icon,
   Cancel01Icon,
   User03Icon,
} from "@hugeicons/core-free-icons";
import { Link } from "react-router-dom";
import google from "../assets/google.png";
import twitter from "../assets/twitter.png";
import github from "../assets/github.png";
import microsoft from "../assets/microsoft.png";
import { BACKEND_URL, BACKEND_URL_2 } from "../config/config";
function Signup() {
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");
   const [usernameError, setUsernameError] = useState("");
   const [firstNameError, setFirstNameError] = useState("");
   const [username, setUsername] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastNameError, setLastNameError] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [generalMsg, setGeneralMsg] = useState({
      error: true,
      message: "",
   });
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
      if (lastNameError !== "") return;
      if (firstNameError !== "") return;
      if (usernameError !== "") return;
      if (!email && !password && !firstName && !lastName && !username) {
         setEmailError("Field cannot be empty");
         setFirstNameError("Field cannot be empty");
         setLastNameError("Field cannot be empty");
         setUsernameError("Field cannot be empty");
         setEmailError("Field cannot be empty");
         return setPasswordError("Field cannot be empty");
      }
      if (!firstName) return setFirstNameError("Field cannot be empty");
      if (!lastName) return setLastNameError("Field cannot be empty");
      if (!username) return setUsernameError("Field cannot be empty");
      if (!email) return setEmailError("Field cannot be empty");
      if (!password) return setPasswordError("Field cannot be empty");
      const body = JSON.stringify({
         firstName,
         lastName,
         username,
         email,
         password,
      });
      try {
         setIsLoading(true);
         fetch(`${BACKEND_URL}/api/v1/auth/sign-up`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body,
         })
            .then((res) => {
               return res.json();
            })
            .then((data) => {
               if (data.error) {
                  if (data.type === "username") {
                     return setUsernameError(data.message);
                  }
                  if (data.type === "email") {
                     return setEmailError(data.message);
                  }
                  return;
               }
               setGeneralMsg({
                  message: data.message,
                  error: false,
               });
            })
            .catch((err) => {
               err.name === "TypeError" &&
                  setGeneralMsg({
                     error: true,
                     message: "Check Your internet",
                  });
            })
            .finally(() => setIsLoading(false));
      } catch (error) {
         console.log("error");
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
                     <div>
                        <div className="flex items-center gap-2 py-2 px-4 bg-[#e7e7e7] w-fit sqc-lg">
                           <h1 className="text-sm">Sign up</h1>
                           <HugeiconsIcon
                              icon={Login02Icon}
                              size={20}
                              color="currentColor"
                              strokeWidth={1.9}
                           />
                        </div>
                     </div>
                     <div className="py-5">
                        <div>
                           <label htmlFor="firstName">
                              <p
                                 className={`text-xs font-semibold ${
                                    firstNameError !== "" ? "text-red-600" : ""
                                 }`}>
                                 First Name
                              </p>
                           </label>
                           <div className="relative flex items-center">
                              <span className="absolute bottom-2 left-2">
                                 <HugeiconsIcon
                                    icon={User03Icon}
                                    color={
                                       firstNameError !== ""
                                          ? "#ff0000"
                                          : "#745cff"
                                    }
                                    size={`18`}
                                    strokeWidth={`1.5`}
                                 />
                              </span>
                              <input
                                 disabled={isLoading}
                                 className={`placeholder:text-xs text-sm pl-8 disabled:opacity-70 disabled:bg-gray-400 disabled:text-gray-100 bg-[#e7e4f1] py-2 px-3 sqc-lg mt-2 w-90 ${
                                    firstNameError !== ""
                                       ? "text-red-600 focus:outline-0 border-2 border-red-600 placeholder:text-red-500"
                                       : "text-[#4323fe] focus:outline-2 focus:outline-[#2600ff] border-0 placeholder:text-[#a197d7]"
                                 }`}
                                 type="firstName"
                                 name="firstName"
                                 placeholder="First Name"
                                 onChange={(e) => {
                                    if (e.target.value === "") {
                                       return setFirstNameError(
                                          "Field cannot be empty",
                                       );
                                    }
                                    setFirstNameError("");
                                    setFirstName(e.target.value);
                                 }}
                              />
                           </div>

                           <p className="text-red-600 text-xs font-normal">
                              {firstNameError}
                           </p>
                        </div>
                        <div className="mt-3">
                           <label htmlFor="lastName">
                              <p
                                 className={`text-xs font-semibold ${
                                    lastNameError !== "" ? "text-red-600" : ""
                                 }`}>
                                 Last Name
                              </p>
                           </label>
                           <div className="relative flex items-center">
                              <span className="absolute bottom-2 left-2">
                                 <HugeiconsIcon
                                    icon={User03Icon}
                                    color={
                                       lastNameError !== ""
                                          ? "#ff0000"
                                          : "#745cff"
                                    }
                                    size={`18`}
                                    strokeWidth={`1.5`}
                                 />
                              </span>
                              <input
                                 disabled={isLoading}
                                 className={`placeholder:text-xs text-sm pl-8 disabled:opacity-70 disabled:bg-gray-400 disabled:text-gray-100 bg-[#e7e4f1] py-2 px-3 sqc-lg mt-2 w-90 ${
                                    lastNameError !== ""
                                       ? "text-red-600 focus:outline-0 border-2 border-red-600 placeholder:text-red-500"
                                       : "text-[#4323fe] focus:outline-2 focus:outline-[#2600ff] border-0 placeholder:text-[#a197d7]"
                                 }`}
                                 type="lastName"
                                 name="lastName"
                                 placeholder="Last Name"
                                 onChange={(e) => {
                                    if (e.target.value === "") {
                                       return setLastNameError(
                                          "Field cannot be empty",
                                       );
                                    }
                                    setLastNameError("");
                                    setLastName(e.target.value);
                                 }}
                              />
                           </div>

                           <p className="text-red-600 text-xs font-normal">
                              {lastNameError}
                           </p>
                        </div>
                        <div className="mt-3">
                           <label htmlFor="username">
                              <p
                                 className={`text-xs font-semibold ${
                                    usernameError !== "" ? "text-red-600" : ""
                                 }`}>
                                 Username
                              </p>
                           </label>
                           <div className="relative flex items-center">
                              <span className="absolute bottom-2 left-2">
                                 <HugeiconsIcon
                                    icon={User03Icon}
                                    color={
                                       usernameError !== ""
                                          ? "#ff0000"
                                          : "#745cff"
                                    }
                                    size={`18`}
                                    strokeWidth={`1.5`}
                                 />
                              </span>
                              <input
                                 disabled={isLoading}
                                 className={`placeholder:text-xs text-sm pl-8 disabled:opacity-70 disabled:bg-gray-400 disabled:text-gray-100 bg-[#e7e4f1] py-2 px-3 sqc-lg mt-2 w-90 ${
                                    usernameError !== ""
                                       ? "text-red-600 focus:outline-0 border-2 border-red-600 placeholder:text-red-500"
                                       : "text-[#4323fe] focus:outline-2 focus:outline-[#2600ff] border-0 placeholder:text-[#a197d7]"
                                 }`}
                                 type="username"
                                 name="username"
                                 placeholder="Username"
                                 onChange={(e) => {
                                    if (e.target.value === "") {
                                       return setUsernameError(
                                          "Field cannot be empty",
                                       );
                                    }
                                    setUsernameError("");
                                    setUsername(e.target.value);
                                 }}
                              />
                           </div>

                           <p className="text-red-600 text-xs font-normal">
                              {usernameError}
                           </p>
                        </div>
                        <div className="mt-3">
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
                                       setEmailError("Email is not valid");
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
                              htmlFor="password"
                              className="flex items-center justify-between">
                              <p
                                 className={`text-xs font-semibold ${
                                    passwordError !== "" ? "text-red-600" : ""
                                 }`}>
                                 Password
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
                                 autoComplete="current-password"
                              />
                           </div>

                           <p className="text-red-600 text-xs font-normal">
                              {passwordError}
                           </p>
                        </div>

                        <button
                           disabled={isLoading}
                           onClick={postData}
                           type="submit"
                           className="cursor-pointer mt-5 disabled:bg-gray-400 disabled:text-gray-100 disabled:opacity-70  rounded-lg sqc-lg w-90 text-center bg-[#5b4d94] text-zinc-100 px-5 py-2 text-sm hover:bg-[#bab4d3] hover:text-zinc-800 transition-all duration-400 ease-out">
                           Sign Up
                        </button>

                        <div className="items-center justify-center">
                           {generalMsg.message ? (
                              <div
                                 className={`flex items-center justify-center w-full my-5 px-4 gap-4 h-10 text-sm ${!generalMsg.error ? "bg-[#d0ffee] text-[#00d223]" : "bg-[#f1e3e3] text-red-600"}  sqc-lg`}>
                                 {generalMsg.message}
                                 <button
                                    className={`cursor-pointer ${!generalMsg.error ? "hover:text-[#3cff5c]" : "hover:text-red-300"}  transition-all duration-300`}
                                    onClick={() => {
                                       setGeneralMsg("");
                                    }}>
                                    <HugeiconsIcon
                                       icon={Cancel01Icon}
                                       size={15}
                                       color="currentColor"
                                       strokeWidth={1.9}
                                    />
                                 </button>
                              </div>
                           ) : (
                              ""
                           )}
                        </div>
                     </div>
                  </form>
               </div>
               <div className="text-sm bg-[#d2d2d215] w-full flex items-center justify-center z-0 h-20 relative border border-[#cfccdc] sqc-2xl-br sqc-2xl-bl py-10 -top-8">
                  <p className="my-3 absolute top-8">
                     Already have an account?{" "}
                     <span className="underline font-bold">
                        <Link to={"/login"}>Login</Link>
                     </span>
                  </p>
               </div>
            </div>
         </div>
      </>
   );
}

export default Signup;
