// import React from "react";
// import {mount} from "enzyme";
// import Root from "../Root";
// import Articles from "../pages/Articles/ArticlesTest";
// import { MemoryRouter } from 'react-router-dom';
// import _ from "lodash";
// import moxios from "moxios";

// let wrapper;
// let articles;
// beforeEach(()=>{
//     articles = {
//         "5bdf3cbac9c86c12773555be" : {
//             date: "2018-11-04T18:38:50.758Z",
//             email: "dariellv7@gmail.com",
//             favorited: false,
//             note: "Read before applying for positions",
//             saveForLater: false,
//             tags: ["Tech", "Javascript"],
//             title: "ES6",
//             url: "https://github.com/DrkSephy/es6-cheatsheet",
//             _id: "5bdf3cbac9c86c12773555be"
//         },
//         "5bdf3cbac9c86c12773555bf": {
//             date: "2018-11-04T18:38:50.758Z",
//             email: "dariellv7@gmail.com",
//             favorited: false,
//             note: "Read before applying for positions",
//             saveForLater: false,
//             tags: ["Tech", "Javascript"],
//             title: "JS sorting algorithms",
//             url: "http://khan4019.github.io/front-end-Interview-Questions/sort.html#quickSort",
//             _id: "5bdf3cbac9c86c12773555bf"
//         },
//         "5bdf3cbac9c86c12773555c0": {
//             date: "2018-11-04T18:38:50.758Z",
//             email: "dariellv7@gmail.com",
//             favorited: false,
//             note: "Possible study material after graduation",
//             saveForLater: false,
//             tags: [],
//             title: "AI nanodegree term one",
//             url: "https://medium.com/udacity/ai-nanodegree-program-syllabus-term-1-in-depth-80c41297acaf",
//             _id: "5bdf3cbac9c86c12773555c0"
//         }
//     }
//     const initialState = {articles};

//     wrapper = mount(
//         <MemoryRouter>
//             <Root initialState={initialState}>
//                 <Articles/>
//             </Root>
//          </MemoryRouter>
//     )
// });

// describe("articlePage component", ()=>{
// ''
//     beforeEach(()=>{
//         wrapper.find(Articles).children().setState({isLoggedIn:true});
//     })
//     afterEach(()=>{
//         wrapper.unmount()
//     })
//     it("can display a list of articles from redux store and display one LI per article", (done)=>{
//         expect(wrapper.find(".list-group-item").length).toEqual(3);
//         done();
//     })
    
//     it("can remove an article when delete button is clicked", (done)=>{
//         // When button is clicked, it sends a delete request to the server, so we have to stub out that request from the jsdom and also make our code work with asynchronouse rendering, which is why we use moxios.wait
//         moxios.install();
//         moxios.stubRequest("/api/article/5bdf3cbac9c86c12773555be", {
//             status: 200,
//             response: _.omit(articles, "5bdf3cbac9c86c12773555be")
//         })

//         wrapper.find(".delete-btn").at(0).simulate("click");
//         moxios.wait(()=> {
//             wrapper.update();
//             expect(wrapper.find(".list-group-item").length).toEqual(2);
//             done();
//             moxios.uninstall();
//         })         
//     })
//     it("can move an article from priority to backlog and vice versa when appropriate button is clicked", (done)=>{
//         const response = {
//             date: "2018-11-04T18:38:50.758Z",
//             email: "dariellv7@gmail.com",
//             note: "Read before applying for positions",
//             favorited: false,
//             saveForLater: true,
//             tags: ["Tech", "Javascript"],
//             title: "ES6",
//             url: "https://github.com/DrkSephy/es6-cheatsheet",
//             _id: "5bdf3cbac9c86c12773555be"
//         }

//         // When button is clicked, it sends a delete request to the server, so we have to stub out that request from the jsdom and also make our code work with asynchronouse rendering, which is why we use moxios.wait
//         moxios.install();
//         moxios.stubRequest("/api/articles/5bdf3cbac9c86c12773555be", {
//             status: 200,
//             response
//         })    
//         // expect nothing to be in backlog area before you click a button
//         expect(wrapper.find(".mid-articles").contains("Nothing on backlog yet"))
//         // this click event initiates the saveForLater action
//         wrapper.find(".glyphicon-send").at(0).simulate("click");
//         moxios.wait(()=> {
//             wrapper.update();
//             // the glpyhicon-hourglass class is only present on the backlogged articles which have the icon
//             expect(wrapper.find(".glyphicon-hourglass").length).toEqual(1);
//             // change the response to stub the request to the server with new data
//             response.saveForLater = false;
//             wrapper.find(".glyphicon-hourglass").simulate("click");
//             // we need a second moxios async request in order to mock the second saveForLater action creator call
//             moxios.wait(()=> {
//                 wrapper.update();
//                 // once again, there are no articles in the middle/backlog section
//                 expect(wrapper.find(".mid-articles").contains("Nothing on backlog yet"))
//                 expect(wrapper.find(".glyphicon-hourglass").length).toEqual(0);
//                 done()
//             })
//         })
//     })
    
//     it("can render articles in the .right-articles container when searching for existing articles", ()=>{    
//         // simulate typing into the search bar
//         wrapper.find('.right-articles').childAt(0).simulate('change', {
//             target: { value: 'es6' }
//         })
//         // expect there to be at least one article when you type ES6
//         expect(wrapper.find('.mid-articles').children().hasClass("list-group-item"));
//     })
// })