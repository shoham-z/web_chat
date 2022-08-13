const mysql = require('mysql');
const http = require('http');
const fs = require("fs");
const requestListener = function (req, res) {
    res.writeHead(200);
    if (req.url === "/") {
        res.end(fs.readFileSync("./client/client.html"));
    } else if (req.url === "/client.css"){
        res.end(fs.readFileSync("./client/client.css"));
    } else if (req.url === "/client.js"){
        res.end(fs.readFileSync("./client/client.js"));
    }
};
const server = http.createServer(requestListener);

const io = require('socket.io')(server, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('message', (message) =>     {
        io.emit('message', `${socket.id.substr(0,2)} said ${message}` );
    });
});

server.listen(8000, () => console.log('listening on http://localhost:8000') );

//***** connect to database
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "7WQr3nmVDLeuz",
    database: "web_login"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
