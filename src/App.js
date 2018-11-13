import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Fields from './Fields';
import FormField from './FormField';
import _ from 'lodash';
import { Grid, Button } from 'react-bootstrap';
import { Link } from '@reach/router';
import './App.css';

const GLOBAL_EMAILS = ['john@yahoo.com', 'sally@gmail.com', 'tim@gmail.com', 'marc@gmail.com',
  'alex@hotmail.com', 'alex@gmail.com', 'alex@outlook.com', 'jack@yahoo.com', 'jack@gmail.com', 'jim@outlook.com',
  'jim@gmail.com', 'carol@outlook.com', 'test@gmail.com', 'test@yahoo.com',
  'dan@gmail.com', 'dan@yahoo.com', '123@gmail.com', '123@yahoo.com', '123@outlook.com', 'chris@gmail.com',
  'chris@yahoo.com', 'chris@outlook.com', 'a@a.com', 'a@a', 'a@abc.com'];

class App extends Component {
  state = { showBackupEmail: false, backupEmail: '' };

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
        showBackupEmail: !showBackupEmail,
        backupEmail: '' 
    }
  });
}

// simulate submission
submitData = data => {
  GLOBAL_EMAILS.push(data.email);

  localStorage.setItem('account', data.email);

  this.props.reset();

  this.setState({ showBackupEmail: false, backupEmail: '' });
}

handleChange = (e) => {
  // intentional bug
  this.setState({ backupEmail: e.target.value + ' ' });
}

  render() {
    const { showBackupEmail, backupEmail } = this.state;
    const { pristine, reset, submitting } = this.props;
    return (
      <React.Fragment>
        <h1>Welcome!</h1>
        <Grid>
          <form onSubmit={this.props.handleSubmit(data => this.submitData(data))}>
            { this.renderFields() }
            <div className="backup">
              <input type="checkbox" id="email-backup" onClick={this.toggleField} checked={showBackupEmail} />
                <span>Add recovery email?</span>
            </div>

            { showBackupEmail &&
              <React.Fragment>
                <label htmlFor="backup-email">Recovery Email</label>
                <input type="text" id="backup" name="backup-email" value={backupEmail} onChange={this.handleChange}/>
              </React.Fragment>
            }
            
            <Button type="button"
              id="reset"
              bsStyle="default"
              bsSize="large"
              disabled={pristine || submitting}
              onClick={reset}>
              Reset
            </Button>
            <Link to="/dashboard">
              <Button type="submit"
                id="submit" 
                bsStyle="primary" 
                bsSize="large" 
                disabled={pristine || submitting }>
                Submit
              </Button>
            </Link>
            
          </form>
        </Grid>
      </React.Fragment>
    );
  }
}

function validateEmail(value) {
  const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(value) ? '' : `Email is invailid: ${value}`;
  // intentional typo bug - ^
}

function validate(values) {
  const errors = {};
  errors.email = validateEmail(values.email);
  _.each(Fields, ({ name, title }) => {
    if(!values[name]) {
      errors[name] = `${title} is required!`;
    }
  })
  if(values.lastName && !values.lastName.trim()) {
    errors.lastName = 'Last name cannot be empty'
  }
  if(values.email && GLOBAL_EMAILS.includes(values.email)) {
    errors.email = 'Email is already taken'
  }
  if(values.email && !values.email.trim()) {
    errors.email = 'Email cannot be empty'
  }
  if(values.password && values.password.length < 4) {
    errors.password = 'Password is too short'
  }
  // intentional bug from requirements - ^
  else if(values.password && values.password.length > 12) {
    errors.password = 'Password max length is 16 characters'
  }
  // intentional bug from requirements - ^
  return errors;
}

export default reduxForm({
  form: 'AppForm',
  validate,
})(App);
