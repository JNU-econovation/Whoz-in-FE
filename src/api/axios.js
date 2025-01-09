import axios from 'axios';

axios.defaults.baseURL = 'https://whozin.0429.site'; 
axios.defaults.withCredentials = true; 
axios.defaults.headers.common['Content-Type'] = 'application/json'; 
console.log('axios 설정 완료');
export default axios;
