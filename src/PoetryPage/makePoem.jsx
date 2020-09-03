import React, { Component } from "react";
import { Form, Col, FormControl, Button } from 'react-bootstrap';
import { CATEGORY } from '../constants';
import { poemService, alertService } from '../_services';
import CKEditor from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

class CreatePoemPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      poem: {
        poem_content: '', 
        poem_title: '', 
        poet_name: '', 
        category: [],
      },
      submitted: false
    };
    this.nameChange = this.nameChange.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
    this.handleEditor = this.handleEditor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  nameChange(e){
    this.setState({
      poet_name: e.target.value
    });
  };

  titleChange(e){
    this.setState({
      poem_title: e.target.value
    });
  };

  categoryChange(e){
    this.setState({
      category: e.target.value
    });
  };

  handleEditor(e){
    this.setState({
      poem_content: e.getData()
    })
  }

  handleSubmit({uploading}) { 
    this.setState({ submitted: true });
    const { poem } = this.state;
    if( poem.poem_title && poem.poet_name && poem.poem_content && poem.category ) {
      poemService.upload(poem);
      alertService.success('Poem added', { keepAfterRouteChange: true });
    } else {
      alertService.error(error);
      uploading(false);
    }
  }

  render() {
    const { uploading } = this.props;
    return (
      <div className="jumbotron p-4 p-md-5 rounded bg-secondary">
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Col className="col-4">
              <Form.Label>Poet Name</Form.Label>
              <FormControl type="text" onChange={this.nameChange} name="poet_name" required = "true" />
            </Col>
            <Col>
              <Form.Label>Category</Form.Label>
              <select
                className="form-control"
                name="category" 
                id="category" 
                onChange={this.categoryChange} 
              >
                {Object.keys(CATEGORY).map(key=>{
                  const categ = CATEGORY[key];
                return (<option key={categ} value={categ} >{key}</option>)
                })}
              </select>
            </Col>
            <Col className="col-6">
              <Form.Label>Poem Title</Form.Label>
              <FormControl type="text" onChange={this.titleChange}  name="poem_title" required="true" />
            </Col>
          </Form.Row>
          <Form.Row>
            <div>
              <CKEditor 
                editor={BalloonEditor}
                data=""
                onInit={ editor => {
                  console.log('Ready, set go!');
                }}
                onChange={ ( event, editor ) => {
                  this.handleEditor( editor );
                } }
                onBLur={ ( event, editor ) => {
                  console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                  console.log( 'Focus.', editor )
                } }
              />
            </div>
          </Form.Row>
          <Form.Row className="row p-2">
            <Col className="col-12 text-center">
              <Button
                type="submit"
                className="btn btn-md btn-success"
                disabled={uploading}
              >
              {uploading ? 
                <span className="fa fa-spinner fa-spin" ></span> : 'Create Article'
              }</Button>
            </Col>
          </Form.Row>
        </Form>
      </div>
    );
  }
};

export { CreatePoemPage };