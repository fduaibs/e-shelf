import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

const tokenInterceptor = api.interceptors.response.use(function (response) {
  return response;

}, function (error) {
  if (error.response.status !== 401) return new Promise.reject(error);
  
  const refreshToken = localStorage.getItem('refreshToken');
  if(!refreshToken) {
    localStorage.clear();
    return new Promise.reject(error);
  }

  api.interceptors.response.eject(tokenInterceptor);
  return api.post('/token', { refreshToken: refreshToken }).then(response => {
    if(response.status === 201) {
      localStorage.setItem('accessToken', response.data.accessToken);
      error.response.config.headers['Authorization'] = `Bearer ${response.data.accessToken}`
      return api(error.response.config);
    }
  }).catch(error => {
    if(error.response.status === 401) {
      localStorage.clear();
      return new Promise.reject(error);
    }
  });
});

export default api;