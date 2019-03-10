import React from 'react';
import {mount} from 'enzyme';
import Root from '../Root';
import App from '../components/App';
import StreamForm from '../components/streams/StreamForm';
import Modal from '../components/Modal';
// import _ from 'lodash';
import moxios from 'moxios';

let wrapper;
let streams;
let auth;
let initialState;
beforeEach(()=>{
    streams = {
        '5c4651cb635e6ef3a1690b5c': {
            _id: '5c4651cb635e6ef3a1690b5c',
            title: 'My first Stream',
            description: 'Streamezy',
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

afterEach(()=>{
    wrapper.unmount();
})

describe('StreamList', ()=>{
    it('can display a list of streams from redux store', ()=>{
        expect(wrapper.find('.List').children().some('.stream')).toBeTruthy();
    })
})

describe('StreamCreate', ()=>{
    it('can display form to create a stream', ()=>{
        wrapper.find('.create-stream').at(1).simulate('click',  { button: 0 });
        wrapper.update();
        expect(wrapper.containsMatchingElement(<StreamForm/>)).toBeTruthy();
    })
})

describe('StreamShow', ()=>{
    it("can display a specific stream when you click on the stream's link tag", (done)=>{
        wrapper.find('.home').at(0).simulate('click',  { button: 0 });
        wrapper.find('.header').at(0).simulate('click',  { button: 0 });
        moxios.wait(()=> {
            // if(!wrapper.find('.video').exists()) {
            //     // this test passes or fails inconsistently so I created a failsafe
            //     done();
            //     return;
            // }
            expect(wrapper.find('.video').exists()).toEqual(true);
            done();
        })    
    })
})

describe('StreamEdit', ()=>{
    it("can display a form to edit a specific stream when you click on the edit button", ()=>{
        wrapper.find('.home').at(0).simulate('click',  { button: 0 });
        wrapper.find('.edit-stream').at(0).simulate('click',  { button: 0 });
        expect(wrapper.containsMatchingElement(<StreamForm/>)).toBeTruthy();   
    })
    // it('can update the form inputs and streams in redux store once form is submitted', (done) =>{
    //     wrapper.find('input#title').simulate('change', {
    //         target: { value: 'Edited' }
    //     })
    //     wrapper.find('input#description').simulate('change', {
    //         target: { value: 'new stream' }
    //     })
    //     expect(wrapper.find('input#title').props().value).toEqual('Edited')
    //     expect(wrapper.find('input#description').props().value).toEqual('new stream');
    //     wrapper.find('.form').simulate('submit');
    //     moxios.wait(()=> {
    //         wrapper.find('.home').at(0).simulate('click',  { button: 0 });
    //         expect(wrapper.find('.header').at(1).text()).toEqual('Edited');
    //         expect(wrapper.find('.description').at(0).text()).toEqual('new stream');
    //         done();
    //     }) 
    // })
})

describe('StreamDelete', ()=>{
    it("can display a modal to delete a specific stream when you click on the delete button from the homepage", ()=>{
        wrapper.find('.home').at(0).simulate('click',  { button: 0 });
        wrapper.find('.delete-stream').at(0).simulate('click',  { button: 0 });
        expect(wrapper.containsMatchingElement(<Modal/>)).toBeTruthy();   
    })
})
