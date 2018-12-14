import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStream} from '../../actions';

class StreamShow extends Component{
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }
    renderStream = () =>{
        if(!this.props.stream){
            return <div>Loading stream...</div>
        }
        const {stream} = this.props;
        return (
            <div className="item">
                    {/* {this.renderAdminButtons(stream)} */}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {stream.title}
                    </div>
                    <div className="description">
                        {stream.description}
                    </div>
            </div>
        )
    }
    render(){
        return(
            <div>{this.renderStream()}</div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    const streamId = ownProps.match.params.id;
    return {stream: state.streams[streamId]}
}
export default connect(mapStateToProps, {fetchStream})(StreamShow);