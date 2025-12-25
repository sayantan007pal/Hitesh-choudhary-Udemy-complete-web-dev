/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 📌 NODE.JS HTTP SERVER - A Static File Server from Scratch
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * @summary
 * This is a basic HTTP server built using Node.js's native `http` module.
 * It serves static files (HTML, CSS, JS, images, etc.) to the browser.
 * This is the foundation of how web servers like Express.js work internally!
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 🎯 KEY CONCEPTS COVERED
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * 1️⃣ HTTP MODULE (Node.js Built-in)
 *    - `http.createServer()` creates a server that listens for requests
 *    - Takes a callback function with (request, response) parameters
 *    - `req` = Incoming request from browser (URL, method, headers)
 *    - `res` = Response we send back (HTML, JSON, files, etc.)
 *    
 *    📖 Analogy: Like a restaurant. The server (http) takes orders (req) 
 *               and delivers food (res) to customers (browsers).
 * 
 * 2️⃣ REQUEST-RESPONSE CYCLE
 *    ┌──────────┐         HTTP Request          ┌──────────┐
 *    │  Client  │ ─────────────────────────────▶│  Server  │
 *    │ (Browser)│                               │ (Node.js)│
 *    │          │ ◀─────────────────────────────│          │
 *    └──────────┘         HTTP Response         └──────────┘
 *    
 *    Browser asks: "GET /about.html"
 *    Server responds: File content + status code (200 OK / 404 Not Found)
 * 
 * 3️⃣ STATIC FILE SERVING
 *    - Server reads files from disk using `fs.readFileSync()`
 *    - Determines file type using extension (.html, .css, .js, etc.)
 *    - Sends file content with correct Content-Type header
 *    
 *    📖 Analogy: Like a librarian. You ask for a book (file), they 
 *               find it on the shelf (disk) and give it to you.
 * 
 * 4️⃣ MIME TYPES (Content-Type Header)
 *    - Tells browser HOW to interpret the file
 *    - "text/html" → Render as webpage
 *    - "text/css" → Apply as stylesheet
 *    - "image/png" → Display as image
 *    - Without correct MIME type, browser may not handle file correctly!
 *    
 *    📖 Analogy: Like labeling a package. "FRAGILE" or "FOOD" tells 
 *               the delivery person how to handle it.
 * 
 * 5️⃣ ES MODULES & __dirname WORKAROUND
 *    - In CommonJS: `__dirname` gives current folder path (built-in)
 *    - In ES Modules: `__dirname` is NOT available!
 *    - We must create it ourselves:
 *      ```
 *      const __filename = fileURLToPath(import.meta.url);
 *      const __dirname = path.dirname(__filename);
 *      ```
 *    
 *    WHY? ES modules use URLs, not file paths. We convert URL to path.
 * 
 * 6️⃣ PATH MODULE
 *    - `path.join()` → Safely joins path segments (handles / vs \ on OS)
 *    - `path.extname()` → Gets file extension (.html, .css, etc.)
 *    - `path.dirname()` → Gets directory name from full path
 *    
 *    ⚠️ Never manually concatenate paths with + or /
 *       Use path.join() for cross-platform compatibility!
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 📊 REQUEST FLOW DIAGRAM
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 *    Browser visits: http://localhost:8080/about.html
 *                          │
 *                          ▼
 *   ┌──────────────────────────────────────────────────────────────────────┐
 *   │                    SERVER RECEIVES REQUEST                           │
 *   │  req.url = "/about.html"                                             │
 *   └───────────────────────────┬──────────────────────────────────────────┘
 *                               │
 *                               ▼
 *   ┌──────────────────────────────────────────────────────────────────────┐
 *   │                    BUILD FILE PATH                                   │
 *   │  filepath = path.join(__dirname, req.url)                           │
 *   │  Result: "/Users/.../server/about.html"                              │
 *   └───────────────────────────┬──────────────────────────────────────────┘
 *                               │
 *                               ▼
 *   ┌──────────────────────────────────────────────────────────────────────┐
 *   │                    DETERMINE CONTENT TYPE                            │
 *   │  extname = ".html" → contentType = "text/html"                       │
 *   └───────────────────────────┬──────────────────────────────────────────┘
 *                               │
 *                               ▼
 *   ┌──────────────────────────────────────────────────────────────────────┐
 *   │                    READ & SEND FILE                                  │
 *   │  try {                                                               │
 *   │      content = fs.readFileSync(filepath)  ← File exists? Read it!   │
 *   │      res.writeHead(200, {"Content-Type": "text/html"})              │
 *   │      res.end(content)  ← Send to browser                            │
 *   │  } catch {                                                           │
 *   │      res.writeHead(404)  ← File not found!                          │
 *   │      res.end("404 Not Found")                                       │
 *   │  }                                                                   │
 *   └──────────────────────────────────────────────────────────────────────┘
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 💡 INTERVIEW CHEAT SHEET
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * Q: What is http.createServer()?
 * A: A Node.js method that creates an HTTP server. It takes a callback 
 *    function that runs for every incoming request. The callback receives
 *    (req, res) - the request and response objects.
 * 
 * Q: What is the difference between req and res?
 * A: `req` (request) = Information FROM the client (URL, method, headers)
 *    `res` (response) = What we send BACK to the client (HTML, status code)
 * 
 * Q: What is res.writeHead() and res.end()?
 * A: writeHead(statusCode, headers) → Sets status (200, 404) and headers
 *    end(content) → Sends the response body and closes the connection
 * 
 * Q: Why do we need MIME types?
 * A: Browsers need to know how to handle the file. Without Content-Type,
 *    a browser might download a .html file instead of rendering it.
 * 
 * Q: Why is __dirname not available in ES modules?
 * A: ES modules use URLs internally, not file paths. CommonJS uses file
 *    paths directly. We use fileURLToPath() to convert URL to path.
 * 
 * Q: What is the purpose of path.join()?
 * A: Safely joins path segments. It handles: 
 *    - Windows (backslash \) vs Unix (forward slash /)
 *    - Prevents directory traversal attacks (../)
 *    - Never use string concatenation for paths!
 * 
 * Q: What happens when a file is not found?
 * A: The try/catch block catches the error from fs.readFileSync(),
 *    then we send a 404 status code with "Not Found" message.
 * 
 * Q: What does server.listen(port) do?
 * A: Starts the server and makes it listen for incoming connections
 *    on the specified port. The server runs indefinitely until stopped.
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️ COMMON GOTCHAS
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * 1. FAVICON.ICO ERROR
 *    - Browsers automatically request /favicon.ico for tab icon
 *    - If file doesn't exist, server returns 404 (this is normal!)
 *    - To fix: Add a favicon.ico file OR ignore the request
 * 
 * 2. ES MODULE WARNING
 *    - "Module type not specified" warning appears because we use
 *      ES module syntax (import) without package.json type: "module"
 *    - Fix: Create package.json with {"type": "module"}
 * 
 * 3. PORT ALREADY IN USE
 *    - Error: EADDRINUSE means another process is using port 8080
 *    - Fix: Kill the other process OR use a different port
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 🆚 THIS SERVER vs EXPRESS.JS
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 *    ┌──────────────────────┬──────────────────────────────────────────────┐
 *    │    THIS SERVER       │           EXPRESS.JS                         │
 *    ├──────────────────────┼──────────────────────────────────────────────┤
 *    │ http.createServer()  │ express()                                    │
 *    │ Manual URL routing   │ app.get('/path', handler)                    │
 *    │ Manual file serving  │ express.static('folder')                     │
 *    │ Manual MIME types    │ Automatic MIME detection                     │
 *    │ Manual error handling│ Built-in error middleware                    │
 *    │ ~40 lines of code    │ ~5 lines for same functionality             │
 *    └──────────────────────┴──────────────────────────────────────────────┘
 *    
 *    Express.js is built ON TOP of http module. Learning raw http helps
 *    you understand what Express does under the hood!
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

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
