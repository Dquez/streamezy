import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {fetchStream, editStream} from '../../actions';
import StreamForm from './StreamForm'
import Modal from '../Modal';
import {Link} from 'react-router-dom';
import history from '../../history';
import '../assets/css/StreamEdit.css';

class StreamEdit extends Component{
    state = { streamId : this.props.match.params.id}
    componentDidMount(){
        this.props.fetchStream(this.state.streamId)
    }
    onSubmit = formValues =>{
        this.props.editStream(this.state.streamId, formValues);
    }
    renderContent () {
        return <StreamForm 
                    initialValues={_.pick(this.props.stream, 'title', 'description')}
                    onSubmit={this.onSubmit} 
                />;
    }
    renderActions () {
        return <Link to='/' className='ui button'>X</Link>;
    }
    render(){
        const {stream} = this.props;
        if(!stream){
            return  (
                <div className='donut-parent'>
                    <div className='donut'></div> 
                </div>
            )
        }
        return (
            <div className='StreamEdit'>
                <Modal 
                    title={`Edit ${stream ? stream.title : ' Stream'}`}
                    content={this.renderContent()}
                    onDismiss={()=> history.push('/')}
                    actions={this.renderActions()}
                />
            </div>   
        )
    }
    
}

function mapStateToProps(state, ownProps){
    const urlId = ownProps.match.params.id
    return { stream: state.streams[urlId]}
}

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);

