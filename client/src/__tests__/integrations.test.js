import React from 'react';
import {mount,shallow} from 'enzyme';
import Root from '../Root';
import App from '../components/AppTest';
import StreamForm from '../components/streams/StreamForm';
// import StreamList from '../components/streams/StreamList';
// import {Router} from 'react-router-dom';
import _ from 'lodash';
import moxios from 'moxios';

let wrapper;
let streams;
let auth;
let initialState;
beforeEach(()=>{
    streams = {
        '5c245be47ce56d21479e6eca': {
            _id: '5c245be47ce56d21479e6eca',
            title: 'Stream test',
            description: 'streams',
            userId: '104172360244756468300'
        }  
    }
    auth = {
        isSignedIn: true,
        userId: '104172360244756468300'
    }
    initialState = {streams, auth};

    wrapper = mount(
            <Root initialState={initialState}>
                <App/>
            </Root>
    )
});

describe('The home page', ()=>{
    afterEach(()=>{
        wrapper.unmount();
    })
    it('can display a list of streams from redux store', (done)=>{
        expect(wrapper.find('.celled').children().some('.stream')).toBeTruthy();
        done();
    })
})

describe('CreateForm', ()=>{
    it('can display form to create a stream', (done)=>{
        wrapper.find('.create-stream').at(0).simulate('click',  { button: 0 });
        wrapper.update();
        expect(wrapper.containsMatchingElement(<StreamForm/>)).toBeTruthy();
        done();
    })
})

// describe('StreamShow', ()=>{
//     it("can display fetch a specific streams when you click on the stream's link tag", (done)=>{
//         moxios.install();
//         moxios.stubRequest('/api/streams/5c245be47ce56d21479e6eca', {
//             status: 200,
//             response: streams['5c245be47ce56d21479e6eca']
//         })
//         wrapper.find('.header').at(0).simulate('click',  { button: 0 });
//         moxios.wait(()=> {
//             wrapper.update();
//             expect(wrapper.containsMatchingElement(<video/>)).toBeTruthy();
//             done();
//             moxios.uninstall();
//         })    
//     })
// })

