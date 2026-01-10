import { useState, useEffect } from "react";
function App() {
   const [count, setCount] = useState(0);
   return (
      <>
         <div>
            <h1>Hello world</h1>
            <button onClick={() => setCount((c) => c + 1)}>Add</button>
            <div>{count}</div>
         </div>
      </>
   );
}

export default App;
