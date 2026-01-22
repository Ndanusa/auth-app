import {
   Settings,
   Phone,
   Video,
   UsersRound,
   MessageCircle,
} from "lucide-react";
import logoImg from "../assets/logo.svg";
import { useEffect, useState } from "react";
function Navbar() {
   return (
      <>
         <div className="flex flex-col py-10 px-3.5 h-screen bg-zinc-950 w-fit items-center justify-between">
            <div>
               <img src={logoImg} className="w-15" alt="Logo" />
            </div>
            <div className="flex flex-col items-center gap-15">
               <div className="hover:scale-105 relative duration-200 ease-in hover:-translate-y-1.5 cursor-pointer">
                  {" "}
                  <MessageCircle strokeWidth={`1`} color="#e9eaff" />
               </div>
               <div className="hover:scale-105 relative duration-200 ease-in hover:-translate-y-1.5 cursor-pointer">
                  {" "}
                  <Phone strokeWidth={`1`} color="#fff" />
               </div>
               <div className="hover:scale-105 relative duration-200 ease-in hover:-translate-y-1.5 cursor-pointer">
                  {" "}
                  <Video strokeWidth={`1`} color="#fff" />
               </div>
               <div className="hover:scale-105 relative duration-200 ease-in hover:-translate-y-1.5 cursor-pointer">
                  {" "}
                  <UsersRound strokeWidth={`1`} color="#fff" />
               </div>
            </div>
            <div className="mt-20 hover:scale-105 relative duration-200 ease-in hover:-translate-y-1.5 cursor-pointer">
               <Settings strokeWidth={`1`} color="#fff" />
            </div>
         </div>
      </>
   );
}

export default Navbar;
