import React from "react";
import {mount} from "enzyme";
import Root from "../Root";
import App from "../components/App";
import { MemoryRouter } from 'react-router-dom';
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
        <MemoryRouter>
            <Root initialState={initialState}>
                <App/>
            </Root>
         </MemoryRouter>
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
})