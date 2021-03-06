import config from 'config';
import { fetchWrapper } from '../_helpers';

const baseUrl = `${config.apiUrl}/comments`;

export const commentService = {
  getAll,
  getById,
  comment,
  create,
  update,
  delete: _delete
};

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function comment(params) {
  return fetchWrapper.post(`${baseUrl}/comment`, params);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params)
    .then(comment => {
      return comment;
    });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`)
    .then(x => {
      return x;
    });
}