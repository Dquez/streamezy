import React, {Component} from 'react';
import GoogleButton from './GoogleButton';
export default class GoogleAuth extends Component{
    state = {isSignedIn: null}
    componentDidMount(){
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({
                clientId: '151864372169-qv34mmgkkhfu1uubfnbfc8r722im758q.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({
                    isSignedIn: this.auth.isSignedIn.get()
                })
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        })
    }
    onAuthChange = () =>{
        this.setState({isSignedIn: this.auth.isSignedIn.get()})
    }
    signIn (){
        this.auth.signIn()
    } 
    signOut (){
        this.auth.signOut()
    } 
    renderAuth(){
        const {isSignedIn} = this.state;
        return(
            isSignedIn === null ? <GoogleButton onClick={()=>this.signIn()} text="Google Auth"/> :
            isSignedIn ?   <GoogleButton onClick={()=>this.signOut()} text="Log out"/> : 
            <GoogleButton onClick={()=>this.signIn()} text="Log in"/>
        )
        
    }
    render(){
        return(
            <div>{this.renderAuth()}</div>
            
        )
    }
}