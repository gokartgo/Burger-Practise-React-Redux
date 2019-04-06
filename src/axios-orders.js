import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-61abb.firebaseio.com/'
});

export default instance;