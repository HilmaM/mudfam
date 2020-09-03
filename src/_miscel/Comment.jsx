import React, { useState, useEffect } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { poemService, accountService, alertService, commentService } from '../_services';
import { Media } from 'react-bootstrap';

const MyTextInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (<>
    <input className="text-input" {...field} {...props} />
  </>);
};

const MyTextInputTwo = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (<>
    <label htmlFor={props.id || props.name}>{label}</label>
    <MyStyledTextArea className="text-input form-control" {...field} {...props} />
    {meta.touched && meta.error ? (
      <div className="error" >{meta.error}</div>
    ): null}
  </>);
}

const MyStyledInput = styled.input`
padding: .5em;
border: 1px solid #eee;
/* ... */
`

const MyStyledTextArea = MyStyledInput.withComponent('textarea');

function CommentSection ({ history, id }) {
  const user = accountService.userValue;

  return (<>
    <Formik
      initialValues={{
        the_comment: ''
      }}
      validationSchema={Yup.object({
        the_comment: Yup.string()
          .min(3, 'Minumum 3 characters required.')
          .required("Can't be empty!")
      })}
      onSubmit={(fields, {setSubmitting}) => {
        setTimeout(() => {
          commentService.comment(fields)
            .then(() => {
              alertService.success('You added a comment', {keepAfterRouteChange: true});
              history.push('.');
            })
            .catch(error => {
              alertService.error(error);
              setSubmitting(false);
            });
          setSubmitting(false);
        }, 400);
      }}
    >
      {
        ({ isSubmitting, setFieldValue }) => {
          useEffect(() => {
            //Place the Poem ID to match the poem being commented on
            poemService.getById(id).then(poem => {
              const fields = ['poem_id'];
              fields.forEach(field => setFieldValue(field, poem.id(field), false));
            });
            // Place the Commenter Name to the field
            accountService.getById(id).then(user => {
              const fields = ['commenter_name'];
              fields.forEach(field => setFieldValue(field, user(field), false))
            });
          }, []);
          return (
            <Form>
              <Media>
                <Media.Body>
                  <h5>Posting as <em>{user ? user.first_name : 'Guest'}</em></h5>
                </Media.Body>
              </Media>
              <MyTextInputTwo
                label="Add Comment"
                name="the_comment"
                placeholder="Post a comment..."
                rows={3}
              />
              <button type="submit" disabled={isSubmitting} >
                Send
                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
              </button>
            </Form>
          )
        }
      }
    </Formik>
  </>);
};

export { CommentSection };