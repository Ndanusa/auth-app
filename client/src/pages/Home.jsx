import { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";

function Home() {
   let count = 0;

   return (
      <>
         <div className="flex items-center">
            <Navbar />
            <button className="bg-zinc-900 text-sm text-zinc-200 sqc-sm">
               click
            </button>
            <div></div>
         </div>
      </>
   );
}

export default Home;
