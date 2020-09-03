import React, { useState, useEffect } from 'react';
import { Media } from 'react-bootstrap';
import { commentService } from '../_services';
import moment from 'moment';

function CommentList () {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    commentService.getAll().then(x => setComments(x));
  });

  return (<div>
    {
      comments && comments.map(comment => 
        <Media as="li" key={comment.id} >
          <Media.Body>
            <h5>{comment.commenter_name}</h5>
            <p>{moment(comment.createdAt).format('YYYY-MM-DD | HH:mm:ss')}</p>
            <p>{comment.the_comment}</p>
          </Media.Body>
          <img 
            width={64}
            height={64}
            className="ml-3"
            src="holder.js/64x64"
            alt="MudFam"
          />
        </Media>
      )
    }
    {
      !comments && <span className="spinner-border spinner-border-sm mr-1"></span>
    }
    {
      comments && !comments.length && 
      <h3>... be the first to comment!</h3>
    }
  </div>);
};

export { CommentList };