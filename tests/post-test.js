import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:3000';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 100,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 1000,
      maxVUs: 1000,
    },
  },
};

let data =   [{
  "overall": 3.5,
  "easeOfAssembly": 3.5,
  "valueForMoney": 3.5,
  "productQuality": 3.5,
  "appearance": 3.5,
  "worksAsExpected": 3.5,
  "recommended": true,
  "title": "RPS Testing",
  "reviewText":"This is a review inserted for the stress testing exercise",
  "reviewerName":"TEST USER",
  "reviewerId": 900
}]

export default function () {
  let responses = http.batch([
    ['POST', `${BASE_URL}/api/reviews/10000011`, JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } }]
  ]);
  check(responses[0], {
    'add review': (res) => res.status === 201,
  });
}