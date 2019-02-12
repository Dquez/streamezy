import React, {Component} from 'react';
import {createStream} from '../../actions';
import {connect} from 'react-redux';
import StreamForm from './StreamForm';
import history from '../../history';
import Modal from '../Modal';
import {Link} from 'react-router-dom';
import '../assets/css/StreamCreate.css';

class StreamCreate extends Component{
    onSubmit = formValues => {
        this.props.createStream(formValues);
    }
    renderContent() {
        return <StreamForm onSubmit={this.onSubmit}/>;
    }
    renderActions () {
        return <Link to='/' className='ui button'>X</Link>;
    }
    render(){
        return(
           <div className='StreamCreate'>
               <Modal 
                title='Create a Stream'
                content={this.renderContent()}
                onDismiss={()=>history.push('/')}
                actions={this.renderActions()}
                />
           </div>
        )
    }
}

export default connect(null, {createStream})(StreamCreate);