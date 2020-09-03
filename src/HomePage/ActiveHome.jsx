import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} >
      <Carousel.Item className="bg-secondary" >
        <img
          className="d-block w-100"
          width={800}
          height={400}
          src="holder.js/800x400?text=First slide&bg=373940"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className="cover-heading" >MudFam Blog</h3>
          <div className="bk-col" ><span className="fa fa-book" ></span></div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="bg-dark" >
        <img
          className="d-block w-100"
          width={800}
          height={400}
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Second slide"
        />

        <Carousel.Caption>
          <p>Quickly jump to <Link to={'pages'} className="text-muted" >Poetry</Link></p>
          <p>You can <Link to={'/subscribe'} className="text-muted" >Subscribe</Link> to receive latest releases</p>
          <p>Support the Developer by <Link to={'/donate'} className="text-muted" >Donating</Link></p>
          <p>Read the <Link to={'/home/#termsofuse'} className="text-muted" >Terms</Link> and Conditions</p>
          <p>Follow us on <Link to={'/home/#facebook'} ><span className="fa fa-facebook" title="Facebook" ></span></Link>  <Link to={'/#twitter'} ><span className="fa fa-twitter" title="Twitter" ></span></Link>  <Link to={'/home/#instagram'} ><span className="fa fa-instagram" title="Instagram" ></span></Link> </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="bg-primary" >
        <img
          className="d-block w-100"
          width={800}
          height={400}
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />

        <Carousel.Caption>
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
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

function Home() {
  return (<section id="#home" >
    <div className="container" >
      <ControlledCarousel />
    </div>
  </section>);
};

export {Home};