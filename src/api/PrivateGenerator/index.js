import axios from 'axios';
import config from '../../config/index.js';
const { baseUrl } = config;

export function generate(params) {
  const url = `${baseUrl}/fileGenerator`
  return axios.post(url, params, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}