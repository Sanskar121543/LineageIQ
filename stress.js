import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 50,
  duration: '15s',
};

export default function () {
  const payload = JSON.stringify({
    dataset: "orders",
    column: "customer_id",
    change_type: "rename_column"
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post(
    'http://host.docker.internal:8000/api/v1/impact/blast-radius',
    payload,
    params
  );

  check(res, { 'status 200': (r) => r.status === 200 });
}