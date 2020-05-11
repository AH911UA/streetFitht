import { fightersDetails, fighters } from './mockData';

const API_URL = 'https://api.github.com/repos/binary-studio-academy/stage-2-es6-for-everyone/contents/resources/api/';

async function callApi(endpoint, method) {
  const url = API_URL + endpoint;
  const options = {
    method,
    headers: {
      'Authorization': 'token 0c2ae1454d99b164cc346e5c4acfc3bcacbf950e'
    }
  };

  return fetch(url, options)
    .then((response) => (response.ok ? response.json() : Promise.reject(Error('Failed to load'))))
    .then((result) => JSON.parse(atob(result.content)))
    .catch((error) => {
      throw error;
    });
}

async function fakeCallApi(endpoint) {
  const response = endpoint === 'fighters.json' ? fighters : getFighterById(endpoint);

  return new Promise((resolve, reject) => {
    setTimeout(() => (response ? resolve(response) : reject(Error('Failed to load'))), 500);
  });
}

function getFighterById(endpoint) {
  const start = endpoint.lastIndexOf('/');
  const id = endpoint.substring(start + 1);

  return fightersDetails.find((it) => it._id === id);
}

export { callApi };
