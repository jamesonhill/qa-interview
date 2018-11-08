import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Fields from './Fields';
import FormField from './FormField';
import _ from 'lodash';
import { Grid, Button } from 'react-bootstrap';
import './App.css';

const GLOBAL_EMAILS = ['john@yahoo.com', 'sally@gmail.com', 'tim@gmail.com', 'marc@gmail.com',
  'alex@hotmail.com', 'jack@yahoo.com', 'carol@outlook.com', 'test@gmail.com', 'test@yahoo.com',
  'dan@gmail.com', 'dan@yahoo.com', '123@gmail.com', '123@yahoo.com', '123@outlook.com', 'chris@gmail.com',
  'chris@yahoo.com', 'chris@outlook.com'];

class App extends Component {
  state = { showBackupEmail: false };
  renderFields() {
    return _.map(Fields, ({ title, name }) => {
      return <Field component={FormField} type="text"
        label={title} name={name} key={name} />
    });
  }

  componentDidMount() {
    localStorage.removeItem('account');
  }

  toggleField = () => {
    this.setState(({ showBackupEmail }) => {
      return {
        showBackupEmail: !showBackupEmail 
    }
  });
}

  render() {
    const { showBackupEmail } = this.state;
    return (
      <React.Fragment>
        <h1>Welcome!</h1>
        <Grid>
          <form onSubmit={this.props.handleSubmit(data => {
            GLOBAL_EMAILS.push(data.email);
            localStorage.setItem('account', data.email);
            alert(`Account created, ${data}!`);
          })}>
            { this.renderFields() }
            <div className="backup">
              <input type="checkbox" id="email-backup" onClick={this.toggleField}/>
                <span>Add recovery email?</span>
            </div>

            { showBackupEmail &&
              <React.Fragment>
                <label htmlFor="backup-email">Recovery Email</label>
                <input type="text" id="backup" name="backup-email" />
              </React.Fragment>
            }
            
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
  if(values.email && GLOBAL_EMAILS.includes(values.email)) {
    errors.email = 'Email is already taken'
  }
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
