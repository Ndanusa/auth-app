import { useState, useEffect } from "react";
function App() {
   const [count, setCount] = useState("");
   async function getUUID() {
      const response = await fetch("http://localhost:4000");
      const data = await response.json();
   }
   return (
      <>
         <div>
            <button onClick={getUUID}>Get uuid</button>
            {count}
         </div>
      </>
   );
}

export default App;
