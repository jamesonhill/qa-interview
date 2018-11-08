import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Fields from './Fields';
import FormField from './FormField';
import _ from 'lodash';
import { Grid, Button } from 'react-bootstrap';
import './App.css';


class App extends Component {
  renderFields() {
    return _.map(Fields, ({ title, name }) => {
      return <Field component={FormField} type='text'
        label={title} name={name} key={name} />
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Welcome!</h1>
        <Grid>
          <form onSubmit={this.props.handleSubmit(data => {
            alert(`Account created, ${data}!`);
          })}>
            { this.renderFields() }
            <Button type="button"
              id="reset"
              bsStyle="default"
              bsSize="large"
              onClick={this.props.reset}>
              Reset
            </Button>
            <Button type="submit"
              id="submit" 
              bsStyle="primary" 
              bsSize="large" 
              disabled={this.props.pristine}>
              Submit
            </Button>
          </form>
        </Grid>
      </React.Fragment>
    );
  }
}

function validateEmail(value) {
  const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(value) ? '' : `Email is invailid: ${value}`;
}

function validate(values) {
  const errors = {};
  errors.email = validateEmail(values.email);
  _.each(Fields, ({ name, title }) => {
    if(!values[name]) {
      errors[name] = `${title} is required!`;
    }
  })
  if(values.password && values.password.length < 5) {
    errors.password = 'Password is too short'
  }
  else if(values.password && values.password.length > 12) {
    errors.password = 'Password max length is 16 characters'
  }
  errors.lastName = '';
  return errors;
}

export default reduxForm({
  form: 'AppForm',
  validate,
})(App);
