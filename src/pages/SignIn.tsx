import React from 'react';
import Topbar from '../components/Topbar';
import SignIn from '../components/SignIn'

export default () => {
  return (
    <div>
      <Topbar />
      <div className='pt-20'>

      <SignIn />
      </div>
    </div>
  );
};