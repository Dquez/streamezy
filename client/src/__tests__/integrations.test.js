import React from 'react';
import {mount} from 'enzyme';
import Root from '../Root';
import App from '../components/App';
import StreamForm from '../components/streams/StreamForm';
import Modal from '../components/Modal';
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

afterEach(()=>{
    wrapper.unmount();
})

describe('StreamList', ()=>{
    it('can display a list of streams from redux store', (done)=>{
        expect(wrapper.find('.celled').children().some('.stream')).toBeTruthy();
        done();
    })
})

describe('StreamCreate', ()=>{
    it('can display form to create a stream', (done)=>{
        wrapper.find('.create-stream').at(0).simulate('click',  { button: 0 });
        wrapper.update();
        expect(wrapper.containsMatchingElement(<StreamForm/>)).toBeTruthy();
        done();
    })
})

describe('StreamShow', ()=>{
    it("can display fetch a specific streams when you click on the stream's link tag", (done)=>{
        moxios.install();
        moxios.stubRequest('/api/streams/5c245be47ce56d21479e6eca', {
            status: 200,
            response: streams['5c245be47ce56d21479e6eca']
        })
        wrapper.find('.home').at(0).simulate('click',  { button: 0 });
        wrapper.find('.header').at(0).simulate('click',  { button: 0 });
        moxios.wait(()=> {
            wrapper.update();
            expect(wrapper.containsMatchingElement(<video/>)).toBeTruthy();
            moxios.uninstall();
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
    it('can update the form inputs and stream in the redux store/DB and display the updated stream once redirected', (done) =>{
        wrapper.find('input#title').simulate('change', {
            target: { value: 'Test' }
        })
        wrapper.find('input#description').simulate('change', {
            target: { value: 'edited' }
        })
        expect(wrapper.find('input#title').props().value).toEqual('Test')
        expect(wrapper.find('input#description').props().value).toEqual('edited')
        // mocking the patched stream that would be sent back from the server
        let editedStream = {...streams['5c245be47ce56d21479e6eca']};
        editedStream.title = 'Test';
        editedStream.description = 'edited';
        
        moxios.install();
        moxios.stubRequest('/api/streams/5c245be47ce56d21479e6eca', {
            status: 200,
            response: editedStream
        })
        wrapper.find('.form').simulate('submit');
        moxios.wait(()=> {
            wrapper.update();
            expect(wrapper.find('.header').at(1).text()).toEqual('Test');
            expect(wrapper.find('.description').text()).toEqual('edited');
            moxios.uninstall();
            done();
        }) 
    })
})

describe('StreamDelete', ()=>{
    it("can display a modal to delete a specific stream when you click on the delete button", ()=>{
        wrapper.find('.home').at(0).simulate('click',  { button: 0 });
        wrapper.find('.delete-stream').at(0).simulate('click',  { button: 0 });
        expect(wrapper.containsMatchingElement(<Modal/>)).toBeTruthy();   
    })
    // it('can update the form inputs and stream in the redux store/DB and display the updated stream once redirected', (done) =>{
    //     wrapper.find('input#title').simulate('change', {
    //         target: { value: 'Test' }
    //     })
    //     wrapper.find('input#description').simulate('change', {
    //         target: { value: 'edited' }
    //     })
    //     expect(wrapper.find('input#title').props().value).toEqual('Test')
    //     expect(wrapper.find('input#description').props().value).toEqual('edited')
    //     // mocking the patched stream that would be sent back from the server
    //     let editedStream = {...streams['5c245be47ce56d21479e6eca']};
    //     editedStream.title = 'Test';
    //     editedStream.description = 'edited';
        
    //     moxios.install();
    //     moxios.stubRequest('/api/streams/5c245be47ce56d21479e6eca', {
    //         status: 200,
    //         response: editedStream
    //     })
    //     wrapper.find('.form').simulate('submit');
    //     moxios.wait(()=> {
    //         wrapper.update();
    //         expect(wrapper.find('.header').at(1).text()).toEqual('Test');
    //         expect(wrapper.find('.description').text()).toEqual('edited');
    //         moxios.uninstall();
    //         done();
    //     }) 
    // })
})
