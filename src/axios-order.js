import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-b94de.firebaseio.com/'
});

export default instance;
