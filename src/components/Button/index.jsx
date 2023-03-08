import './styles.css'

import React, { Component } from 'react';

export class Button extends Component {
    render() {
        const {texto, onClick, disabled} = this.props

        return (
            <button 
                onClick={onClick} 
                className="button"
                disabled={disabled}
            >
                {texto}
            </button>
        )
    }
}