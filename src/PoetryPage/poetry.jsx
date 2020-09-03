import React from 'react';
import { Route, Link } from "react-router-dom";

import { CATEGORY } from '@/constants';

function PoetryCorner () {
  
  return(
    <div className="nav-scroller py-1 mb-2 nav-bg-col">
      <nav className="nav d-flex justify-content-between p-2">
        {Object.keys(CATEGORY).map(key=>{
          return (<>
            <Route 
              render={
                (category) => {
                  if(key==='all'){
                    return (
                    <Link to={'/pages'} className="text-muted" >{key.toUpperCase()}</Link>
                    )
                  }
                  if(key === 'Zimbabwe'){
                  return(<Link to={'/pages'} className="text-muted" >{key.toUpperCase()}</Link>)
                  }
                  if(key === 'Africa'){
                    return (
                    <Link to={'/pages'} className="text-muted" >{key.toUpperCase()}</Link>
                    )
                  }
                  if(key === 'Weather'){
                    return (
                    <Link to={'/pages'} className="text-muted" >{key.toUpperCase()}</Link>
                    )
                  }
                  if(key === 'Finance'){
                    return (
                    <Link to={'/pages'} className="text-muted" >{key.toUpperCase()}</Link>
                    )
                  }
                  if(key === 'Romance'){
                    return (
                    <Link to={'/pages'} className="text-muted" >{key.toUpperCase()}</Link>
                    )
                  }
                  if(key === 'Music'){
                    return (
                    <Link to={'/pages'} className="text-muted" >{key.toUpperCase()}</Link>
                    )
                  }
                  if(key === 'Education'){
                    return (
                    <Link to={'/pages'} className="text-muted" >{key.toUpperCase()}</Link>
                    )
                  }
                  if(key === 'Culture'){
                    return (
                    <Link to={'/pages'} className="text-muted" >{key.toUpperCase()}</Link>
                    )
                  }
                  if(key === 'Technology'){
                    return (
                    <Link to={'/pages'} className="text-muted" >{key.toUpperCase()}</Link>
                    )
                  }
                  if(key === 'Opnion'){
                    return (
                    <Link to={'/pages'} className="text-muted" >{key.toUpperCase()}</Link>
                    )
                  }
                  if(key === 'Tonga'){
                    return (
                    <Link to={'/pages'} className="text-muted" >{key.toUpperCase()}</Link>
                    )
                  }
                  if(key === 'Personal'){
                    return (
                    <Link to={'/pages'} className="text-muted" >{key.toUpperCase()}</Link>
                    )
                  }
                  if(key === 'Travel'){
                    return (
                    <Link to={'/pages'} className="text-muted" >{key.toUpperCase()}</Link>
                    )
                  }
                  if(key === 'Africa'){
                    return (
                    <Link to={'/pages'} className="text-muted" >{key.toUpperCase()}</Link>
                    )
                  }
                }
              }
            />
          </>)
        })}
      </nav>
    </div>)
};

export { PoetryCorner };
