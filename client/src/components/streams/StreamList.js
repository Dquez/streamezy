import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStreams} from '../../actions';
import {Link} from 'react-router-dom';
import './StreamList.css';

class StreamList extends Component{
    componentDidMount(){
        this.props.fetchStreams()
    }

    renderAdminButtons = (stream) =>{
        if(this.props.currentUserId === stream.userId){
            return (
                <div className="right floated content">
                    <Link to={`/stream/edit/${stream._id}`} className="ui button primary edit-stream">Edit</Link>
                    <Link to={`/stream/delete/${stream._id}`} className="ui button negative delete-stream">Delete</Link>
                </div>
            )
        }
    }
    renderList = () =>{
        return this.props.streams.map(stream =>{
            return(
                <div className="item stream" key={stream._id}>
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/stream/${stream._id}`} className='header'>{stream.title}</Link>
                    </div>
                    <div className="description">
                        {stream.description}
                    </div>
                    {this.renderAdminButtons(stream)}
                </div>
            )
        })
    }
    renderCreateButton = () => {
        if(this.props.isSignedIn){
            return (
                <div className='create-stream' style={{textAlign: 'right'}}>
                    <Link to="/stream/new" className="ui button primary create-stream">Create Stream</Link>
                </div>  
            )
        }
    }
    render(){
        return(
            <div className='StreamList'>
                <div className='header-area'>
                <h2>Streams</h2>
                {this.renderCreateButton()}
                </div>
                
                
                <div className="ui celled List">
                {this.renderList()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapStateToProps, {fetchStreams})(StreamList);