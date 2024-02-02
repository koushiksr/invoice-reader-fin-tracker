import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
const Spinner = ({ loading }) => {
  return (
    <div>
      <h1>please wait......</h1>
      <ClipLoader color={'#36D7B7'} loading={loading}  size={150} />
    </div>
  );
};

export default Spinner;
