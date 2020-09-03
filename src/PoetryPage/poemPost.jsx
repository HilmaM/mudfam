import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Container, Row, Col } from 'react-bootstrap';

import { SideBar } from '../PoetryPage';
import { poemService } from '../_services';

function PoemPost ({id}) {
  
  const [poems, setPoems] = useState({});


  useEffect(() => {
    poemService.getAll()
      .then(p => 
        setPoems(p)
      )
  });

  return (
    <Container fluid >
      <Row>
        <Col md={8} className="blog-main" >
          <div className="blog-post" >
            {
              poem && poems.map(poem => <>
                <h1 className="blog-post-title" >
                  {poem.poem_title}
                </h1>
                <p className="blog-post-meta">{moment(poem.createdAt).format('MMMM Do, YYYY')} by <a href="htp://#">{poem.poet_name}</a></p>
                <div style={{wordWrap:'break-word',display:'inline-block'}}>
                  <p dangerouslySetInnerHTML={{__html:poem.poem_content}} className="editor" />
                </div>
              </>)
            }
          </div>
        </Col>
        <aside className="col-md-4 blog-sidebar">
          <SideBar />
        </aside>
      </Row>
      <footer className="jumbotron p-4 p-md-5 text-white rounded bg-secondary">
      </footer>
    </Container>
  )
}
export { PoemPost };