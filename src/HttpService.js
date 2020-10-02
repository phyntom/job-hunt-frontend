import axios from 'axios';
// import { toast } from 'react-toastify';

const apiURL = process.env.BASEURL || 'http://127.0.0.1:3000/applicant';

export const instance = axios.create({
   baseURL: apiURL,
   timeout: 10000000,
   headers: {
      'Content-Type': 'application/json',
   },
});
