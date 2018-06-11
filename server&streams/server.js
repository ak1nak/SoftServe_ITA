const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');

const server = http.createServer((req, res) => {

    if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream(path.join(__dirname, "index.html"), "utf8").pipe(res);
    } else if (req.method === "POST") {        
        let body = "";
        let cws = fs.createWriteStream(path.join(__dirname, "form.txt"));

        req.on("data", (chunk) => {
            cws.write(chunk, (err) => { if (err) throw err; } );
            body += chunk;
        });

        req.on("end", () => {
            res.writeHead(200, { "Content-Type": "text/html" });
            cws.end();
            res.end(JSON.stringify(qs.parse(body)));            
        });
    } else {
        res.writeHead(401, { "Content-Type": "text/html" });
        res.end('Bad Request')
    }

}).listen(3000, () => {console.log("Server is working: ")});
 
