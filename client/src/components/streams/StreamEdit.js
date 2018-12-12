import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {fetchStream, editStream} from '../../actions';
import StreamForm from './StreamForm'

class StreamEdit extends Component{
    state = { streamId : this.props.match.params.id}
    componentDidMount(){
        this.props.fetchStream(this.state.streamId)
    }
    onSubmit = formValues =>{
        console.log(this.state.streamId);
        this.props.editStream(this.state.streamId, formValues);
    }
    render(){
        if(!this.props.stream){
            return <div> Loading...</div>
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm 
                initialValues={_.pick(this.props.stream, 'title', 'description')}
                onSubmit={this.onSubmit} />
            </div>   
        )
    }
    
}

function mapStateToProps(state, ownProps){
    const urlId = ownProps.match.params.id
    return { stream: state.streams[urlId]}
}

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);