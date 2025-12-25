import http from "http";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

const port = 8080;
const server = http.createServer((req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filepath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    console.log(filepath);
    const extname = String(path.extname(filepath)).toLowerCase();
    const mimeTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpg",
        ".wav": "audio/wav",
        ".mp4": "video/mp4",
        ".webm": "video/webm",
        ".webp": "image/webp",
    };
    const contentType = mimeTypes[extname] || "application/octet-stream";
    try {
        const content = fs.readFileSync(filepath);
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf-8");
    } catch (err) {
        // Log only the missing file, not the full stack trace
        console.log(`404 Not Found: ${req.url}`);
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404 Not Found");
    }
    
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
