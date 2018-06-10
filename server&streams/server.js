const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream(path.join(__dirname, "index.html"), "utf8").pipe(res);
    } else if (req.method === "POST") {
        
        let body = "";

        req.on("data", (chunk) => {
            fs.appendFile(path.join(__dirname, "form.txt"), chunk + '\r\n', (err) => { if (err) throw err; });
            body += chunk.toString();
        });

        req.on("end", () => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end((body.split('&').join('<br>')));
        });
    }

}).listen(3000, () => {console.log("Server is working: ")});
 
