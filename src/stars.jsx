import React from 'react';
import Star from './star.jsx';
import Halfstar from './halfstar.jsx';
import Nonstar from './nonstar.jsx';


const Stars = function ({ count }) {
  const stars = [];
  const numberOfHalfStars = Math.round(count * 2);
  for (let i = 1; i <= 10; i += 2) {
    if (i < numberOfHalfStars) {
      stars.push('star');
    } else if (i === numberOfHalfStars) {
      stars.push('halfstar');
    } else {
      stars.push('nonstar');
    }
  }

  return (
    <div className='stars'>
      {stars.map((star, key) => {
        return (
          <div className='star-icon' key={key}>
            {star === 'star' ? <Star /> : star === 'halfstar' ? <Halfstar /> : <Nonstar />}
          </div>
        );
      })}
    </div>
  );
};

export default Stars;
