import axios from 'axios';

const client = axios.create({
  baseURL: 'http://10.0.2.2:8000/api',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
});

export default client;
