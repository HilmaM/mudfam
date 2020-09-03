import React from 'react';
import { accountService } from '../_services';

function SideBar () {
  const user = accountService.userValue;
  return (
    <>
      <div className="p-4 mb-3 bg-light rounded">
        <h4 className="font-italic">About</h4>
        <p className="mb-0">{user ? <em>{user.bio}</em> : <em>Login to see your Bio Right Here</em>}</p>
      </div>
      <div className="p-4">
        <h4 className="font-italic">Archives</h4>
        <ol className="list-unstyled mb-0">
        </ol>
      </div>
      <div className="p-4">
        <h4 className="font-italic">Elsewhere</h4>
        <ol className="list-unstyled">
          <li><a href="https://github.com/HilmaM" target="_blank">GitHub</a></li>
          <li><a href="http://#" target="_blank">Twitter</a></li>
          <li><a href="https://www.facebook.com/mapenzi.mudimba" target="_blank" >Facebook</a></li>
        </ol>
      </div>
    </>
  )
}

export { SideBar };