import React, { Component } from 'react';
import { Formik, Form } from "formik";
import Field from './Field';
import './App.css';


class SignUpForm extends Component {
  state = {
    firstName:'',
    lastName: '',
    email: '',
    password: ''
  }

  handleChange = (field, value) => {
    this.setState({ field: value });
  }
  render() {
    const { values } = this.state;
    return (
      <div className="app">
        <h1>Sign up!</h1>
        <Formik
          validate={ values => {
            let errors = {};
            if(!values.firstName) errors.firstName = 'Required';
            if(!values.lastName) errors.lastName = 'Required';
            if(!values.email) errors.email = 'Required';
            if(!values.password) errors.password = 'Required';

            return errors;
          }}
          onSubmit={values => console.log(values)}
        >
        {({ errors }) => (
          <Form>
            <Field />
            {errors.firstName && <div className="input-feedback">{errors.firstName}</div>}

            {/* <label htmlFor="lastName">Last Name</label>
            <input name="lastName" value={values.lastName} onChange={(e) => this.handleChange(lastName, e.target.value)}/>
            { errors.lastName && <div className="input-feedback">{errors.lastName}</div>}

            <label htmlFor="email">Email</label>
            <input name="email" value={values.email} onChange={(e) => this.handleChange(email, e.target.value)}/>
            { errors.email  && <div className="input-feedback">{errors.email}</div>}

            <label htmlFor="password">Password</label>
            <input name="password" value={values.password} onChange={e => this.handleChange(password, e.target.value)}/>
            { errors.password && <div className="input-feedback">{errors.password}</div>} */}

            <button id="reset" type="button" onClick={() => console.log('clicked')}>Reset</button>
            <button id="submit" type="submit" >Submit</button>
          </Form>
        )}
      </Formik>
    </div>
    )}
    }

export default SignUpForm;
