import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { CreatePoemPage, PoetryCorner, PoemContainer, PoemList, PoemPost } from './';

function PoetryPageRouter ({ match }) {

  const { path } = match;

  return (
    <div role="main">
      <PoetryCorner />
      <Switch>
        <Route exact path={path} component={PoemContainer} />
        <Route path={`${path}/write`} component={CreatePoemPage} />
        <Route path={`${path}/edit/:id`} component={CreatePoemPage} />
        <Route path={`${path}/:id`} component={PoemPost} />
      </Switch>
    </div>
  );
}; 

export { PoetryPageRouter };