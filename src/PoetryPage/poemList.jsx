import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { poemService } from '@/_services';
import { Link } from 'react-router-dom';

function PoemList ({ match }) {

  const [poems, setPoems] = useState({});
  const { path } = match;

  useEffect(() => {
    poemService.getAll().then(x => setPoems(x));
  }, []);

  function deletePoem(id) {
    setPoems(poems.map(x => {
      if (x.id === id) { x.isDeleting = true; }
      return x;
    }));
    poemService.delete(id).then(() => {
      setPoems(poems => poems.filter(x => x.id !== id));
    });
  } 

  return (<div className="row" >
    {
      poems &&
        poems.map(poem => 
          <div key={poem.id} className="col-md-4" >
            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary">{poem.category}</strong>
                <h3 className="mb-0">{poem.poem_title}</h3>
                <div className="mb-1 text-muted">{moment(poem.createdAt).format('MMMM, Do YYYY')}</div>
                <p className="card-text mb-auto">{poem.poet_name}</p>
                <Link to={`${path}/${poem.poem_title}`} className="stretched-link">Continue reading</Link>
              </div>
              <div className="col-auto d-none d-lg-block">
                <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
              </div>
            </div>
          </div>
    )}
    {
      !poems && <div className="text-center"><div className="spinner-border spinner-border-lg align-center"></div></div>
    }
    {
      poems && !poems.length &&
      <h2>Nothing to show yet</h2>
    }
  </div>);
}

export { PoemList };