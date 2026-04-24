import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 20,
  duration: '20s',
};

export default function () {
  let res1 = http.get('http://host.docker.internal:8000/api/v1/stats');

  let res2 = http.get('http://host.docker.internal:8000/api/v1/lineage/graph');

  let res3 = http.post(
    'http://host.docker.internal:8000/api/v1/impact/blast-radius',
    JSON.stringify({
      dataset: "orders",
      column: "customer_id",
      change_type: "rename_column"
    }),
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );

  check(res1, { 'stats ok': (r) => r.status === 200 });
  check(res2, { 'graph ok': (r) => r.status === 200 });
  check(res3, { 'blast ok': (r) => r.status === 200 });
}