import {serve} from 'bun';

serve({
    fetch(req) {
        const url = new URL(req.url);
        if(url.pathname === '/'){
            return new Response('Hello World');
        }   
        else if(url.pathname === '/ice-tea'){
            return new Response('what kind of ice tea do you want?');
        }
        else{
            return new Response('Page not found', {status:404});
        }
        
    },
    port:3000,
    hostname:'127.0.0.1'
})

