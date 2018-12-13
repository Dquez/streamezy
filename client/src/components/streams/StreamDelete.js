import React, {Component} from 'react';
import Modal from '../Modal';
import history from '../../history';
import {fetchStream} from '../../actions';
import {connect} from 'react-redux';

class StreamDelete extends Component{
    state = { streamId : this.props.match.params.id}
    componentDidMount(){
        this.props.fetchStream(this.state.streamId)
    }
    render(){
        const actions = (
            <React.Fragment>
                <button className='ui button negative'>Delete</button>
                <button className='ui button'>Cancel</button>
            </React.Fragment>
        )
        if(!this.props.stream) return <div>Loading...</div>
        return (
            <div>
                Stream Delete
                <Modal 
                title='Delete Stream'
                content={`Are you sure you want to delete the ${this.props.stream.title} stream?`}
                onDismiss={()=>history.push('/')}
                actions={actions}
                />
            </div>
        )
    }  
}
const mapStateToProps = (state, ownProps) =>{
    const streamId = ownProps.match.params.id;
    return {stream: state.streams[streamId]}
}

export default connect(mapStateToProps, {fetchStream})(StreamDelete);