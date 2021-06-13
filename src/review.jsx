import React from 'react';
import Stars from './stars.jsx';
import Bar from './bar.jsx';
import CustomerReview from './customer-review.jsx';
import Subratings from './subratings.jsx';

const toggleReviewModal = function () {
  const reviewModalWrapper = document.querySelector('#review-modal-wrapper');
  if (!reviewModalWrapper.displayed) {
    console.log('displaying reviews');
    reviewModalWrapper.displayed = true;
    reviewModalWrapper.setAttribute('style', 'display:block;');
  } else {
    console.log('undisplaying reviews');
    reviewModalWrapper.displayed = false;
    reviewModalWrapper.setAttribute('style', 'display:none;');
  }
};

const blankAverageRatings = {
  number: 0,
  overall: 0,
  easeOfAssembly: 0,
  valueForMoney: 0,
  productQuality: 0,
  appearance: 0,
  worksAsExpected: 0
};

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'displayModal': false,
      'itemID': 1,
      'averageRatings': {
        'number': 479,
        'overall': 4.4,
        'easeOfAssembly': 5,
        'valueForMoney': 4,
        'productQuality': 3,
        'appearance': 2,
        'worksAsExpected': 1
      },
      'page': {
        'number': 1,
        'outOf': 24
      },
      'customerReviews': [
        {
          'reviewID': 1,
          'name': 'Carlos',
          'date': '02/22/2021',
          'title': 'Good set',
          'reviewText': 'Good set',
          'recommended': true,
          'overall': 5,
          'easeOfAssembly': 3,
          'valueForMoney': 5,
          'productQuality': 5,
          'appearance': 5,
          'worksAsExpected': 5
        },
        {
          'reviewID': 2,
          'name': 'JANELEN',
          'date': '02/19/2021',
          'title': 'Perfect for a guest bedroom',
          'reviewText': 'Clean lines, drawers open easily and they look good.',
          'recommended': true,
          'overall': 5,
          'easeOfAssembly': 4,
          'valueForMoney': 5,
          'productQuality': 5,
          'appearance': 5,
          'worksAsExpected': 5
        }
      ]
    };
  }

  componentDidMount() {
    const match = document.location.href.match(/\/(\d+)$/);
    if (match) {
      fetch(`/api/reviews/${match[1]}/details`)
        .then(res => res.json())
        .then(json => {
          if (!json.averageRatings) {
            json.averageRatings = blankAverageRatings;
          }

          this.setState(json);
        });
    }
  }


  render() {
    const round = n => Math.round(n * 10) / 10;
    return (
      <div className='review'>
        <div className='toggle' onClick={toggleReviewModal}>
          <div>Reviews</div>
          <Stars count={this.state.averageRatings.overall} /> <span className="weak">({this.state.averageRatings.number})</span>
        </div>
        <div className='modal-wrapper' id='review-modal-wrapper' style={{ display: 'none' }}>
          <div className='review-modal'>
            <div id='close-box'><div className='close' onClick={toggleReviewModal}>X</div></div>
            <h2>Reviews</h2>
            <h3 className='overall'>{round(this.state.averageRatings.overall)}</h3>
            <Stars count={this.state.averageRatings.overall} />
            <div className='average-customer-ratings'>
              <h4>Average customer ratings</h4>
              <div className='ratings'>
                <div className='overall'>
                  <div className='category'>Overall</div>
                  <div className='graphic'><Stars count={this.state.averageRatings.overall} /></div>
                  <div className='rating'>{round(this.state.averageRatings.overall)}</div>
                  <Subratings
                    easeOfAssembly={this.state.averageRatings.easeOfAssembly}
                    valueForMoney={this.state.averageRatings.valueForMoney}
                    productQuality={this.state.averageRatings.productQuality}
                    appearance={this.state.averageRatings.appearance}
                    worksAsExpected={this.state.averageRatings.worksAsExpected}
                  />
                </div>
              </div>
            </div>
            {this.state.customerReviews.map((review, key) => {
              return (
                <CustomerReview data={review} key={key} />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

//window.Review = Review;
export default Review;
