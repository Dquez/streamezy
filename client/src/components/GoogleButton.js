import React from 'react';

export default ({text, onClick}) =>{
    return (
        <button onClick={onClick} className='ui red google button'>
            <i className='google icon'/>
            {text}
        </button>
    )
    
}