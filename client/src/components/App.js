import React from 'react';
import history from '../history';
import {Router, Route} from 'react-router-dom'
import {StreamList, StreamCreate, StreamEdit, StreamDelete, StreamShow} from './streams';
import Header from './Header';
export default () =>{
    return (
        <div>
            
            <Router history={history}>
                <div>
                    <Header/>
                    <Route path='/' exact component={StreamList}/>
                    <Route path='/stream/new' exact component={StreamCreate}/>
                    <Route path='/stream/edit/:id' exact component={StreamEdit}/>
                    <Route path='/stream/delete/:id' exact component={StreamDelete}/>
                    <Route path='/stream/show' exact component={StreamShow}/>
                </div> 
            </Router>
        </div>
    )
}