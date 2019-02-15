# Streamezy

Streamezy is a MERN-redux, single-page web application that allows users to create, read, update and delete their streams. It's a lightweight alternative to streaming services such as twitch.tv and panopto to host your live stream to an audience.

[![Streamezy Thumbnail](https://res.cloudinary.com/dquez/image/upload/v1550112111/Streamezy_y0iwuw.png)](https://youtu.be/wfCMtPluhVY)

## Getting Started
**Assuming you have MongoDB installed** `mongod`
* *in a new terminal window* `mongo`


* With Docker
`docker-compose up --build`

* Without Docker
* *in a new terminal window* `cd server` `npm start`
* *in a new terminal window* `cd client` `npm start`
* *in a new terminal window* `cd rtmp` `npm start`

## Built With

* [auth0](https://developers.google.com/identity/protocols/OAuth2) - Client Side Javascript authentication service
* [axios](https://www.npmjs.com/package/axios) - Make XMLHttpRequests from the browser
* [docker](https://www.docker.com) - Packaged Software into Standardized Units for Development, Shipment and Deployment
* [enzyme](https://airbnb.io/enzyme/) - Enzyme is a JavaScript Testing utility for React
* [express](https://www.npmjs.com/package/express) - Framework we used to handle HTTP requests
* [jest](https://jestjs.io/) - Front-end JavaScript testing library with little configuration required. 
* [mongoose](https://www.npmjs.com/package/mongoose) Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
* [node-media-server](https://www.npmjs.com/package/node-media-server) - A Node.js implementation of RTMP/HTTP-FLV/WS-FLV/HLS/DASH Media Server
* [react](https://reactjs.org/) - A JavaScript library for building component-based user interfaces
* [react-router-dom](https://www.npmjs.com/package/react-router) - Enables client-side routing and component rendering
* [redux](https://redux.js.org/) - Enables client-side predictable state containers
* [redux-form](https://redux-form.com) - Facilitates form to redux state integration
* [redux-thunk](https://github.com/reduxjs/redux-thunk/) - Thunk middleware for Redux, enables actions to return functions.
* [semantic ui](https://semantic-ui.com/) - Front-end framework for styling
* [travis-ci](https://travis-ci.org) - Travis CI is a hosted, distributed continuous integration service used to build and test software projects hosted at GitHub.

## Caveats
In order for your OBS to connect to your rtmp server
`settings > Stream >` *In the url section insert* `rtmp://localhost/live` > *In the stream key section* ID of created stream *this will be in the URL address once you've created a stream and visited the stream's page*


## Inspiration
As a course assistant for Columbia's coding bootcamp, I noticed there were issues with the streaming service, panopto, that could be easily fixed. I wanted a way to avoid the pain point of having to log in with specific credentials to create a live video, which would then be uploaded to a proprietary application for students to view later on if they weren't watching it live. With Streamezy, you just create your live stream, send the URL out, and you can view the stream with a minimal time lag (about 5-10 seconds).  

## How I built it
After the initial mockups and designs were created, divided my code into separate modules, one for each docker container. I initially had to run each server on a different terminal window but with the help of `docker-compose`, I'm able to run all containers at once.
My process:
 * Wireframes
 * Front-end boilerplate code using `create-react-app`
 * `json-server` for the "backend" server 
 * Authentication for the client-side web app.
 * Create separate stream components for each CRUD operation
 * Hooked up application to Redux
 * Added testing with Jest/Enzyme
 * Create separate docker files for each service, *API*, *nginx*, *client*, *rtmp*
 * Set up CI using Travis.yml file
 * Refactor backend from JSON-server to node-express server with MongoDB
 * Finish updated design
The front-end for the web app is built with react, redux, react-router, and semantic ui. The backend is built with a node server, express, MongoDB using mongoose as an ODM, nginx to dictate upstream requests, rtmp server for streaming service.

## Challenges I ran into
All though I've created full stack web apps, this was the first time I had other moving pieces besides a backend and frontend server. That said, having nginx determine where requests were routed to posed a challenge at first, but eventually became intuitive and integral for dockerizing my components. My second biggest issue was having the dockerized rtmp server communicate with my local machine after using `docker-compose up`. This issue was solved by exposing the correct ports for the nginx and rtmp containers.

* Develop an intuitive alternative to streaming applications to have a lower barrier of entry
* Create a better experience for instructors and teachers who are trying to live stream their lessons to remote students
* Integrate multiple dependencies to work at the same time `nginx`, `rtmp server`, `client app`, `API server`. 
* Deploy bundled containers to hosting service. 

## Accomplishments that I'm proud of
Getting all containers to play nicely with each other was extremely rewarding. Also, learning new technologies, including how to work with the rtmp server and nginx. Seamlessly integrating all services into one repo proved to be a great accomplishment.

## What I learned
I learned how beneficial it is to take a step back and try to understand what's really going on under the hood. This was the case with nginx and proxying to each individual service. I also took this project as an opportunity to dive deeper into CSS grid and CSS flex-box.

## What's next for Streamezy
I'd like to scale this app so it's available to a large audience. It's already dockerized, so now I'd like to deploy it to AWS. Another major feature I'd like to add is the ability to save stream files to the database (S3 bucket). That way, users can visit streams that were created before but aren't live anymore.


## Author

- [Dariell Vasquez](https://github.com/Dquez)
