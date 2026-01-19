import {
   Settings,
   MessageCircle,
   Phone,
   LucideVideo,
   UsersRoundIcon,
} from "lucide-react";
import logoImg from "../assets/logo.svg";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config/config.js";
function Navbar() {
   return (
      <>
         <div className="flex flex-col py-10 px-5 h-screen bg-indigo-300 w-fit items-center justify-between">
            <div>
               <img src={logoImg} className="w-15" alt="Logo" />
            </div>
            <div>
               <MessageCircle />
               <Phone />
               <Video />
               <UsersRoundIcon />
            </div>
         </div>
      </>
   );
}

export default Navbar;
