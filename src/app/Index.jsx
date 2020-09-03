import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, Link, useLocation } from 'react-router-dom';
import moment from 'moment';
import { Navbar, Container } from 'react-bootstrap';

import { Role } from '../_helpers';
import { accountService } from '../_services';
import { PrivateRoute } from '../_components';
import { Home } from '../HomePage';
import { Admin } from '../admin/Index';
import { Account } from '../account/Index';
import { PoetryPageRouter } from '../PoetryPage';
import { Alert, NavigationBar } from '../navBar';
import { AdminNav } from '../navBar/AdminNavbar';
import { Profile } from '../profile/Index';

function App () {
  const { pathname } = useLocation();
   
  const [user, setUser] = useState({});

  useEffect(() => {
      const subscription = accountService.user.subscribe(x => setUser(x));
      return subscription.unsubscribe;
  }, []);

  return (
    <>
      <Container className={user}>
        <header className="blog-header py-3">
          <Navbar className="row flex-nowrap justify-content-between align-items-center">
            <NavigationBar />
          </Navbar>
        </header>
        <AdminNav />
        <div>
          <Alert />
        </div>
        <Switch>
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/pages" component={ PoetryPageRouter } />
          <PrivateRoute path="/profile" component={Profile} /> 
          <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
          <Route path="/account" component={Account} />
          <Redirect from="*" to="/" />
        </Switch>
      </Container>
      <footer className="blog-footer">
        <p>
          © {moment(Date.now()).format('YYYY')} <a href="http://localhost:8080/">MudFam</a>
        </p>
        <Link to={'/#app'}>Back to Top</Link>
      </footer>
    </>
  );
}

export { App };