import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';

import { FormGroup, Col, InputGroup, FormLabel, Button, Row } from 'react-bootstrap';

import { accountService, alertService } from '@/_services';

function LoginPage ({ history }) {
  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  function onSubmit({ email, password }, { setSubmitting }) {
    alertService.clear();
    accountService.login(email, password)
      .then(() => {
        const { from } = location.state || { from: { pathname: "/" } };
        history.push(from);
      })
      .catch(error => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
      {( { errors, touched, isSubmitting } ) =>
        (
          <Form >
            <h3 className="card-header">Login</h3>
            <Row className="card-body">
              <Col md={{ span: 6, offset: 1 }} >
                <Row>
                  <Col md="auto" className="p-2" >
                    <FormGroup md={6} >
                      <FormLabel htmlFor="inlineFormInput" srOnly >
                        Email
                      </FormLabel>
                      <InputGroup className="mb-2" >
                        <InputGroup.Prepend>
                          <InputGroup.Text><span className="fa fa-user" ></span></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Field 
                          id="inlineFormInput"
                          type="text"
                          name="email"
                          placeholder="Username"
                          className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup md={6} >
                      <FormLabel htmlFor="inlineFormInputGroup" srOnly>Password</FormLabel>
                      <InputGroup className="mb-2" >
                        <InputGroup.Prepend>
                          <InputGroup.Text><span className="fa fa-key" ></span></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Field 
                          id="inlineFormInputGroup"
                          type="password"
                          name="password"
                          placeholder="Password"
                          className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
                        />
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md={5} className="p-4" >
                    <Row>
                      <Button type="submit" className="btn btn-info" disabled={isSubmitting} >
                        {isSubmitting &&
                          <span className="fa fa-spinner fa-spin" ></span>
                        } 
                        <span className="fa fa-sign-in" ></span> Login
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col md={{ span:4, offset:1 }} >
                <p className="text-right">New account<Link to="register"  className="btn btn-link pr-0" >Registration</Link></p>
                <p className="text-right" >
                  <Link to="forgot-password" className="btn btn-link pr-0">Forgot Password?</Link>
                </p>
              </Col>
            </Row>
          </Form>
        )
      }
    </Formik>
  )
};

export { LoginPage };