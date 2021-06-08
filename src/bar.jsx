import React from 'react';

const Bar = function ({rating}) {
  return (
    <div className='bar'>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='fill' style={{ width: `${rating * 20}%` }}></div>
    </div>
  );
};

export default Bar;
