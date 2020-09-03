import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
render() {
  return (
    <div className="container" id="#home-page" >
    <section className="">
      <div className="container  p-5">
        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-center" >
          <div className="bg-secondary w-33 text-white p-4 d-flex flex-column position-static">
            <h1 className="cover-heading" >MudFam Blog</h1>
            <div className="bk-col" ><span className="fa fa-book" ></span></div>
          </div>
          <div className="p-4 w-33 d-flex flex-column position-static bg-dark text-white">
            <p>Quickly jump to <Link to={'pages'} className="text-muted" >Poetry</Link></p>
            <p>You can <Link to={'/subscribe'} className="text-muted" >Subscribe</Link> to receive latest releases</p>
            <p>Support the Developer by <Link to={'/donate'} className="text-muted" >Donating</Link></p>
            <p>Read the <Link to={'/home/#termsofuse'} className="text-muted" >Terms</Link> and Conditions</p>
            <p>Follow us on <Link to={'/home/#facebook'} ><span className="fa fa-facebook" title="Facebook" ></span></Link>  <Link to={'/#twitter'} ><span className="fa fa-twitter" title="Twitter" ></span></Link>  <Link to={'/home/#instagram'} ><span className="fa fa-instagram" title="Instagram" ></span></Link> </p>
          </div>
          <div className="p-4 w-33 this-col-khaki bg-primary  position-static">
            <h3 className="blog-post-title">Helpful Links</h3>
            <p>
              New release and 
              <Link to={'/#home'} className="text-muted"> other </Link> 
              works.
            </p>
            <p>
              From around the  
              <Link to={'/#home'} className="text-muted"> world</Link>
            </p>
            <p>
              About the 
              <Link to={'/about'} className="text-muted"> Author</Link> .
            </p>
          </div>
        </div>
      </div>
      <div className="text-center" >
        <h1>Read the book with a pen in your fingers _ _ _ _<span   className="fa fa-pencil bk-col" ></span></h1>
      </div>
    </section>
    </div>
  );
}
}

export { HomePage };