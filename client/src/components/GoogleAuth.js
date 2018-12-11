import React, {Component} from 'react';
import GoogleButton from './GoogleButton';
import {connect} from 'react-redux';
import {signIn,signOut} from '../actions'

class GoogleAuth extends Component{
    componentDidMount(){
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({
                clientId: '151864372169-qv34mmgkkhfu1uubfnbfc8r722im758q.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        })
    }
    onAuthChange = (isSignedIn) =>{
        return isSignedIn ? this.props.signIn(this.auth.currentUser.get().getId()) : this.props.signOut()
     }
    signIn = () =>{
        this.auth.signIn()
    } 
    signOut = () =>{
        this.auth.signOut()
    } 
    renderAuth(){
        const {isSignedIn} = this.props;
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

const mapStateToProps = state =>{
    return {isSignedIn: state.auth.isSignedIn}
}
export default connect(mapStateToProps, {signIn,signOut})(GoogleAuth)