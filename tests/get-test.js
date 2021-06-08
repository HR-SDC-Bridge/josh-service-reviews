import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:3000';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 1000,
      maxVUs: 1000,
    },
  },
};

export default function () {
  let responses = http.batch([
    ['GET', `${BASE_URL}/api/reviews/9000000/details/`, null, { tags: { ctype: 'product id 9000000' } }]
  ]);
  check(responses[0], {
    'product id 9000000 status was 200': (res) => res.status === 200,
  });
}