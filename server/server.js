import http from "http";
const PORT = 4000;

const server = http.createServer((req, res) => {
   res.statusCode = 200;

   res.end("this is a test text");
});

server.listen(4000, () => {
   console.log("server is listening on port 4000");
});
