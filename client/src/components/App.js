import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import {StreamList, StreamCreate, StreamEdit, StreamDelete, StreamShow} from './streams';

export default () =>{
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route path='/' exact component={StreamList}/>
                    <Route path='/stream/new' exact component={StreamCreate}/>
                    <Route path='/stream/edit' exact component={StreamEdit}/>
                    <Route path='/stream/delete' exact component={StreamDelete}/>
                    <Route path='/stream/show' exact component={StreamShow}/>
                </div> 
            </BrowserRouter>
        </div>
    )
}
