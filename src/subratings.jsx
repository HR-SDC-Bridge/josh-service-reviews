import React from 'react';
import Bar from './bar.jsx';

const Subratings = function ({easeOfAssembly, valueForMoney, productQuality, appearance, worksAsExpected}) {
  const round = n => Math.round(n*10)/10;
  return (
    <div className='sub-ratings'>
      <div className='ease-of-assembly-installation'>
        <div className='category'>Ease of assembly/installation</div>
        <div className='graphic'><Bar rating={easeOfAssembly} /></div>
        <div className='rating'>{round(easeOfAssembly)}</div>
      </div>
      <div className='value-for-money'>
        <div className='category'>Value for money</div>
        <div className='graphic'><Bar rating={valueForMoney} /></div>
        <div className='rating'>{round(valueForMoney)}</div>
      </div>
      <div className='product-quality'>
        <div className='category'>Product quality</div>
        <div className='graphic'><Bar rating={productQuality} /></div>
        <div className='rating'>{round(productQuality)}</div>
      </div>
      <div className='appearance'>
        <div className='category'>Appearance</div>
        <div className='graphic'><Bar rating={appearance} /></div>
        <div className='rating'>{round(appearance)}</div>
      </div>
      <div className='works-as-expected'>
        <div className='category'>Works as expected</div>
        <div className='graphic'><Bar rating={worksAsExpected} /></div>
        <div className='rating'>{round(worksAsExpected)}</div>
      </div>

    </div>
  );
}

export default Subratings;
