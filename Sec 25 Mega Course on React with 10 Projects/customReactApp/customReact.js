function customRender(reactElement, container){
    const elementType = reactElement.type;
    const elementProps = reactElement.props;
    const elementChildren = reactElement.children;

    const domElement = document.createElement(elementType);
    domElement.innerHTML = elementChildren || '';
    domElement.setAttribute('href', elementProps.href || '');
    domElement.setAttribute('target', elementProps.target || '');

    for(const prop in elementProps){
        if (prop === 'children') continue;
        domElement[prop] = elementProps[prop];
        container.appendChild(domElement);
    }

    if(typeof elementChildren === 'string' || typeof elementChildren === 'number'){
        domElement.textContent = elementChildren;
    } else if(Array.isArray(elementChildren)){
        elementChildren.forEach(child => {
            if(typeof child === 'object'){
                const childElement = customRender(child, domElement);
                domElement.appendChild(childElement);
            } else {
                const textNode = document.createTextNode(child);
                domElement.appendChild(textNode);
            }
        });
    } else if(typeof elementChildren === 'object'){
        const childElement = customRender(elementChildren, domElement);
        domElement.appendChild(childElement);
    }

    return domElement;
}



const reactElement = {
    type: 'a',
    props:{
        href: 'https://www.google.com',
        target: '_blank',
    },
    children: 'Go to Google'
}

const mainContainer = document.getElementById('root');

customRender(reactElement, mainContainer);
