import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, useField, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Col, InputGroup, Button, FormGroup, FormLabel } from 'react-bootstrap';

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

function Update({ history }) {
  const user = accountService.userValue;

  const [isDeleting, setIsDeleting] = useState(false);
  function onDelete() {
    if (confirm('Are you sure?')) {
      setIsDeleting(true);
      accountService.delete(user.id)
        .then(() => alertService.success('Account deleted successfully'));
    }
  }

  return (
    <Formik 
      initialValues={{
        title: user.title,
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        home_address: user.home_address,
        country: user.country,
        phone_number: user.phone_number,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
        bio: user.bio
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
          .required('Must be a number'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        bio: Yup.string()
          .max(128, 'Maximux of 128 Characters reached!'),
        password: Yup.string(),
        confirmPassword: Yup.string()
          .when('password', (password, schema) => {
            if (password) return schema.required('Confirm Password is required');
          })
          .oneOf([Yup.ref('password')], 'Passwords must match')
      })} 
      onSubmit={(fields, {setStatus, setSubmitting}) => {
        setStatus();
        accountService.update(user.id, fields)
          .then(() => {
            alertService.success('Update successful', { keepAfterRouteChange: true });
            history.push('.');
          })
          .catch(error => {
            setSubmitting(false);
            alertService.error(error);
          });
      }}>
      {
        ({ errors, touched, isSubmitting }) =>  (
          <Form>
            <div className="card-body">
              <div className="form-row" >
                <FormGroup as={Col} >
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
                <FormGroup as={Col} md={5} >
                  <MyTextField 
                    label="Fist Name"
                    name="first_name"
                    type="text"
                  />
                </FormGroup>
                <FormGroup as={Col} md={5} >
                  <MyTextField 
                    label="Surname"
                    name="last_name"
                    type="text"
                  />
                </FormGroup>
              </div>
              <div className="form-row" >
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
              </div>
              <div className="form-row" >
                <FormGroup as={Col} md="12" >
                  <MyTextField 
                    label="Home Address"
                    name="home_address"
                    type="text"
                  />
                </FormGroup>
              </div>
              <div className="form-row" >
                <FormGroup as={Col} md="3" >
                <FormLabel>Country</FormLabel>
                  <Field
                    as="select"
                    type="text"
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
                    type="text"
                  />
                </FormGroup>
              </div>
              <div className="form-row" >
                <FormGroup as={Col} md="4" >
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend" >@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <MyTextField 
                      name="email"
                      type="email"
                      aria-describedby="inputGroupPrepend"
                    />
                  </InputGroup>
                </FormGroup>
              </div>
              <div>
                <h3>Change Password</h3>
                <p>Leave blank to keep ssame password</p>
              </div>
              <div className="form-row" >
                <FormGroup as={Col} md="4" >
                  <MyTextField 
                    name="password"
                    type="password"
                    label="Password"
                  />
                </FormGroup>
                <FormGroup as={Col} md="4" >
                  <MyTextField 
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                  />
                </FormGroup>
              </div>
              <FormGroup>
                <label htmlFor="bio" className="form-input" >Biograph</label>
                <Field 
                  as="textarea"
                  name="bio"
                  className={"form-control form-input" + (errors.bio && touched.bio ? ' is-invalid' : '')}
                />
                <ErrorMessage name="bio" component="div" className="invalid-feedback" />
              </FormGroup>
              <div className="form-row" >
                <FormGroup as={Col} >
                  <Button className="btn btn-primary" type="submit" disabled={isSubmitting}  >
                    {isSubmitting && 
                      <span className="fa fa-spinner" ></span>
                    }
                    Update
                  </Button>
                  <Link to={'.'} className="btn btn-link">Back to Profile</Link>
                  <Button 
                    className="btn btn-sm btn-danger" onClick={() => onDelete()} disabled={isDeleting}
                  >
                    {isDeleting
                      && <span className="spinner-border spinner-border-sm"></span>
                    }
                    <span>Delete</span>
                  </Button>
                </FormGroup>
              </div>
            </div>
          </Form>
        )
      }
    </Formik>
  )
};

export { Update };