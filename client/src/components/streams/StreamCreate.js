import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {createStream} from '../../actions';
import {connect} from 'react-redux';
import {compose} from 'redux'; 
class StreamCreate extends Component{
    renderError({error, touched}) {

        if(touched && error){
            return(
                <div className='ui error message'>
                    <div className='header'>{error}</div>
                </div>
            )
        }
    }
    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input}/>
                {this.renderError(meta)}
            </div>
        ) 
    }
    onSubmit = formValues => {
        console.log(formValues)
        // console.log(this.props);
        this.props.createStream(formValues);

    }
    render(){
        return(
            <form 
            // onSubmit is the plain form function, this.props.handleSubmit is the prop from Redux form which gets the callback we created, onSubmit, as an argument
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className="ui form error">
                <Field name='title' component={this.renderInput} label="Enter Title"/>
                <Field name='description'  component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
            
        )
    }
}



const validate = (formValues) => {
    const errors = {};
    if(!formValues.title){
        errors.title = "You must enter a title!"
    }
    if(!formValues.description){
        errors.description = "You must enter a description!"
    }
    return errors;
}

// export default reduxForm({
//     form: 'streamCreate',
//     validate
// })(StreamCreate);


export default compose(
    connect(null, {createStream}),
    reduxForm({
        form: 'streamCreate',
        validate
    }))(StreamCreate)