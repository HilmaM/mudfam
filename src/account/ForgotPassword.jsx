import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, useField, Form } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, Row, Col } from 'react-bootstrap';

import { accountService, alertService } from '../_services';

const MyTextField = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (<>
    <label htmlFor={props.id || props.name}>{label}</label>
    <input className="text-input form-control" {...field} {...props} />
    {meta.touched && meta.error ? (
      <div className="error" >{meta.error}</div>
    ) : null}
  </>);
};


function ForgotPassword() {
  return (<Formik
      initialValues={{
        email: ''
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid Email')
          .required('Email field should be filled!')
      })}
      onSubmit={(fields, {setSubmitting}) => {
        alertService.clear();
        accountService.forgotPassword(fields)
          .then(() => alertService.success('Please check your email for Password reset instructions'))
          .catch(error => alertService.error(error))
          .finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting }) => {
        return (<Form>
          <h3 className="card-header" >Forgot Password</h3>
          <div className="card-body" >
            <FormGroup>
              <MyTextField 
                label="Email"
                name="email"
                type="text"
              />
            </FormGroup>
            <Row>
              <FormGroup as={Col} >
                <Button type="submit" disabled={isSubmitting} >
                  {isSubmitting && 
                    <span className="fa fa-spinner fa-spin" ></span>
                  }
                  Confirm
                </Button>
                <Link to="login" className="btn btn-link">Cancel</Link>
              </FormGroup>
            </Row>
          </div>
        </Form>)
      }}
    </Formik>);
}

export { ForgotPassword }; 