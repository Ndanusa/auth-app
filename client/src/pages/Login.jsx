import { Link } from "react-router-dom";
import logoSrc from "../assets/logo-light.svg";
function Login() {
   return (
      <>
         <div className="flex h-screen items-center justify-between px-30">
            <div className="">This is a test for the section</div>
            <div className="bg-zinc-900 rounded-3xl sqc-2xl p-6">
               <div className="relative max-w-md w-full  p-8 overflow-hidden mx-auto">
                  <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-gray-700 rounded-tr-3xl sqc-2xl-tr"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-gray-800 rounded-bl-3xl sqc-2xl-bl"></div>

                  <div className="mb-8">
                     <div className="w-52 h-32 mb-4">
                        <img src={logoSrc} alt="" />
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
