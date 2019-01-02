import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'; 

class StreamForm extends Component{
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
                <input id={input.name} {...input}/>
                {this.renderError(meta)}
            </div>
        ) 
    }
    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }
    
    render(){
        return(
            <form 
            // onSubmit is the plain form function, this.props.handleSubmit is the prop from Redux form which gets the callback we created, onSubmit, as an argument
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className="ui form error">
                <Field name='title' component={this.renderInput} label="Enter Title"/>
                <Field name='description'  component={this.renderInput} label="Enter Description"/>
                <button id='submit' className="ui button primary">Submit</button>
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

export default reduxForm({
        form: 'streamForm',
        validate
    })(StreamForm)