import React from 'react'
import { render } from 'react-dom'
import Root from './components/Root'

function component() {
    const element = document.createElement('div');
    render(<Root />, element)
    return element;
}

document.body.appendChild(component());