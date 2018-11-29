import React from 'react';
import {Link} from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
export default () =>{
    return (
        <div className='ui secondary pointing menu'>
            <Link to='/' className='item'>
                Streaming App
            </Link>
            <div className='right menu'>
            <Link to='/' className='item'>
                All Streams
            </Link>
            <GoogleAuth/>
            </div>
        </div>
    )
}