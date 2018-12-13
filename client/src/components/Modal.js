import React from 'react';
import ReactDOM from 'react-dom';


const Modal = props =>{
    const {title, content, actions, onDismiss} = props;
    return ReactDOM.createPortal(
        <div 
        onClick={onDismiss}
        className='ui dimmer modals visible active'>
            <div 
            onClick={(e)=>{e.stopPropagation()}} 
            className='ui standard visible modal active'>
                <div className='header'>{title}</div>
                <div className='content'>{content}</div>
                <div className='actions'>{actions}</div>
            </div>
        </div>,
        document.getElementById('modal')
    )
}
export default Modal;