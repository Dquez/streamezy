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
                <div className="item stream ui card" key={stream._id}>
                    <div className="image">
                    <img src="https://via.placeholder.com/400.png?text=Placeholder" alt='placeholder'/>
                    </div>
                    <div className="content">
                        <Link to={`/stream/${stream._id}`} className='header'>{stream.title}</Link>
                    </div>
                    <div className="description">
                        {stream.description}
                    </div>
                    <div className="extra content">
                        {this.renderAdminButtons(stream)}
                    </div>
                    
                </div>
            )
        })
    }
    renderCreateButton = () => {
        if(this.props.isSignedIn){
            return (
                <div className='create-stream'>
                    <Link to="/stream/new" className="ui button primary create-stream">Create Stream</Link>
                </div>  
            )
        }
    }
    render(){
        return(
            <div className='StreamList'>
                <div className='header-area'>
                <h2>Current Streams</h2>
                {this.renderCreateButton()}
                </div>
                <div className="ui cards List" id='List'>
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