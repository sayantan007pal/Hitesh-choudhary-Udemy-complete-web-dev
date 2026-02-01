import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';



const aReactElement = React.createElement('a', {href: 'https://www.google.com', target: '_blank'}, 'Go to Google');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    // <App />,
    aReactElement

);

