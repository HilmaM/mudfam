import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { accountService } from '../_services';

function Details({ match }) {
  const { path } = match;
  const user = accountService.userValue;

  return (
    <Container className="p-4" >
      <Row>
        <Col md={{ span:7, offset:3 }}  className="no-gutters border rounded overflow-hidden flex-md-row mb-4 h-md-250 shadow-sm position-center" >
          <Row>
            <Col ClassName="bg-secondary text-white d-flex flex-column position-static" >
              <Row className="p-3" >
                <Col md={12} >
                  <h1 className="text-center this-col-khaki" >
                    <span className="fa fa-user" ></span>
                  </h1>
                </Col>
              </Row>
            </Col>
            <Col ClassName="bg-primary text-white d-flex flex-column position-static" >
                <Row className="p-3">
                  <Col md={12} >
                    <p> {user.title} {user.first_name} {user.last_name}</p>
                    <p>{user.email}</p>
                    <p>
                      {user.home_address}
                      <br />
                      {user.country}
                      <br />
                      {user.phone_number}
                    </p>
                    <Row className="p-3" >
                      <Col xs={4} >
                        <Link to={`${path}/update`} className="btn btn-sm btn-info" >Update Profile</Link>
                      </Col>
                      <Col xs={4} >
                      </Col>
                    </Row>
                  </Col>
                </Row>
            </Col> 
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export { Details };
