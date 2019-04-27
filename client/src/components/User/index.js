import React from 'react';
import API from '../../utils/api';
// import Auth from '../../utils/Auth';

const printData = () => {
  API.findUser("1")
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

function User() {
  return (
    <div>user
      {printData()}
    </div>
  )
}

export default User;