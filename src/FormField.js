import React from 'react'
import { Col, Row } from 'react-bootstrap';

const FormField = ({ input, label, meta: { error, touched }}) => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={12} md={12} lg={12} >
          <label>{ label } </label>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} lg={12} >
          <input {...input} className="field-input" />
        </Col>
        <div className="red-text error">
          { touched && error }
        </div>
      </Row>
    </React.Fragment>
  );
}
export default FormField;