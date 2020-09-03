import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, useField, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Col, InputGroup, Button, FormGroup, FormLabel, Row, Container } from 'react-bootstrap';
import { accountService, alertService } from '../../_services';


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

function AddEdit({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;

  return (
    <Formik  
    initialValues={{
      title: '',
      first_name: '',
      last_name: '',
      gender: '',
      home_address: '',
      country: '',
      phone_number: '',
      email: '',
      password: '',
      confirmPassword: '',
      bio: ''
    }} 
    validationSchema={Yup.object({
      title: Yup.string()
        .required('Title is required'),
      first_name: Yup.string()
        .required('First Name is required'),
      last_name: Yup.string()
        .required('Last Name is required'),
      gender: Yup.string()
        .required('Gender is required'),
      home_address: Yup.string()
        .required('Home Address is required'),
      country: Yup.string()
        .required('Please prodive a country'),
      phone_number: Yup.string()
        .min(13, '13 Characters Minimum')
        .required('Must be a number'),
      email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
      password: Yup.string()
        .concat(isAddMode ? Yup.string().required('Password is required') : null)
        .min(8, 'Password must be at least 8 characters'),
      confirmPassword: Yup.string()
        .when('password', (password, schema) => {
          if (password || isAddMode) return schema.required('Confirm Password is required');
        })
        .oneOf([Yup.ref('password')], 'Passwords must match'),
      bio: Yup.string()
        .max(128, 'Maximum of 128 Characters allowed')

    })} 
    onSubmit={(fields, {setStatus, setSubmitting}) => {
      setStatus();
      if (isAddMode) {
        accountService.create(fields)
          .then(() => {
            alertService.success('User added successfully', { keepAfterRouteChange: true });
            history.push('.');
          })
          .catch(error => {
            setSubmitting(false);
            alertService.error(error);
          });
      } else {
        accountService.update(id, fields)
          .then(() => {
            alertService.success('Update successful', { keepAfterRouteChange: true });
            history.push('..');
          })
          .catch(error => {
            setSubmitting(false);
            alertService.error(error);
          });
      }
    }} 
    >
      {
        ({ errors, touched, isSubmitting, setFieldValue }) => {

          useEffect(() => {
            if (!isAddMode) {
              // get user and set form fields
              accountService.getById(id).then(user => {
                const fields = ['title', 'first_name', 'last_name', 'gender', 'home_address', 'country', 'phone_number', 'email', 'role', 'bio'];
                fields.forEach(field => setFieldValue(field, user[field], false));
              });
            }
          }, []);
          return (
            <Container fluid className="p-4" >
              <Row fluid className="jumbotron" >
                <Col fluid md={{ span:10, offset:1 }} >
                  <Form>
                    <h1 className="text-center bg-success" >{isAddMode ? 'Create an account' : 'Editing...' }</h1>
                    <Row>
                      <FormGroup as={Col} md="2" >
                        <FormLabel>Title</FormLabel>
                        <Field  name="title" as="select" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}>
                          <option value="" disabled={true} >Select...</option>
                          <option value="dr" >Dr</option>
                          <option value="miss" >Miss</option>
                          <option value="mr" >Mr</option>
                          <option value="mrs" >Mrs</option>
                          <option value="ms" >Ms</option>
                          <option value="prof" >Prof</option>
                        </Field>
                        <ErrorMessage name="title" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup as={Col} md="5" >
                        <MyTextField
                          type="text"
                          name="first_name"
                          label="First Name"
                        />
                      </FormGroup>
                      <FormGroup as={Col} md="5"  >
                        <MyTextField 
                          type="text"
                          name="last_name"
                          label="Surname"
                        />
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup as={Col} md="3" >
                        <FormLabel>Gender</FormLabel>
                          <Field
                            as="select"
                            name="gender"
                            className={'form-control' + (errors.gender && touched.gender ? ' is-invalid' : '')}
                          >
                            <option value="" disabled={true} >Choose...</option>
                            <option value="female" >Female</option>
                            <option value="male" >Male</option>
                          </Field>
                          <ErrorMessage name="gender" component="div" className="invalid-feedback" />
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup as={Col} md="12" >
                        <MyTextField 
                          label="Home Address"
                          name="home_address"
                          type="text"
                        />
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup as={Col} md="3" >
                        <FormLabel>Country</FormLabel>
                          <Field
                            as="select"
                            name="country"
                            className={'form-control' + (errors.country && touched.country ? ' is-invalid' : '')}
                          >
                            <option value="" disabled={true} >Choose...</option>
                            <option value="zimbabwe" >Zimbabwe</option>
                            <option value="africa" >Africa</option>
                            <option value="asia" >Asia</option>
                            <option value="america" >America</option>
                            <option value="europe" >Europe</option>
                            <option value="australia" >Australia</option>
                          </Field>
                          <ErrorMessage name="country" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup as={Col} md="4" >
                        <MyTextField 
                          label="Phone Number"
                          name="phone_number"
                          type="number"
                        />
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup as={Col} md="6" >
                        <MyTextField 
                          label="Email"
                          name="email"
                          type="email"
                        />
                      </FormGroup>
                      <FormGroup as={Col} md={3} >
                        <FormLabel>Role</FormLabel>
                        <Field 
                          as="select" 
                          name="role" 
                          className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')}
                        >
                          <option value="" >Choose Role</option>
                          <option value="User">User</option>
                          <option value="Editor">Editor</option>
                          <option value="Manager">Manager</option>
                          <option value="Admin">Admin</option>
                        </Field>
                      </FormGroup>
                    </Row>
                      {!isAddMode &&
                        <FormGroup >
                          <h3 className="pt-3">Change Password</h3>
                          <p>Leave blank to keep the same password</p>
                        </FormGroup>
                      }
                    <Row>
                      <FormGroup as={Col} md="4" >
                        <MyTextField 
                          label="Password"
                          type="password"
                          name="password"
                        />
                      </FormGroup>
                      <FormGroup as={Col} md="4" >
                        <MyTextField 
                          label="Confirm Password"
                          name="confirmPassword"
                          type="password"
                        />
                      </FormGroup>
                    </Row>
                    <FormGroup>
                      <label htmlFor="bio" >BioG</label>
                      <Field 
                        as="textarea"
                        name="bio"
                        className={"form-input form-control" + (errors.bio && touched.bio ? ' is-invalid' : '')}
                      />
                      <ErrorMessage name="bio" component="div" className="invalid-feedback" />
                    </FormGroup>
                    <Row>
                      <FormGroup as={Col} >
                        <Button className="btn btn-primary" type="submit" disabled={isSubmitting}  >
                          {isSubmitting && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                          }
                          Save
                        </Button>
                        <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
                      </FormGroup>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Container>
          );
      }}
    </Formik>
  );
}

export { AddEdit };