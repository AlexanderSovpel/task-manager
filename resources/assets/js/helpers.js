const DEV_PATH = 'http://localhost:8000/api/';
const PROD_PATH = 'https://nameless-lake-99608.herokuapp.com/api/';

export function apiPath(action) {
  return `${PROD_PATH}${action}`;
}