import React, { useState, useEffect } from 'react';
import { NavLink, Route, Link } from 'react-router-dom';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';

import { Role } from '../_helpers';
import { accountService } from '../_services';

function NavigationBar() {
  const user = accountService.userValue;

  return (
    <>
      <div className="col-4 pt-1">
        <Link to={'/pages'} className="text-muted">Poetry</Link>
      </div>
      <div className="col-4 text-center">
        <Link to={'/'} activeclassname="active" className="blog-header-logo text-dark">
          MudFam
        </Link>
      </div>
      <div className="col-4 d-flex justify-content-end align-items-center">
        {
          user ?
          user.role === Role.Admin &&
          <NavLink to="/admin" className="nav-item nav-link">Admin</NavLink>
          : ''
        }
        {
          user ? 
          <Dropdown as={ButtonGroup} >
            <Button variant="info" size="sm" alignright="true" >
              <h6><Link className="nav-item nav-link text-muted" to="/profile" ><span className="text-white" >{user.first_name} {user.last_name}</span></Link></h6>
            </Button>
            <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item>Edit</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Delete Account</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={accountService.logout} >Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          : <Link to={'/login'} className="btn btn-sm text-muted" >Login</Link>
        }
      </div>
    </>
  );
}

export { NavigationBar };