import React, {Component} from 'react';
import Modal from '../Modal';
import history from '../../history';
import {Link} from 'react-router-dom';
import {fetchStream, deleteStream} from '../../actions';
import {connect} from 'react-redux';

class StreamDelete extends Component{
    state = { streamId : this.props.match.params.id}
    componentDidMount(){
        this.props.fetchStream(this.state.streamId).then(()=>{
            if(this.props.currentUserId !== this.props.stream.userId) history.push('/')
        })
    }
    deleteStream = () =>{
        this.props.deleteStream(this.state.streamId)
    }
    renderActions = () =>{
        return (
            <>
                <button onClick={this.deleteStream} className='ui button negative'>
                    Delete
                </button>
                <Link to='/' className='ui button'>Cancel</Link>
            </>
        )
    }
    renderContent = () =>{
        if(!this.props.stream){
            return 'Are you sure you want to delete this stream?'
        }
        return `Are you sure you want to delete stream with title: ${this.props.stream.title}`
    }
    render(){
        return (
                <Modal 
                title='Delete Stream'
                content={this.renderContent()}
                onDismiss={()=>history.push('/')}
                actions={this.renderActions()}
                />
        )
    }  
}
const mapStateToProps = (state, ownProps) =>{
    const streamId = ownProps.match.params.id;
    return {
        stream: state.streams[streamId],
        currentUserId: state.auth.userId
    }
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);