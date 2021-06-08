import React from 'react';
import ReactDOM from 'react-dom';
import Review from './review.jsx';
import css from '../public/style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/*<Review />*/}
        hello everybody
        <Review />
      </div>
    );
  }
}

//ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<Review />, document.getElementById('review'));
window.App = App;
