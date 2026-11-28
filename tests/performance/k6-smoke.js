import http from 'k6/http';
import { check, sleep } from 'k6';
export const options = {
  stages: [
    { duration: '15s', target: 10 },
    { duration: '30s', target: 10 },
    { duration: '15s', target: 0 },
  ],
  thresholds: { http_req_failed: ['rate<0.02'], http_req_duration: ['p(95)<500'] },
};
const root = __ENV.API_TEST_ORIGIN || 'http://localhost:4000';
export default function () {
  const res = http.get(`${root}/health/live`);
  check(res, { healthy: (r) => r.status === 200 });
  // To measure authenticated learning reads, supply a short-lived native bearer for a test user.
  const token = __ENV.API_BEARER;
  if (token) {
    const headers = { Authorization: `Bearer ${token}` };
    const paths = http.get(`${root}/api/v1/learning/paths`, { headers });
    check(paths, { 'path listing': (r) => r.status === 200 });
    const review = http.get(`${root}/api/v1/reviews/due`, { headers });
    check(review, { 'review listing': (r) => r.status === 200 });
    const models = http.get(`${root}/api/v1/model-playground/models`, { headers });
    check(models, { 'model metadata': (r) => r.status === 200 });
  }
  sleep(1);
}
