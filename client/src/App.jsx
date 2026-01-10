import { useEffect, useState } from "react";

function App() {
   const BACKEND_URL = "http://localhost:4000";
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [username, setUsername] = useState("");
   const [age, setAge] = useState("");
   const [password, setPassword] = useState("");
   const [status, setStatus] = useState({});

   function postData() {
      if (!firstName || !lastName || !username || !age || !password) {
         console.log("no");
         return;
      }

      const body = {
         firstName,
         lastName,
         username,
         age,
         password,
      };

      fetch(`${BACKEND_URL}/users/new`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(body),
      })
         .then((data) => data.json())
         .then((data) => setStatus(data));
   }

   return (
      <>
         <div>
            <h1>Register</h1>
            <form onSubmit={() => event.preventDefault()}>
               <label htmlFor="first-name">First Name</label>
               <input
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="First Name"
               />{" "}
               <br />
               <label htmlFor="last-name">Last Name</label>
               <input
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Last Name"
               />{" "}
               <br />
               <label htmlFor="username">Username</label>
               <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Username"
               />{" "}
               <br />
               <label htmlFor="age">Age</label>
               <input
                  onChange={(e) => setAge(e.target.value)}
                  type="date"
                  name="age"
               />{" "}
               <br />
               <label htmlFor="password">Password</label>
               <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
               />{" "}
               <br />
               <button onClick={postData}>Submit</button>
            </form>
            <p
               style={{
                  color: `${status.successful ? "#00eb4eff" : "#ff0606ff"}`,
               }}>
               {status.message}
            </p>
         </div>
      </>
   );
}

export default App;
