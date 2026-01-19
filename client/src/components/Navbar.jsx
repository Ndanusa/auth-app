import {
   Settings,
   Phone,
   Video,
   UsersRound,
   MessageCircle,
} from "lucide-react";
import logoImg from "../assets/logo-light.svg";
import { useEffect, useState } from "react";
function Navbar() {
   return (
      <>
         <div className="flex flex-col py-10 px-5 h-screen bg-violet-950 w-fit items-center justify-between">
            <div>
               <img src={logoImg} className="w-15" alt="Logo" />
            </div>
            <div>
               <MessageCircle color="#e9eaff" strokeWidth="1.6" />
               <Phone />
               <Video />
               <UsersRound />
            </div>
         </div>
      </>
   );
}

export default Navbar;
