import { Link } from "react-router-dom";
import logoSrc from "../assets/logo.svg";
function Login() {
   return (
      <>
         <div className="flex h-screen items-center justify-around">
            <div className="">This is a test for the section</div>
            <div className="bg-black text-white flex flex-col items-center justify-center px-10 py-10">
               <img src={logoSrc} alt="" className="w-100" />
               This is a test for the section
            </div>
         </div>
      </>
   );
}

export default Login;
