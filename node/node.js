const http = require ('http');
const fs = require ('fs');
const path = require ('path');

const server = http.createServer((req,res) => {
    let filePath='';
    switch (req.url){
        case '/':
            filePath = path.join(__dirname,'index.html');
            break;
        case '/about':
            filePath = path.join(__dirname,'about.html');
            break;
        case '/contact':
            filePath = path.join(__dirname,'contact-me.html');
            break;
        default:
            filePath = path.join(__dirname,'404.html');
            break;
    }
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.end('<h1>500 - Internal Server Error</h1>');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
}); 
