import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';

function Overview({ match }) {
  const { path } = match;

  return (
    <div>
      <Dropdown className="wrapper-demo">
        <Dropdown.Toggle className="wrapper-dropdown-2" id="dropdown-basic" >
          ADMIN SETTINGS <span className="icon fa fa-gear" ></span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item><Link to={`${path}/users`}>Manage Users</Link><span className="icon fa fa-users"> </span></Dropdown.Item>
            <Dropdown.Item>Web Statistics<span className="icon "></span> </Dropdown.Item>
            <Dropdown.Item>Upload Settings<span className="icon "> </span></Dropdown.Item>
            <Dropdown.Item>Signout<span className="icon fa fa-sign-out"> </span></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export { Overview };