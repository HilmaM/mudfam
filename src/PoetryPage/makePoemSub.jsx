import React, { useState, useEffect } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { poemService } from '../_services';
import { Row, FormGroup, Col, Button } from 'react-bootstrap';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (<>
    <label htmlFor={props.id || props.name}>{label}</label>
    <input className="text-input" {...field} {...props} />
    {meta.touched && meta.error ? (
      <div className="error">{meta.error}</div>
    ) : null}
  </>);
};

const MyEditor = () => {
  return (<>
    <CKEditor 
      editor={ClassicEditor}
      data=""
      onInit={ editor => {
        console.log('Ready, set go!');
      }}
      onBLur={ ( event, editor ) => {
        console.log( 'Blur.', editor );
      } }
      onFocus={ ( event, editor ) => {
        console.log( 'Focus.', editor )
      } }
      {...field} 
      {...props} 
    />
  </>)
};

const MyCKEditor = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (<>
    <label htmlFor={ props.id || props.name } >{label}</label>
    <CKEditor 
      editor={ClassicEditor}
      data=""
      className="text-input"
      onInit={ { ...props } }
      onChange={ editor => {
        field(editor.getData());
      } }
      { ...field }
      { ...props }
    />
    {meta.touched && meta.error ? (
      <div className="error">{meta.error}</div>
    ) : null}
  </>);
}

function createPoemPageS () {
  return (
    <Formik
      initialValues={{
        poet_name: '',
        //poem_title: '',
        poem_content: ''
      }}
      validationSchema={Yup.object({
        poet_name: Yup.string()
          .required('Poet Name is required'),
        //poem_title: Yup.string()
        //  .required('Poem Title is required'),
        poem_content: Yup.string()
          .max(4500, 'Do not exceed 4500 Characters ... ')
          .required('Poem Content is required.')
      })}
      onSubmit={(fields, {setStatus, setSubmitting}) => {
        setTimeout(() => {
          setStatus();
          poemService.create(fields)
            .then(() => {
              alertService.success('Poem loaded successful', { keepAfterRouteChange: true });
            })
            .catch(error => {
              setSubmitting(false);
              alertService.error(error);
            });
        }, 400)
      }}
    >
      {
        ({isSubmitting, setFieldValue}) => {
          const [poem, setPoem] = useState({});

          return (<Form>
            <div className="jumbotron p-2 p-md-5 rounded">
              <h1 className="" >Write New Item</h1>
              <Row>
                <FormGroup as={Col} md={9} >
                  <MyTextInput 
                    label="Poet Name(s)"
                    name="poet_name"
                    type="text"
                    placeholder="Poeter Songlino Nicolo"
                  />
                </FormGroup>
                <FormGroup as={Col} md={3} >
                  <MyTextInput 
                    label="Poem Category"
                    name="poem_category"
                    type="text"
                    placeholder="World / Politics"
                  />
                </FormGroup>
              </Row>
              <Row>
                <FormGroup>
                  <MyTextInput 
                    label="Title of the Item"
                    name="poem_title"
                    type="text"
                  />
                </FormGroup>
              </Row>
              <Row>
                <MyCKEditor
                  label="Contents"
                  name="poem_content"
                  type="text"
                />
              </Row>
              <Row>
                <FormGroup className="text-center">
                  <Button
                    type="submit"
                    className="btn btn-md btn-success"
                    disabled={isSubmitting}
                  >
                    {isSubmitting &&
                      <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                    Create Article
                  </Button>
                </FormGroup>
              </Row>
            </div>
          </Form>)
        }
      }
    </Formik>
  )
}

export { createPoemPageS };