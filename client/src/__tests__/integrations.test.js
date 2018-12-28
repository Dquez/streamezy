import React from "react";
import {mount} from "enzyme";
import Root from "../Root";
import App from "../components/AppTest";
// import { MemoryRouter } from 'react-router-dom';
import _ from "lodash";
import moxios from "moxios";

let wrapper;
let streams;
beforeEach(()=>{
    streams = {
        '5c245be47ce56d21479e6eca': {
            _id: '5c245be47ce56d21479e6eca',
            title: 'Stream test',
            description: 'streams',
            userId: '104172360244756468300'
        }  
    }
    const initialState = {streams};

    wrapper = mount(
            <Root initialState={initialState}>
                <App/>
            </Root>
    )
});

describe('App component', ()=>{
    afterEach(()=>{
        wrapper.unmount()
    })
    it("can display a list of streams from redux store", (done)=>{
        expect(wrapper.find(".celled").children().some('.stream')).toBeTruthy();
        done();
    })
    it("can display fetch a specific streams when you click on the stream's link tag", (done)=>{
        moxios.install();
        moxios.stubRequest("/api/streams/5c245be47ce56d21479e6eca", {
            status: 200,
            response: streams['5c245be47ce56d21479e6eca']
        })
        wrapper.find(".header").at(0).simulate('click',  { button: 0 });
        // check if this alters the DOM for other it statements
        moxios.wait(()=> {
            wrapper.update();
            console.log(wrapper.debug())
            expect(wrapper.containsMatchingElement('<video/>'));
            done();
            moxios.uninstall();
        })    
    })
})