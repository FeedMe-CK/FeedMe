import axios from 'axios';


const signup = (firstName, lastName, email, password, address, placeId) => {
  return axios
    .post('/signup', { firstName, lastName, email, password, address, placeId })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

const login = (email, password) => {
  return axios
    .post('/login', { email, password })
    .then(response => {
      localStorage.setItem('x-access-token', response.data.token);
      localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000);
      return response.data;
    })
    .catch(err => {
      Promise.reject('Authentication Failed!');
      return err.response.data;
    });
};

const logout = () => {
  return axios
    .delete('/logout')
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export { signup, login, logout };
