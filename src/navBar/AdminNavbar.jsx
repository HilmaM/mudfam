import React from 'react';
import { NavLink, Route, Link } from 'react-router-dom';

function AdminNav() {
  return (<>
    <nav>
      <Route path="/admin" component={NavBar} />
    </nav>
  </>);
}

function NavBar ({ match }) {
  const { path } = match;

  return (
    <nav className="admin-nav navbar navbar-expand navbar-light">
      <div className="navbar-nav">
        <NavLink to={`${path}/users`} className="nav-item nav-link">Users</NavLink>
      </div>
    </nav>
  );
}

export { AdminNav };