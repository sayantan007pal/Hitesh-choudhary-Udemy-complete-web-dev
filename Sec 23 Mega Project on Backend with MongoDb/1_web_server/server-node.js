import http from 'http';

const hostName = '127.0.0.1';
const port = 3000;

const server = http.createServer((req,res)=>{
    
    if(req.url === '/'){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
}
    else if(req.url === '/ice-tea'){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('what kind of ice tea do you want?\n');

    }
    else{
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Page not found\n');
    }
});

server.listen(port,hostName,()=>{
    console.log(`Server running at http://${hostName}:${port}/`);
})