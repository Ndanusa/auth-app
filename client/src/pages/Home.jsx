import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";

function Home() {
   return (
      <>
         <div className="flex items-center">
            <Navbar />
            <div></div>
         </div>
      </>
   );
}

export default Home;
