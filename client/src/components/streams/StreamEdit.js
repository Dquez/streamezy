import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStream} from '../../actions';

class StreamEdit extends Component{
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }
    render(){
        if(!this.props.stream){
            return <div> Loading...</div>
        }
        return (
            <div>
                <div className="ui container">{this.props.stream.title}</div>
                <div className="ui container">{this.props.stream.description}</div>
            </div>   
        )
    }
    
}

function mapStateToProps(state, ownProps){
    const urlId = ownProps.match.params.id
    return { stream: state.streams[urlId]}
}

export default connect(mapStateToProps, {fetchStream})(StreamEdit);