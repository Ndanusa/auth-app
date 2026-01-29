async function getData() {
   const response = await fetch("http://localhost:4400/api/v1/auth/user");
   const data = await response.json();
   return data;
}

export default getData;
